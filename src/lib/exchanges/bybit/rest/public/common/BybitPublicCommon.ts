import type { BybitContext } from '../../../context.js';
import { BybitHttp } from '../../../http/http.js';

import type { GetInsuranceParams, GetInsuranceResult, GetServerTimeResult } from './types.js';

/**
 * Category-agnostic public endpoints of Bybit v5.
 *
 * Сюда попадают только методы, которые не привязаны к `category`
 * (server time, страховой пул и т.п.). Категориально-зависимые ручки
 * (kline, tickers, orderbook, ...) живут в `BybitPublicSpotMarket` и
 * `BybitPublicFuturesMarket` — у них фиксированная или ограниченная
 * `category`.
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
   * Запрос: параметров нет (только `ctx`).
   *
   * @example
   *   const t = await BybitPublicCommon.getServerTime({ env: 'testnet' });
   *   // { timeSecond: '1700000000', timeNano: '1700000000000000000' }
   */
  static getServerTime(ctx: BybitContext = {}): Promise<GetServerTimeResult> {
    return BybitHttp.request<GetServerTimeResult>(ctx, {
      method: 'GET',
      path: '/v5/market/time',
    });
  }

  /**
   * GET `/v5/market/insurance` — Get Insurance Pool.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/insurance
   *
   * Возвращает суммарные значения страхового пула Bybit по каждой монете.
   * Параметр `coin` фильтрует ответ до одной монеты.
   *
   * @example
   *   const pool = await BybitPublicCommon.getInsurance({}, { coin: 'BTC' });
   *   // { updatedTime: '...', list: [{ coin: 'BTC', balance: '...', value: '...' }] }
   */
  static getInsurance(
    ctx: BybitContext = {},
    params: GetInsuranceParams = {},
  ): Promise<GetInsuranceResult> {
    return BybitHttp.request<GetInsuranceResult>(ctx, {
      method: 'GET',
      path: '/v5/market/insurance',
      query: { coin: params.coin },
    });
  }
}
