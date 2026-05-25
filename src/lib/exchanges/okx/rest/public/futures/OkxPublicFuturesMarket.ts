import type { OkxContext } from '../../../context.js';
import { OkxHttp } from '../../../http/http.js';

import type {
  GetDeliveryExerciseHistoryParams,
  GetDeliveryExerciseHistoryResult,
  GetEstimatedPriceParams,
  GetEstimatedPriceResult,
  GetFuturesHistoryKlineParams,
  GetFuturesHistoryKlineResult,
  GetFuturesHistoryTradesParams,
  GetFuturesHistoryTradesResult,
  GetFuturesIndexKlineParams,
  GetFuturesIndexKlineResult,
  GetFuturesInstrumentsParams,
  GetFuturesInstrumentsResult,
  GetFuturesInsuranceFundParams,
  GetFuturesInsuranceFundResult,
  GetFuturesKlineParams,
  GetFuturesKlineResult,
  GetFuturesMarkPriceKlineParams,
  GetFuturesMarkPriceKlineResult,
  GetFuturesMarkPriceParams,
  GetFuturesMarkPriceResult,
  GetFuturesOpenInterestParams,
  GetFuturesOpenInterestResult,
  GetFuturesOrderbookParams,
  GetFuturesOrderbookResult,
  GetFuturesPriceLimitParams,
  GetFuturesPriceLimitResult,
  GetFuturesRecentTradesParams,
  GetFuturesRecentTradesResult,
  GetFuturesTickerParams,
  GetFuturesTickerResult,
  GetFuturesTickersParams,
  GetFuturesTickersResult,
} from './types.js';

/**
 * Public futures market endpoints of OKX v5 (`instType='FUTURES'`).
 *
 * Параметр `instType=FUTURES` подставляется автоматически. Для SWAP —
 * `OkxPublicSwapMarket`, для SPOT — `OkxPublicSpotMarket`.
 *
 * Static class — never instantiate.
 */
export class OkxPublicFuturesMarket {
  private constructor() {
    throw new Error('OkxPublicFuturesMarket is a static class and cannot be instantiated');
  }

  /**
   * GET `/api/v5/public/instruments?instType=FUTURES` — Get Instruments.
   *
   * @see https://www.okx.com/docs-v5/en/#public-data-rest-api-get-instruments
   */
  static getInstruments(
    ctx: OkxContext,
    params: GetFuturesInstrumentsParams = {},
  ): Promise<GetFuturesInstrumentsResult> {
    return OkxHttp.request<GetFuturesInstrumentsResult>(ctx, {
      method: 'GET',
      path: '/api/v5/public/instruments',
      query: {
        instType: 'FUTURES',
        uly: params.uly,
        instFamily: params.instFamily,
        instId: params.instId,
      },
    });
  }

  /**
   * GET `/api/v5/market/tickers?instType=FUTURES` — Get Tickers.
   */
  static getTickers(
    ctx: OkxContext,
    params: GetFuturesTickersParams = {},
  ): Promise<GetFuturesTickersResult> {
    return OkxHttp.request<GetFuturesTickersResult>(ctx, {
      method: 'GET',
      path: '/api/v5/market/tickers',
      query: { instType: 'FUTURES', uly: params.uly, instFamily: params.instFamily },
    });
  }

  /**
   * GET `/api/v5/market/ticker?instId=...` — Get Ticker.
   */
  static getTicker(
    ctx: OkxContext,
    params: GetFuturesTickerParams,
  ): Promise<GetFuturesTickerResult> {
    return OkxHttp.request<GetFuturesTickerResult>(ctx, {
      method: 'GET',
      path: '/api/v5/market/ticker',
      query: { instId: params.instId },
    });
  }

  /**
   * GET `/api/v5/market/books?instId=...` — Get Order Book.
   */
  static getOrderbook(
    ctx: OkxContext,
    params: GetFuturesOrderbookParams,
  ): Promise<GetFuturesOrderbookResult> {
    return OkxHttp.request<GetFuturesOrderbookResult>(ctx, {
      method: 'GET',
      path: '/api/v5/market/books',
      query: { instId: params.instId, sz: params.sz },
    });
  }

  /**
   * GET `/api/v5/market/candles` — Get Candlesticks.
   */
  static getKline(ctx: OkxContext, params: GetFuturesKlineParams): Promise<GetFuturesKlineResult> {
    return OkxHttp.request<GetFuturesKlineResult>(ctx, {
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
   * GET `/api/v5/market/history-candles` — Get Candlesticks History.
   */
  static getHistoryKline(
    ctx: OkxContext,
    params: GetFuturesHistoryKlineParams,
  ): Promise<GetFuturesHistoryKlineResult> {
    return OkxHttp.request<GetFuturesHistoryKlineResult>(ctx, {
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
   * GET `/api/v5/market/index-candles` — Get Index Candlesticks.
   */
  static getIndexKline(
    ctx: OkxContext,
    params: GetFuturesIndexKlineParams,
  ): Promise<GetFuturesIndexKlineResult> {
    return OkxHttp.request<GetFuturesIndexKlineResult>(ctx, {
      method: 'GET',
      path: '/api/v5/market/index-candles',
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
   * GET `/api/v5/market/mark-price-candles` — Get Mark Price Candlesticks.
   */
  static getMarkPriceKline(
    ctx: OkxContext,
    params: GetFuturesMarkPriceKlineParams,
  ): Promise<GetFuturesMarkPriceKlineResult> {
    return OkxHttp.request<GetFuturesMarkPriceKlineResult>(ctx, {
      method: 'GET',
      path: '/api/v5/market/mark-price-candles',
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
   * GET `/api/v5/market/trades` — Get Trades.
   */
  static getRecentTrades(
    ctx: OkxContext,
    params: GetFuturesRecentTradesParams,
  ): Promise<GetFuturesRecentTradesResult> {
    return OkxHttp.request<GetFuturesRecentTradesResult>(ctx, {
      method: 'GET',
      path: '/api/v5/market/trades',
      query: { instId: params.instId, limit: params.limit },
    });
  }

  /**
   * GET `/api/v5/market/history-trades` — Get Trades History.
   */
  static getHistoryTrades(
    ctx: OkxContext,
    params: GetFuturesHistoryTradesParams,
  ): Promise<GetFuturesHistoryTradesResult> {
    return OkxHttp.request<GetFuturesHistoryTradesResult>(ctx, {
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

  /**
   * GET `/api/v5/public/open-interest?instType=FUTURES` — Get Open Interest.
   */
  static getOpenInterest(
    ctx: OkxContext,
    params: GetFuturesOpenInterestParams = {},
  ): Promise<GetFuturesOpenInterestResult> {
    return OkxHttp.request<GetFuturesOpenInterestResult>(ctx, {
      method: 'GET',
      path: '/api/v5/public/open-interest',
      query: {
        instType: 'FUTURES',
        uly: params.uly,
        instFamily: params.instFamily,
        instId: params.instId,
      },
    });
  }

  /**
   * GET `/api/v5/public/mark-price?instType=FUTURES` — Get Mark Price.
   */
  static getMarkPrice(
    ctx: OkxContext,
    params: GetFuturesMarkPriceParams = {},
  ): Promise<GetFuturesMarkPriceResult> {
    return OkxHttp.request<GetFuturesMarkPriceResult>(ctx, {
      method: 'GET',
      path: '/api/v5/public/mark-price',
      query: {
        instType: 'FUTURES',
        uly: params.uly,
        instFamily: params.instFamily,
        instId: params.instId,
      },
    });
  }

  /**
   * GET `/api/v5/public/price-limit?instId=...` — Get Limit Price.
   */
  static getPriceLimit(
    ctx: OkxContext,
    params: GetFuturesPriceLimitParams,
  ): Promise<GetFuturesPriceLimitResult> {
    return OkxHttp.request<GetFuturesPriceLimitResult>(ctx, {
      method: 'GET',
      path: '/api/v5/public/price-limit',
      query: { instId: params.instId },
    });
  }

  /**
   * GET `/api/v5/public/insurance-fund?instType=FUTURES` — Get Insurance Fund.
   */
  static getInsuranceFund(
    ctx: OkxContext,
    params: GetFuturesInsuranceFundParams = {},
  ): Promise<GetFuturesInsuranceFundResult> {
    return OkxHttp.request<GetFuturesInsuranceFundResult>(ctx, {
      method: 'GET',
      path: '/api/v5/public/insurance-fund',
      query: {
        instType: 'FUTURES',
        type: params.type,
        uly: params.uly,
        instFamily: params.instFamily,
        ccy: params.ccy,
        before: params.before,
        after: params.after,
        limit: params.limit,
      },
    });
  }

  /**
   * GET `/api/v5/public/estimated-price?instId=...` — Get Estimated Delivery / Exercise Price.
   *
   * Доступно только для FUTURES и OPTION; не для perpetual SWAP.
   *
   * @see https://www.okx.com/docs-v5/en/#public-data-rest-api-get-estimated-delivery-exercise-price
   */
  static getEstimatedPrice(
    ctx: OkxContext,
    params: GetEstimatedPriceParams,
  ): Promise<GetEstimatedPriceResult> {
    return OkxHttp.request<GetEstimatedPriceResult>(ctx, {
      method: 'GET',
      path: '/api/v5/public/estimated-price',
      query: { instId: params.instId },
    });
  }

  /**
   * GET `/api/v5/public/delivery-exercise-history?instType=FUTURES` — Get Delivery / Exercise History.
   *
   * Один из `uly` или `instFamily` обязателен.
   *
   * @see https://www.okx.com/docs-v5/en/#public-data-rest-api-get-delivery-exercise-history
   */
  static getDeliveryExerciseHistory(
    ctx: OkxContext,
    params: GetDeliveryExerciseHistoryParams = {},
  ): Promise<GetDeliveryExerciseHistoryResult> {
    return OkxHttp.request<GetDeliveryExerciseHistoryResult>(ctx, {
      method: 'GET',
      path: '/api/v5/public/delivery-exercise-history',
      query: {
        instType: 'FUTURES',
        uly: params.uly,
        instFamily: params.instFamily,
        before: params.before,
        after: params.after,
        limit: params.limit,
      },
    });
  }
}
