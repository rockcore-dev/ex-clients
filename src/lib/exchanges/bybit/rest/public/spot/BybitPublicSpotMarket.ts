import type { BybitContext } from '../../../context.js';
import { BybitHttp } from '../../../http/http.js';

import type {
  GetSpotInstrumentsInfoParams,
  GetSpotInstrumentsInfoResult,
  GetSpotKlineParams,
  GetSpotKlineResult,
  GetSpotOrderbookParams,
  GetSpotOrderbookResult,
  GetSpotRecentTradesParams,
  GetSpotRecentTradesResult,
  GetSpotTickersParams,
  GetSpotTickersResult,
} from './types.js';

/**
 * Public spot market endpoints of Bybit v5.
 *
 * Каждый метод фиксирует `category=spot` на уровне реализации — снаружи
 * этот параметр передавать не нужно. Для linear / inverse используйте
 * `BybitPublicFuturesMarket`.
 *
 * Static class — never instantiate.
 */
export class BybitPublicSpotMarket {
  private constructor() {
    throw new Error('BybitPublicSpotMarket is a static class and cannot be instantiated');
  }

  /**
   * GET `/v5/market/kline?category=spot` — Get Kline.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/kline
   *
   * Возвращает массив свечей в порядке от новых к старым. Каждая свеча —
   * tuple `[start, open, high, low, close, volume, turnover]` из строк.
   */
  static getKline(ctx: BybitContext, params: GetSpotKlineParams): Promise<GetSpotKlineResult> {
    return BybitHttp.request<GetSpotKlineResult>(ctx, {
      method: 'GET',
      path: '/v5/market/kline',
      query: {
        category: 'spot',
        symbol: params.symbol,
        interval: params.interval,
        start: params.start,
        end: params.end,
        limit: params.limit,
      },
    });
  }

  /**
   * GET `/v5/market/instruments-info?category=spot` — Get Instruments Info.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/instrument
   */
  static getInstrumentsInfo(
    ctx: BybitContext,
    params: GetSpotInstrumentsInfoParams = {},
  ): Promise<GetSpotInstrumentsInfoResult> {
    return BybitHttp.request<GetSpotInstrumentsInfoResult>(ctx, {
      method: 'GET',
      path: '/v5/market/instruments-info',
      query: {
        category: 'spot',
        symbol: params.symbol,
        status: params.status,
        baseCoin: params.baseCoin,
        limit: params.limit,
        cursor: params.cursor,
      },
    });
  }

  /**
   * GET `/v5/market/orderbook?category=spot` — Get Orderbook.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/orderbook
   *
   * Поля ответа короткие (`s`, `b`, `a`, `ts`, `u`) — это формат самого
   * Bybit, мы его не переименовываем.
   */
  static getOrderbook(
    ctx: BybitContext,
    params: GetSpotOrderbookParams,
  ): Promise<GetSpotOrderbookResult> {
    return BybitHttp.request<GetSpotOrderbookResult>(ctx, {
      method: 'GET',
      path: '/v5/market/orderbook',
      query: {
        category: 'spot',
        symbol: params.symbol,
        limit: params.limit,
      },
    });
  }

  /**
   * GET `/v5/market/tickers?category=spot` — Get Tickers.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/tickers
   *
   * Без `symbol` возвращает тикеры по всем доступным spot-инструментам.
   */
  static getTickers(
    ctx: BybitContext,
    params: GetSpotTickersParams = {},
  ): Promise<GetSpotTickersResult> {
    return BybitHttp.request<GetSpotTickersResult>(ctx, {
      method: 'GET',
      path: '/v5/market/tickers',
      query: {
        category: 'spot',
        symbol: params.symbol,
      },
    });
  }

  /**
   * GET `/v5/market/recent-trade?category=spot` — Get Public Recent Trades.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/recent-trade
   */
  static getRecentTrades(
    ctx: BybitContext,
    params: GetSpotRecentTradesParams,
  ): Promise<GetSpotRecentTradesResult> {
    return BybitHttp.request<GetSpotRecentTradesResult>(ctx, {
      method: 'GET',
      path: '/v5/market/recent-trade',
      query: {
        category: 'spot',
        symbol: params.symbol,
        limit: params.limit,
      },
    });
  }
}
