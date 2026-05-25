import type { OkxContext } from '../../../context.js';
import { OkxHttp } from '../../../http/http.js';

import type {
  GetFundingRateHistoryParams,
  GetFundingRateHistoryResult,
  GetFundingRateParams,
  GetFundingRateResult,
  GetSwapHistoryKlineParams,
  GetSwapHistoryKlineResult,
  GetSwapHistoryTradesParams,
  GetSwapHistoryTradesResult,
  GetSwapIndexKlineParams,
  GetSwapIndexKlineResult,
  GetSwapInstrumentsParams,
  GetSwapInstrumentsResult,
  GetSwapInsuranceFundParams,
  GetSwapInsuranceFundResult,
  GetSwapKlineParams,
  GetSwapKlineResult,
  GetSwapMarkPriceKlineParams,
  GetSwapMarkPriceKlineResult,
  GetSwapMarkPriceParams,
  GetSwapMarkPriceResult,
  GetSwapOpenInterestParams,
  GetSwapOpenInterestResult,
  GetSwapOrderbookParams,
  GetSwapOrderbookResult,
  GetSwapPriceLimitParams,
  GetSwapPriceLimitResult,
  GetSwapRecentTradesParams,
  GetSwapRecentTradesResult,
  GetSwapTickerParams,
  GetSwapTickerResult,
  GetSwapTickersParams,
  GetSwapTickersResult,
} from './types.js';

/**
 * Public swap market endpoints of OKX v5 (`instType='SWAP'`).
 *
 * Параметр `instType=SWAP` подставляется автоматически — снаружи
 * передавать его не нужно. Для FUTURES — `OkxPublicFuturesMarket`,
 * для SPOT — `OkxPublicSpotMarket`.
 *
 * Static class — never instantiate.
 */
export class OkxPublicSwapMarket {
  private constructor() {
    throw new Error('OkxPublicSwapMarket is a static class and cannot be instantiated');
  }

  /**
   * GET `/api/v5/public/instruments?instType=SWAP` — Get Instruments.
   *
   * @see https://www.okx.com/docs-v5/en/#public-data-rest-api-get-instruments
   */
  static getInstruments(
    ctx: OkxContext,
    params: GetSwapInstrumentsParams = {},
  ): Promise<GetSwapInstrumentsResult> {
    return OkxHttp.request<GetSwapInstrumentsResult>(ctx, {
      method: 'GET',
      path: '/api/v5/public/instruments',
      query: {
        instType: 'SWAP',
        uly: params.uly,
        instFamily: params.instFamily,
        instId: params.instId,
      },
    });
  }

  /**
   * GET `/api/v5/market/tickers?instType=SWAP` — Get Tickers.
   */
  static getTickers(
    ctx: OkxContext,
    params: GetSwapTickersParams = {},
  ): Promise<GetSwapTickersResult> {
    return OkxHttp.request<GetSwapTickersResult>(ctx, {
      method: 'GET',
      path: '/api/v5/market/tickers',
      query: { instType: 'SWAP', uly: params.uly, instFamily: params.instFamily },
    });
  }

  /**
   * GET `/api/v5/market/ticker?instId=...` — Get Ticker.
   */
  static getTicker(ctx: OkxContext, params: GetSwapTickerParams): Promise<GetSwapTickerResult> {
    return OkxHttp.request<GetSwapTickerResult>(ctx, {
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
    params: GetSwapOrderbookParams,
  ): Promise<GetSwapOrderbookResult> {
    return OkxHttp.request<GetSwapOrderbookResult>(ctx, {
      method: 'GET',
      path: '/api/v5/market/books',
      query: { instId: params.instId, sz: params.sz },
    });
  }

  /**
   * GET `/api/v5/market/candles` — Get Candlesticks.
   */
  static getKline(ctx: OkxContext, params: GetSwapKlineParams): Promise<GetSwapKlineResult> {
    return OkxHttp.request<GetSwapKlineResult>(ctx, {
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
    params: GetSwapHistoryKlineParams,
  ): Promise<GetSwapHistoryKlineResult> {
    return OkxHttp.request<GetSwapHistoryKlineResult>(ctx, {
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
   *
   * @see https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-index-candlesticks
   *
   * `instId` — индекс-код (например, `'BTC-USDT'` или `'BTC-USD'`),
   * не путать с торгуемым контрактом `BTC-USDT-SWAP`.
   */
  static getIndexKline(
    ctx: OkxContext,
    params: GetSwapIndexKlineParams,
  ): Promise<GetSwapIndexKlineResult> {
    return OkxHttp.request<GetSwapIndexKlineResult>(ctx, {
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
    params: GetSwapMarkPriceKlineParams,
  ): Promise<GetSwapMarkPriceKlineResult> {
    return OkxHttp.request<GetSwapMarkPriceKlineResult>(ctx, {
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
    params: GetSwapRecentTradesParams,
  ): Promise<GetSwapRecentTradesResult> {
    return OkxHttp.request<GetSwapRecentTradesResult>(ctx, {
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
    params: GetSwapHistoryTradesParams,
  ): Promise<GetSwapHistoryTradesResult> {
    return OkxHttp.request<GetSwapHistoryTradesResult>(ctx, {
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
   * GET `/api/v5/public/funding-rate?instId=...` — Get Funding Rate.
   *
   * Только для SWAP. Возвращает текущую ставку и время следующего расчёта.
   *
   * @see https://www.okx.com/docs-v5/en/#public-data-rest-api-get-funding-rate
   */
  static getFundingRate(
    ctx: OkxContext,
    params: GetFundingRateParams,
  ): Promise<GetFundingRateResult> {
    return OkxHttp.request<GetFundingRateResult>(ctx, {
      method: 'GET',
      path: '/api/v5/public/funding-rate',
      query: { instId: params.instId },
    });
  }

  /**
   * GET `/api/v5/public/funding-rate-history?instId=...` — Get Funding Rate History.
   *
   * @see https://www.okx.com/docs-v5/en/#public-data-rest-api-get-funding-rate-history
   */
  static getFundingRateHistory(
    ctx: OkxContext,
    params: GetFundingRateHistoryParams,
  ): Promise<GetFundingRateHistoryResult> {
    return OkxHttp.request<GetFundingRateHistoryResult>(ctx, {
      method: 'GET',
      path: '/api/v5/public/funding-rate-history',
      query: {
        instId: params.instId,
        before: params.before,
        after: params.after,
        limit: params.limit,
      },
    });
  }

  /**
   * GET `/api/v5/public/open-interest?instType=SWAP` — Get Open Interest.
   *
   * @see https://www.okx.com/docs-v5/en/#public-data-rest-api-get-open-interest
   */
  static getOpenInterest(
    ctx: OkxContext,
    params: GetSwapOpenInterestParams = {},
  ): Promise<GetSwapOpenInterestResult> {
    return OkxHttp.request<GetSwapOpenInterestResult>(ctx, {
      method: 'GET',
      path: '/api/v5/public/open-interest',
      query: {
        instType: 'SWAP',
        uly: params.uly,
        instFamily: params.instFamily,
        instId: params.instId,
      },
    });
  }

  /**
   * GET `/api/v5/public/mark-price?instType=SWAP` — Get Mark Price.
   *
   * @see https://www.okx.com/docs-v5/en/#public-data-rest-api-get-mark-price
   */
  static getMarkPrice(
    ctx: OkxContext,
    params: GetSwapMarkPriceParams = {},
  ): Promise<GetSwapMarkPriceResult> {
    return OkxHttp.request<GetSwapMarkPriceResult>(ctx, {
      method: 'GET',
      path: '/api/v5/public/mark-price',
      query: {
        instType: 'SWAP',
        uly: params.uly,
        instFamily: params.instFamily,
        instId: params.instId,
      },
    });
  }

  /**
   * GET `/api/v5/public/price-limit?instId=...` — Get Limit Price.
   *
   * @see https://www.okx.com/docs-v5/en/#public-data-rest-api-get-limit-price
   */
  static getPriceLimit(
    ctx: OkxContext,
    params: GetSwapPriceLimitParams,
  ): Promise<GetSwapPriceLimitResult> {
    return OkxHttp.request<GetSwapPriceLimitResult>(ctx, {
      method: 'GET',
      path: '/api/v5/public/price-limit',
      query: { instId: params.instId },
    });
  }

  /**
   * GET `/api/v5/public/insurance-fund?instType=SWAP` — Get Insurance Fund.
   *
   * @see https://www.okx.com/docs-v5/en/#public-data-rest-api-get-insurance-fund
   */
  static getInsuranceFund(
    ctx: OkxContext,
    params: GetSwapInsuranceFundParams = {},
  ): Promise<GetSwapInsuranceFundResult> {
    return OkxHttp.request<GetSwapInsuranceFundResult>(ctx, {
      method: 'GET',
      path: '/api/v5/public/insurance-fund',
      query: {
        instType: 'SWAP',
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
}
