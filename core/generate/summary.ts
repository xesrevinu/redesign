import * as T from "@effect/io/Effect";
import * as OpenAIClient from "@/core/openai/client";
import * as GenerateSchema from "@/core/generate/schema";

export const handleTextSummary = (data: GenerateSchema.TextRequestSchema) => {
  return T.gen(function* ($) {
    const client = yield* $(T.service(OpenAIClient.OpenAIClient));

    const { choices } = yield* $(
      client.completions(data.model, data.content, 0, 2000)
    );

    return choices;
  });
};

export const handleUrlSummary = (data: GenerateSchema.URLRequestSchema) => {
  return T.gen(function* ($) {
    const client = yield* $(T.service(OpenAIClient.OpenAIClient));

    const { choices } = yield* $(client.completions(data.model, "", 0, 200));

    return choices;
  });
};
