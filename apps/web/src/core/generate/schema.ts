import { pipe } from '@fp-ts/core/Function';
import * as Schema from '@fp-ts/schema';

export const RequestModel = Schema.union(
  Schema.literal('text-davinci-003'),
  Schema.literal('text-curie-001'),
  Schema.literal('text-babbage-001'),
  Schema.literal('text-ada-001')
);

export type RequestModel = Schema.Infer<typeof RequestModel>;

export const TextRequestSchema = Schema.struct({
  model: RequestModel,
  content: pipe(Schema.string, Schema.minLength(0), Schema.maxLength(5000)),
});

export type TextRequestSchema = Schema.Infer<typeof TextRequestSchema>;

export const URLRequestSchema = Schema.struct({
  model: RequestModel,
  url: pipe(Schema.string, Schema.minLength(0), Schema.maxLength(500)),
});

export type URLRequestSchema = Schema.Infer<typeof URLRequestSchema>;

export const RequestSchema = Schema.union(
  Schema.struct({
    type: Schema.literal('text'),
    data: TextRequestSchema,
  }),
  Schema.struct({
    type: Schema.literal('url'),
    data: URLRequestSchema,
  })
);

export type RequestSchema = Schema.Infer<typeof RequestSchema>;

export type GenerateApiResponse = {
  // TODO:
};
