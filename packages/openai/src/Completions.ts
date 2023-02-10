import * as Context from '@effect/data/Context';
import * as Effect from '@effect/io/Effect';
import * as Layer from '@effect/io/Layer';

export interface Completions {
  readonly createCompletion: (
    params: CreateCompletionParams
  ) => Effect.Effect<never, never, void>;
}

const Completions = Context.Tag<Completions>();

export const make = Effect.gen(function* ($) {
  const a = yield* $(Effect.succeed(10));

  const createCompletion = (params: CreateCompletionParams) => Effect.unit();

  return { createCompletion } satisfies Completions;
});

export const live = Layer.effect(Completions, make);

export const createCompletion = (params: CreateCompletionParams) =>
  Effect.serviceWithEffect(Completions, (_) => _.createCompletion(params));
