import type { OkxContext } from '../../../context.js';
import { OkxHttp } from '../../../http/http.js';

import type { GetSystemTimeResult } from './types.js';

/**
 * Категориально-нейтральные публичные эндпоинты OKX v5.
 *
 * Сюда попадают только методы, которые не привязаны к `instType` —
 * например, серверное время. Категориально-зависимые ручки живут в
 * `OkxPublicSpotMarket` / `OkxPublicSwapMarket` / `OkxPublicFuturesMarket`.
 *
 * Static class — never instantiate.
 */
export class OkxPublicCommon {
  private constructor() {
    throw new Error('OkxPublicCommon is a static class and cannot be instantiated');
  }

  /**
   * GET `/api/v5/public/time` — Get System Time.
   *
   * @see https://www.okx.com/docs-v5/en/#public-data-rest-api-get-system-time
   *
   * Запрос: параметров нет (только `ctx`).
   *
   * @example
   *   const [{ ts }] = await OkxPublicCommon.getSystemTime();
   *   console.log(new Date(Number(ts)).toISOString());
   */
  static getSystemTime(ctx: OkxContext = {}): Promise<GetSystemTimeResult> {
    return OkxHttp.request<GetSystemTimeResult>(ctx, {
      method: 'GET',
      path: '/api/v5/public/time',
    });
  }
}
