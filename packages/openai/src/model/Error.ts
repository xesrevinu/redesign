import * as Schema from '@fp-ts/schema/Schema';

export const Error = Schema.struct({
  error: Schema.string,
  type: Schema.string,
  param: Schema.optional(Schema.string),
  code: Schema.optional(Schema.string),
});

export type Error = Schema.Infer<typeof Error>;
