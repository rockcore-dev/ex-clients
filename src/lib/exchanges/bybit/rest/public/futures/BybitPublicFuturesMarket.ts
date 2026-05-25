/**
 * Public futures market endpoints of Bybit v5.
 *
 * Scope: `category=linear` (USDT/USDC perpetuals & futures) and
 * `category=inverse` (coin-margined perpetuals & futures).
 *
 * Static class — never instantiate. Methods are added iteratively;
 * see `docs/exchanges/bybit/coverage.md` for what is currently available.
 */
export class BybitPublicFuturesMarket {
  private constructor() {
    throw new Error('BybitPublicFuturesMarket is a static class and cannot be instantiated');
  }
}
