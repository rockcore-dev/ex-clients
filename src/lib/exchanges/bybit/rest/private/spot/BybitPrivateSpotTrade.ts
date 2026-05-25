/**
 * Private spot trade endpoints of Bybit v5.
 *
 * Scope: `category=spot` — place / amend / cancel orders, open orders,
 * order history, etc. All methods require `BybitAuthenticatedContext`.
 *
 * Static class — never instantiate. Methods are added iteratively;
 * see `docs/exchanges/bybit/coverage.md` for what is currently available.
 */
export class BybitPrivateSpotTrade {
  private constructor() {
    throw new Error('BybitPrivateSpotTrade is a static class and cannot be instantiated');
  }
}
