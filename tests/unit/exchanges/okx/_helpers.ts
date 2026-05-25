import { expect, vi } from 'vitest';

/** Assert that `cls` cannot be instantiated with `new`. */
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
 * Build a successful OKX v5 envelope `{ code: '0', msg: '', data }`
 * wrapped in a JSON `Response` (status 200).
 */
export function okxOkEnvelope<T>(data: T): Response {
  return new Response(JSON.stringify({ code: '0', msg: '', data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** Captured request from a `fetch`-mock. */
export interface CapturedOkxRequest {
  url: string;
  method: string;
  /** Распарсенные query-параметры (последнее значение по каждому ключу). */
  query: Record<string, string>;
  /** Path без query string. */
  path: string;
  /** Распарсенные headers (lower-case ключи). */
  headers: Record<string, string>;
  /** Сырой body (для POST). */
  body: string | undefined;
}

/**
 * Build a `vi.fn<typeof fetch>` that always returns `okxOkEnvelope(data)`
 * and stores the last request URL / method / query / headers / body in `captured`.
 */
export function makeOkxOkFetch<T>(data: T): {
  fetchImpl: ReturnType<typeof vi.fn<typeof fetch>>;
  captured: CapturedOkxRequest;
} {
  const captured: CapturedOkxRequest = {
    url: '',
    method: '',
    query: {},
    path: '',
    headers: {},
    body: undefined,
  };
  const fetchImpl = vi.fn<typeof fetch>((input, init) => {
    const url = urlOf(input);
    captured.url = url;
    captured.method = String(init?.method ?? 'GET');
    const u = new URL(url);
    captured.path = u.pathname;
    captured.query = Object.fromEntries(u.searchParams);
    captured.headers = {};
    const headers = new Headers(init?.headers);
    headers.forEach((value, key) => {
      captured.headers[key.toLowerCase()] = value;
    });
    captured.body = typeof init?.body === 'string' ? init.body : undefined;
    return Promise.resolve(okxOkEnvelope(data));
  });
  return { fetchImpl, captured };
}
