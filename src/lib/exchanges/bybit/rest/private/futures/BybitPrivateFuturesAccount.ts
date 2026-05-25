/**
 * Private futures account endpoints of Bybit v5.
 *
 * Scope: wallet balance for linear/inverse, execution history, etc.
 * All methods require `BybitAuthenticatedContext`.
 *
 * Static class — never instantiate. Methods are added iteratively;
 * see `docs/exchanges/bybit/coverage.md` for what is currently available.
 */
export class BybitPrivateFuturesAccount {
  private constructor() {
    throw new Error('BybitPrivateFuturesAccount is a static class and cannot be instantiated');
  }
}
