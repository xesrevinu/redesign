import * as Context from '@effect/data/Context';
import * as Effect from '@effect/io/Effect';
import * as Layer from '@effect/io/Layer';

export interface Embeddings {
  readonly createEmbeddings: (
    params: CreateEmbeddingParams
  ) => Effect.Effect<never, never, void>;
}

const Embeddings = Context.Tag<Embeddings>();

const make = Effect.gen(function* ($) {
  const a = yield* $(Effect.succeed(10));

  const createEmbeddings = (params: CreateEmbeddingParams) => Effect.unit();

  return { createEmbeddings } satisfies Embeddings;
});

export const live = Layer.effect(Embeddings, make);

export const createEmbeddings = (params: CreateEmbeddingParams) =>
  Effect.serviceWithEffect(Embeddings, (_) => _.createEmbeddings(params));
