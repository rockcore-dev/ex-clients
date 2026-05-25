import { expect, vi } from 'vitest';

/**
 * Assert that `cls` cannot be instantiated with `new`. The runtime
 * defense is `private constructor() { throw ... }`, which TypeScript
 * already rejects, so we erase the type before calling `new`.
 */
export function expectNotConstructable(cls: unknown, expectedErrorRegex: RegExp): void {
  const Ctor = cls as new () => unknown;
  expect(() => new Ctor()).toThrow(expectedErrorRegex);
}

/**
 * Extract the URL string from a `fetch` input (string | URL | Request)
 * without relying on the implicit `toString` of `Request`.
 */
export function urlOf(input: string | URL | Request): string {
  if (typeof input === 'string') return input;
  if (input instanceof URL) return input.href;
  return input.url;
}

/**
 * Build a successful Bybit v5 envelope `{ retCode: 0, retMsg: 'OK', result }`
 * wrapped in a JSON `Response` (status 200).
 */
export function okEnvelope<T>(result: T): Response {
  return new Response(JSON.stringify({ retCode: 0, retMsg: 'OK', result, time: 1 }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Captured request from a `fetch`-mock.
 */
export interface CapturedRequest {
  url: string;
  method: string;
  /**
   * Распарсенные query-параметры в виде объекта (последнее значение по
   * каждому ключу). Удобно для `expect(captured.query).toMatchObject(...)`.
   */
  query: Record<string, string>;
  /** Path без query string. */
  path: string;
}

/**
 * Build a `vi.fn<typeof fetch>` that always returns `okEnvelope(result)`
 * and stores the last request URL / method / query in `captured`.
 */
export function makeOkFetch<T>(result: T): {
  fetchImpl: ReturnType<typeof vi.fn<typeof fetch>>;
  captured: CapturedRequest;
} {
  const captured: CapturedRequest = { url: '', method: '', query: {}, path: '' };
  const fetchImpl = vi.fn<typeof fetch>((input, init) => {
    const url = urlOf(input);
    captured.url = url;
    captured.method = String(init?.method ?? 'GET');
    const u = new URL(url);
    captured.path = u.pathname;
    captured.query = Object.fromEntries(u.searchParams);
    return Promise.resolve(okEnvelope(result));
  });
  return { fetchImpl, captured };
}
