import * as Effect from '@effect/io/Effect';
import * as Layer from '@effect/io/Layer';
import { pipe } from '@fp-ts/core/Function';
import * as Completions from '@redesign/openai/Completions';
import * as Edits from '@redesign/openai/Edits';
import * as Embeddings from '@redesign/openai/Embeddings';
import * as Images from '@redesign/openai/Images';

const program = pipe(
  Completions.createCompletion({}),
  Effect.zipRight(Edits.createEdit({})),
  Effect.zipRight(Embeddings.createEmbeddings({})),
  Effect.zipRight(Images.createImage({})),
  Effect.catchAllCause(Effect.logErrorCause)
);

Effect.runFork(
  pipe(
    program,
    Effect.provideLayer(
      Layer.mergeAll(Completions.live, Edits.live, Embeddings.live, Images.live)
    )
  )
);
