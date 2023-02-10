import * as Context from '@effect/data/Context';
import * as Effect from '@effect/io/Effect';
import * as Layer from '@effect/io/Layer';

export interface Files {
  readonly listFiles: (
    params: ListFilesParams
  ) => Effect.Effect<unknown, never, ListFilesResponse>;
  readonly updateFile: (
    params: UpdateFileParams
  ) => Effect.Effect<unknown, never, File>;
  readonly deleteFile: (
    params: DeleteFileParams
  ) => Effect.Effect<unknown, never, File>;
  readonly getFile: (
    params: GetFileParams
  ) => Effect.Effect<unknown, never, File>;
  readonly getFileContent: (
    params: GetFileContentParams
  ) => Effect.Effect<unknown, never, string>;
}

const Files = Context.Tag<Files>();

export const make = Effect.gen(function* ($) {
  const a = yield* $(Effect.succeed(10));

  const listFiles = (params: ListFilesParams) =>
    Effect.succeed({} as ListFilesResponse);

  const updateFile = (params: UpdateFileParams) => Effect.succeed({} as File);

  const deleteFile = (params: DeleteFileParams) => Effect.succeed({} as File);

  const getFile = (params: GetFileParams) => Effect.succeed({} as File);

  const getFileContent = (params: GetFileContentParams) =>
    Effect.succeed('' as string);

  return {
    listFiles,
    updateFile,
    deleteFile,
    getFile,
    getFileContent,
  } satisfies Files;
});

export const live = Layer.effect(Files, make);

export const listFiles = (params: ListFilesParams) =>
  Effect.serviceWithEffect(Files, (_) => _.listFiles(params));

export const updateFile = (params: UpdateFileParams) =>
  Effect.serviceWithEffect(Files, (_) => _.updateFile(params));

export const deleteFile = (params: DeleteFileParams) =>
  Effect.serviceWithEffect(Files, (_) => _.deleteFile(params));

export const getFile = (params: GetFileParams) =>
  Effect.serviceWithEffect(Files, (_) => _.getFile(params));

export const getFileContent = (params: GetFileContentParams) =>
  Effect.serviceWithEffect(Files, (_) => _.getFileContent(params));
