/**
 * Private futures trade endpoints of Bybit v5.
 *
 * Scope: `category=linear` and `category=inverse` — place / amend / cancel
 * orders, open orders, order history, etc. All methods require
 * `BybitAuthenticatedContext`.
 *
 * Static class — never instantiate. Methods are added iteratively;
 * see `docs/exchanges/bybit/coverage.md` for what is currently available.
 */
export class BybitPrivateFuturesTrade {
  private constructor() {
    throw new Error('BybitPrivateFuturesTrade is a static class and cannot be instantiated');
  }
}
