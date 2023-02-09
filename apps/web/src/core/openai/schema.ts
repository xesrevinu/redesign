import type { NonEmptyReadonlyArray } from '@fp-ts/core/ReadonlyArray';
import * as Schema from '@fp-ts/schema';
import * as PR from '@fp-ts/schema/ParseResult';

export const OpenAiClientChoices = Schema.struct({
  text: Schema.string,
  index: Schema.number,
  logprobs: Schema.any,
  finish_reason: Schema.string,
});

export type OpenAiClientChoices = Schema.Infer<typeof OpenAiClientChoices>;

export const OpenAIClientResponse = Schema.struct({
  id: Schema.string,
  object: Schema.string,
  created: Schema.number,
  model: Schema.string,
  choices: Schema.array(OpenAiClientChoices),
  usage: Schema.struct({
    prompt_tokens: Schema.number,
    completion_tokens: Schema.number,
    total_tokens: Schema.number,
  }),
});

export type OpenAIClientResponse = Schema.Infer<typeof OpenAIClientResponse>;

export class OpenAIClientResponseParseError extends Error {
  readonly _tag = 'OpenAIClientResponseParseError';
  constructor(readonly error: NonEmptyReadonlyArray<PR.ParseError>) {
    super('OpenAIClientResponseParseError');
  }
}
