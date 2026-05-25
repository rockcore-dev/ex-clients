import type { BybitContext } from '../../../context.js';
import { BybitHttp } from '../../../http/http.js';

/**
 * Result of `GET /v5/market/time`.
 *
 * @see https://bybit-exchange.github.io/docs/v5/market/time
 */
export interface GetServerTimeResult {
  /** Bybit server time, in seconds. String-encoded integer (kept as-is from the API). */
  timeSecond: string;
  /** Bybit server time, in nanoseconds. String-encoded integer (kept as-is from the API). */
  timeNano: string;
}

/**
 * Category-agnostic public endpoints of Bybit v5 (system / server status).
 *
 * Static class — never instantiate.
 */
export class BybitPublicCommon {
  private constructor() {
    throw new Error('BybitPublicCommon is a static class and cannot be instantiated');
  }

  /**
   * GET `/v5/market/time` — Get Bybit Server Time.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/time
   *
   * Request: no parameters (ctx only).
   *
   * Response (`result`):
   * - `timeSecond` — server time in seconds (string-encoded integer).
   * - `timeNano`   — server time in nanoseconds (string-encoded integer).
   *
   * @example
   *   const time = await BybitPublicCommon.getServerTime({ env: 'testnet' });
   *   // { timeSecond: '1700000000', timeNano: '1700000000000000000' }
   */
  static getServerTime(ctx: BybitContext = {}): Promise<GetServerTimeResult> {
    return BybitHttp.request<GetServerTimeResult>(ctx, {
      method: 'GET',
      path: '/v5/market/time',
    });
  }
}
