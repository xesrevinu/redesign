import * as Config from '@effect/io/Config';
import * as ConfigSecret from '@effect/io/Config/Secret';
import { pipe } from '@fp-ts/core/Function';

export interface OpenAIConfig {
  baseURL: URL;
  apiKey: ConfigSecret.ConfigSecret;
}

export const validateURL = (url: string | URL | unknown): boolean => {
  try {
    new URL(url as string);
    return true;
  } catch (e) {
    return false;
  }
};

export const config = pipe(
  Config.string('baseURL'),
  Config.withDefault(new URL('https://api.openai.com/v1')),
  Config.validate('Invalid URL', (_) => validateURL(_)),
  Config.zip(Config.secret('apiKey')),
  Config.map(([baseURL, apiKey]) => {
    return {
      baseURL,
      apiKey,
    } as OpenAIConfig;
  }),
  Config.nested('openai')
);
