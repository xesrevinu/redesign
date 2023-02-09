import * as Context from '@effect/data/Context';
import * as Config from '@effect/io/Config';
import * as ConfigProvider from '@effect/io/Config/Provider';
import * as T from '@effect/io/Effect';
import * as L from '@effect/io/Layer';
import { pipe } from '@fp-ts/core/Function';
import * as SchemaParser from '@fp-ts/schema/Parser';

import * as Fetch from '@/core/fetch';
import * as OpenAIErrors from '@/core/openai/errors';
import * as OpenAISchema from '@/core/openai/schema';

const GPT_KEY = Config.string('GPT_API_KEY');

export interface OpenAIClient {
  completions: (
    model: string,
    prompt: string,
    temperature: number,
    max_tokens: number
  ) => T.Effect<
    never,
    OpenAIErrors.RequestError,
    OpenAISchema.OpenAIClientResponse
  >;
}

export const makeClient = () => {
  return T.gen(function* ($) {
    const key = yield* $(ConfigProvider.fromEnv().load(GPT_KEY));

    function completions(
      model: string,
      prompt: string,
      temperature: number,
      max_tokens: number
    ): T.Effect<
      never,
      OpenAIErrors.RequestError,
      OpenAISchema.OpenAIClientResponse
    > {
      return pipe(
        Fetch.request<OpenAISchema.OpenAIClientResponse>(
          'https://api.openai.com/v1/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${key}`,
            },
            data: {
              model,
              prompt,
              temperature,
              max_tokens,
            },
          }
        ),
        T.flatMap((_) =>
          pipe(
            T.fromEither(
              SchemaParser.decode(OpenAISchema.OpenAIClientResponse)(_)
            ),
            T.mapError(
              (error) => new OpenAISchema.OpenAIClientResponseParseError(error)
            )
          )
        ),
        T.tapError((error) => T.logError(JSON.stringify(error))),
        T.mapError((error) => {
          if (error._tag === 'OpenAIClientResponseParseError') {
            return new OpenAIErrors.RequestError(
              new OpenAIErrors.ServerError()
            );
          }

          return new OpenAIErrors.RequestError(new OpenAIErrors.ServerError());
        })
      );
    }

    return {
      completions,
    } satisfies OpenAIClient;
  });
};

export const OpenAIClient = Context.Tag<OpenAIClient>();

export const live = L.effect(OpenAIClient, makeClient());

export const dummy = L.succeed(OpenAIClient, {
  completions: () =>
    T.succeed({
      id: 'cmpl-uqkvlQyYK7bGYrRHQ0eXlWi7',
      object: 'text_completion',
      created: 1589478378,
      model: 'text-davinci-003',
      choices: [
        {
          text: '\n\nThis is indeed a test',
          index: 0,
          logprobs: null,
          finish_reason: 'length',
        },
      ],
      usage: {
        prompt_tokens: 5,
        completion_tokens: 7,
        total_tokens: 12,
      },
    }),
});
