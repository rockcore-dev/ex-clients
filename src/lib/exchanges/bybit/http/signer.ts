import { createHmac } from 'node:crypto';

import type { BybitCredentials } from '../context.js';

/**
 * Bybit v5 HMAC-SHA256 signer.
 *
 * Static class — never instantiate.
 *
 * Signing rule per Bybit v5 docs:
 *
 *     prehash = timestamp + apiKey + recvWindow + payload
 *     sign    = HMAC_SHA256(apiSecret, prehash).hex()
 *
 * Where `payload` is:
 * - the query string (without leading `?`) for GET / DELETE
 * - the raw JSON body for POST / PUT
 *
 * The result goes into the `X-BAPI-SIGN` header along with:
 * - `X-BAPI-API-KEY`
 * - `X-BAPI-SIGN-TYPE: 2`
 * - `X-BAPI-TIMESTAMP`
 * - `X-BAPI-RECV-WINDOW`
 *
 * @see https://bybit-exchange.github.io/docs/v5/guide#authentication
 */
export class BybitSigner {
  /** Disallow `new BybitSigner()` — defense in depth on top of the static API. */
  private constructor() {
    throw new Error('BybitSigner is a static class and cannot be instantiated');
  }

  static sign(
    credentials: BybitCredentials,
    recvWindow: number,
    timestamp: number,
    payload: string,
  ): string {
    const prehash = `${String(timestamp)}${credentials.apiKey}${String(recvWindow)}${payload}`;
    return createHmac('sha256', credentials.apiSecret).update(prehash).digest('hex');
  }
}
