/**
 * Public spot market endpoints of Bybit v5.
 *
 * Scope: `category=spot` — tickers, klines, orderbook, recent trades, etc.
 *
 * Static class — never instantiate. Methods are added iteratively;
 * see `docs/exchanges/bybit/coverage.md` for what is currently available.
 */
export class BybitPublicSpotMarket {
  private constructor() {
    throw new Error('BybitPublicSpotMarket is a static class and cannot be instantiated');
  }
}
