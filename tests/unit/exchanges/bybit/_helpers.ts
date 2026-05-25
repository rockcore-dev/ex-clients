import { expect } from 'vitest';

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
