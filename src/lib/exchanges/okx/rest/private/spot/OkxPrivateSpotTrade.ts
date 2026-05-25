/**
 * Private spot trade endpoints of OKX v5.
 *
 * Scope: место для торговых ручек по `instType=SPOT` (place/amend/cancel
 * order, история ордеров и т.д.). Все методы будут принимать
 * `OkxAuthenticatedContext`.
 *
 * Static class — never instantiate. Методы добавляются итеративно;
 * см. `docs/exchanges/okx/coverage.md`.
 */
export class OkxPrivateSpotTrade {
  private constructor() {
    throw new Error('OkxPrivateSpotTrade is a static class and cannot be instantiated');
  }
}
