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
