import * as Context from '@effect/data/Context';
import * as Effect from '@effect/io/Effect';
import * as Layer from '@effect/io/Layer';

export interface Edits {
  readonly createEdit: (
    params: CreateEditParams
  ) => Effect.Effect<never, never, void>;
}

const Edits = Context.Tag<Edits>();

export const make = Effect.gen(function* ($) {
  const a = yield* $(Effect.succeed(10));

  const createEdit = (params: CreateEditParams) => Effect.unit();

  return { createEdit } satisfies Edits;
});

export const live = Layer.effect(Edits, make);

export const createEdit = (params: CreateEditParams) =>
  Effect.serviceWithEffect(Edits, (_) => _.createEdit(params));
