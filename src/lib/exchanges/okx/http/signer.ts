import { createHmac } from 'node:crypto';

import type { OkxCredentials } from '../context.js';

/**
 * OKX v5 HMAC-SHA256 signer.
 *
 * Static class — never instantiate.
 *
 * Signing rule per OKX v5 docs:
 *
 *     prehash = timestamp + method + requestPath + body
 *     sign    = base64(HMAC_SHA256(apiSecret, prehash))
 *
 * Где:
 * - `timestamp` — ISO-8601 UTC с миллисекундами (`2020-12-08T09:08:57.715Z`).
 *   Получается через `new Date().toISOString()`.
 * - `method` — HTTP-метод верхним регистром (`GET`, `POST`).
 * - `requestPath` — путь **с query string**, например
 *   `/api/v5/account/balance?ccy=BTC` (для GET без параметров — просто
 *   `/api/v5/account/balance`).
 * - `body` — JSON тело для POST/PUT, либо пустая строка для GET/DELETE.
 *
 * Подпись передаётся в заголовке `OK-ACCESS-SIGN`. Дополнительные
 * заголовки, которые ставит транспорт `OkxHttp`:
 * - `OK-ACCESS-KEY` — api key.
 * - `OK-ACCESS-TIMESTAMP` — тот же `timestamp`, что в prehash.
 * - `OK-ACCESS-PASSPHRASE` — passphrase из API-ключа.
 * - `x-simulated-trading: 1` — только для `env=demo`.
 *
 * @see https://www.okx.com/docs-v5/en/#overview-rest-api-authentication
 */
export class OkxSigner {
  private constructor() {
    throw new Error('OkxSigner is a static class and cannot be instantiated');
  }

  /**
   * Сборка ISO-8601 timestamp в формате, который требует OKX
   * (миллисекунды + Z). По сути просто `new Date(ms).toISOString()`,
   * вынесено в метод для тестируемости.
   */
  static formatTimestamp(epochMs: number): string {
    return new Date(epochMs).toISOString();
  }

  static sign(
    credentials: OkxCredentials,
    timestamp: string,
    method: string,
    requestPath: string,
    body: string,
  ): string {
    const prehash = `${timestamp}${method}${requestPath}${body}`;
    return createHmac('sha256', credentials.apiSecret).update(prehash).digest('base64');
  }
}
