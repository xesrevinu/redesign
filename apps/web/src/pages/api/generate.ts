import * as T from '@effect/io/Effect';
import * as Logger from '@effect/io/Logger';
import * as LoggerLevel from '@effect/io/Logger/Level';
import { pipe } from '@fp-ts/core/Function';
import * as SchemaParser from '@fp-ts/schema/Parser';
import type { NextApiRequest, NextApiResponse } from 'next';

import * as GenerateSchema from '@/core/generate/schema';
import * as GenerateSummary from '@/core/generate/summary';
import * as OpenAIClient from '@/core/openai/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateSchema.GenerateApiResponse>
) {
  const program = pipe(
    T.fromEither(SchemaParser.decode(GenerateSchema.RequestSchema)(req.body)),
    T.flatMap((data) => {
      if (data.type === 'text') {
        return GenerateSummary.handleTextSummary(data.data);
      } else {
        return GenerateSummary.handleUrlSummary(data.data);
      }
    }),
    T.provideLayer(OpenAIClient.live),
    T.provideLayer(OpenAIClient.dummy),
    Logger.withMinimumLogLevel(LoggerLevel.All),
    T.tapDefect((_) => T.logErrorCause(_))
  );

  const result = await T.runPromiseEither(program);

  if (result._tag === 'Right') {
    res.status(200).json(result.right);
  } else {
    res.status(500);
  }
}
