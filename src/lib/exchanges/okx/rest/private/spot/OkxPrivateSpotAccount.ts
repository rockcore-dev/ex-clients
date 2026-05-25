/**
 * Private spot account endpoints of OKX v5.
 *
 * Scope: balance, fee rate, transaction logs (по части, относящейся к SPOT).
 * В OKX единый аккаунт-движок (Unified Account), поэтому большинство
 * account-эндпоинтов общие; здесь — обёртки с фиксированными параметрами
 * под SPOT.
 *
 * Static class — never instantiate.
 */
export class OkxPrivateSpotAccount {
  private constructor() {
    throw new Error('OkxPrivateSpotAccount is a static class and cannot be instantiated');
  }
}
