/**
 * Private spot account endpoints of Bybit v5.
 *
 * Scope: balances, transfers and any other account-state-modifying
 * operations relevant to `category=spot`. All methods require
 * `BybitAuthenticatedContext`.
 *
 * Static class — never instantiate. Methods are added iteratively;
 * see `docs/exchanges/bybit/coverage.md` for what is currently available.
 */
export class BybitPrivateSpotAccount {
  private constructor() {
    throw new Error('BybitPrivateSpotAccount is a static class and cannot be instantiated');
  }
}
