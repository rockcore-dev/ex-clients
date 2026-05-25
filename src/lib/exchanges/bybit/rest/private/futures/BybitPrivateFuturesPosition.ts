/**
 * Private futures position endpoints of Bybit v5.
 *
 * Scope: `category=linear` and `category=inverse` — position list,
 * leverage, margin mode, trading stops, etc. All methods require
 * `BybitAuthenticatedContext`.
 *
 * Static class — never instantiate. Methods are added iteratively;
 * see `docs/exchanges/bybit/coverage.md` for what is currently available.
 */
export class BybitPrivateFuturesPosition {
  private constructor() {
    throw new Error('BybitPrivateFuturesPosition is a static class and cannot be instantiated');
  }
}
