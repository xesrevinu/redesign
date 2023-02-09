import * as T from '@effect/io/Effect';
import axios, { AxiosRequestConfig } from 'axios';

export class TimeoutError {
  readonly _tag = 'TimeoutError';
}

export class RequestError {
  readonly _tag = 'RequestError';
  constructor(readonly reason: unknown) {}
}

export const request = <A>(url: string, options?: AxiosRequestConfig) =>
  T.asyncInterrupt<never, RequestError, A>((resume) => {
    const controller = new AbortController();

    axios
      .request<A>({ ...(options ?? {}), url, signal: controller.signal })
      .then((response) => {
        resume(T.succeed(response.data as A));
      })
      .catch((error) => {
        resume(T.fail(new RequestError(error)));
      });

    return T.sync(() => {
      controller.abort();
    });
  });
