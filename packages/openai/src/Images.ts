import * as Context from '@effect/data/Context';
import * as Effect from '@effect/io/Effect';
import * as Layer from '@effect/io/Layer';

export interface Images {
  readonly createImage: (
    params: CreateImageParams
  ) => Effect.Effect<never, never, void>;
  readonly createImageEdit: (
    params: CreateImageEditParams
  ) => Effect.Effect<never, never, void>;
  readonly createImageVariation: (
    params: CreateImageVariationParams
  ) => Effect.Effect<never, never, void>;
}

const Images = Context.Tag<Images>();

export const make = Effect.gen(function* ($) {
  const a = yield* $(Effect.succeed(10));

  const createImage = (params: CreateImageParams) => Effect.unit();

  const createImageEdit = (params: CreateImageEditParams) => Effect.unit();

  const createImageVariation = (params: CreateImageVariationParams) =>
    Effect.unit();

  return {
    createImage,
    createImageEdit,
    createImageVariation,
  } satisfies Images;
});

export const live = Layer.effect(Images, make);

export const createImage = (params: CreateImageParams) =>
  Effect.serviceWithEffect(Images, (_) => _.createImage(params));

export const createImageEdit = (params: CreateImageEditParams) =>
  Effect.serviceWithEffect(Images, (_) => _.createImageEdit(params));

export const createImageVariation = (params: CreateImageVariationParams) =>
  Effect.serviceWithEffect(Images, (_) => _.createImageVariation(params));
