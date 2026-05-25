import type { OkxContext } from '../../../context.js';
import { OkxHttp } from '../../../http/http.js';

import type {
  GetSpotHistoryKlineParams,
  GetSpotHistoryKlineResult,
  GetSpotHistoryTradesParams,
  GetSpotHistoryTradesResult,
  GetSpotInstrumentsParams,
  GetSpotInstrumentsResult,
  GetSpotKlineParams,
  GetSpotKlineResult,
  GetSpotOrderbookParams,
  GetSpotOrderbookResult,
  GetSpotRecentTradesParams,
  GetSpotRecentTradesResult,
  GetSpotTickerParams,
  GetSpotTickerResult,
  GetSpotTickersParams,
  GetSpotTickersResult,
} from './types.js';

/**
 * Public spot market endpoints of OKX v5.
 *
 * Все методы фиксируют `instType=SPOT` на уровне реализации; снаружи
 * этот параметр передавать не нужно. Для SWAP / FUTURES — отдельные
 * классы `OkxPublicSwapMarket` / `OkxPublicFuturesMarket`.
 *
 * Static class — never instantiate.
 */
export class OkxPublicSpotMarket {
  private constructor() {
    throw new Error('OkxPublicSpotMarket is a static class and cannot be instantiated');
  }

  /**
   * GET `/api/v5/public/instruments?instType=SPOT` — Get Instruments.
   *
   * @see https://www.okx.com/docs-v5/en/#public-data-rest-api-get-instruments
   */
  static getInstruments(
    ctx: OkxContext,
    params: GetSpotInstrumentsParams = {},
  ): Promise<GetSpotInstrumentsResult> {
    return OkxHttp.request<GetSpotInstrumentsResult>(ctx, {
      method: 'GET',
      path: '/api/v5/public/instruments',
      query: { instType: 'SPOT', instId: params.instId },
    });
  }

  /**
   * GET `/api/v5/market/tickers?instType=SPOT` — Get Tickers.
   *
   * @see https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-tickers
   */
  static getTickers(
    ctx: OkxContext,
    params: GetSpotTickersParams = {},
  ): Promise<GetSpotTickersResult> {
    return OkxHttp.request<GetSpotTickersResult>(ctx, {
      method: 'GET',
      path: '/api/v5/market/tickers',
      query: { instType: 'SPOT', uly: params.uly, instFamily: params.instFamily },
    });
  }

  /**
   * GET `/api/v5/market/ticker?instId=...` — Get Ticker.
   *
   * @see https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-ticker
   */
  static getTicker(ctx: OkxContext, params: GetSpotTickerParams): Promise<GetSpotTickerResult> {
    return OkxHttp.request<GetSpotTickerResult>(ctx, {
      method: 'GET',
      path: '/api/v5/market/ticker',
      query: { instId: params.instId },
    });
  }

  /**
   * GET `/api/v5/market/books?instId=...` — Get Order Book.
   *
   * @see https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-order-book
   */
  static getOrderbook(
    ctx: OkxContext,
    params: GetSpotOrderbookParams,
  ): Promise<GetSpotOrderbookResult> {
    return OkxHttp.request<GetSpotOrderbookResult>(ctx, {
      method: 'GET',
      path: '/api/v5/market/books',
      query: { instId: params.instId, sz: params.sz },
    });
  }

  /**
   * GET `/api/v5/market/candles?instId=...` — Get Candlesticks.
   *
   * @see https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-candlesticks
   */
  static getKline(ctx: OkxContext, params: GetSpotKlineParams): Promise<GetSpotKlineResult> {
    return OkxHttp.request<GetSpotKlineResult>(ctx, {
      method: 'GET',
      path: '/api/v5/market/candles',
      query: {
        instId: params.instId,
        bar: params.bar,
        before: params.before,
        after: params.after,
        limit: params.limit,
      },
    });
  }

  /**
   * GET `/api/v5/market/history-candles?instId=...` — Get Candlesticks History.
   *
   * @see https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-candlesticks-history
   */
  static getHistoryKline(
    ctx: OkxContext,
    params: GetSpotHistoryKlineParams,
  ): Promise<GetSpotHistoryKlineResult> {
    return OkxHttp.request<GetSpotHistoryKlineResult>(ctx, {
      method: 'GET',
      path: '/api/v5/market/history-candles',
      query: {
        instId: params.instId,
        bar: params.bar,
        before: params.before,
        after: params.after,
        limit: params.limit,
      },
    });
  }

  /**
   * GET `/api/v5/market/trades?instId=...` — Get Trades.
   *
   * @see https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-trades
   */
  static getRecentTrades(
    ctx: OkxContext,
    params: GetSpotRecentTradesParams,
  ): Promise<GetSpotRecentTradesResult> {
    return OkxHttp.request<GetSpotRecentTradesResult>(ctx, {
      method: 'GET',
      path: '/api/v5/market/trades',
      query: { instId: params.instId, limit: params.limit },
    });
  }

  /**
   * GET `/api/v5/market/history-trades?instId=...` — Get Trades History.
   *
   * @see https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-trades-history
   */
  static getHistoryTrades(
    ctx: OkxContext,
    params: GetSpotHistoryTradesParams,
  ): Promise<GetSpotHistoryTradesResult> {
    return OkxHttp.request<GetSpotHistoryTradesResult>(ctx, {
      method: 'GET',
      path: '/api/v5/market/history-trades',
      query: {
        instId: params.instId,
        type: params.type,
        before: params.before,
        after: params.after,
        limit: params.limit,
      },
    });
  }
}
