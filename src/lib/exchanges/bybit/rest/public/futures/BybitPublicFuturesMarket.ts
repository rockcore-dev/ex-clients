import type { BybitContext } from '../../../context.js';
import { BybitHttp } from '../../../http/http.js';

import type {
  GetDeliveryPriceParams,
  GetDeliveryPriceResult,
  GetFundingRateHistoryParams,
  GetFundingRateHistoryResult,
  GetFuturesInstrumentsInfoParams,
  GetFuturesInstrumentsInfoResult,
  GetFuturesKlineParams,
  GetFuturesKlineResult,
  GetFuturesOrderbookParams,
  GetFuturesOrderbookResult,
  GetFuturesRecentTradesParams,
  GetFuturesRecentTradesResult,
  GetFuturesTickersParams,
  GetFuturesTickersResult,
  GetIndexPriceKlineParams,
  GetIndexPriceKlineResult,
  GetLongShortRatioParams,
  GetLongShortRatioResult,
  GetMarkPriceKlineParams,
  GetMarkPriceKlineResult,
  GetOpenInterestParams,
  GetOpenInterestResult,
  GetPremiumIndexPriceKlineParams,
  GetPremiumIndexPriceKlineResult,
  GetRiskLimitParams,
  GetRiskLimitResult,
} from './types.js';

/**
 * Public futures market endpoints of Bybit v5.
 *
 * Применимо к `category=linear` (USDT/USDC perpetuals и futures) и
 * `category=inverse` (coin-margined). Для spot — `BybitPublicSpotMarket`.
 *
 * Static class — never instantiate.
 */
export class BybitPublicFuturesMarket {
  private constructor() {
    throw new Error('BybitPublicFuturesMarket is a static class and cannot be instantiated');
  }

  /**
   * GET `/v5/market/kline?category=linear|inverse` — Get Kline.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/kline
   */
  static getKline(
    ctx: BybitContext,
    params: GetFuturesKlineParams,
  ): Promise<GetFuturesKlineResult> {
    return BybitHttp.request<GetFuturesKlineResult>(ctx, {
      method: 'GET',
      path: '/v5/market/kline',
      query: {
        category: params.category,
        symbol: params.symbol,
        interval: params.interval,
        start: params.start,
        end: params.end,
        limit: params.limit,
      },
    });
  }

  /**
   * GET `/v5/market/mark-price-kline?category=linear|inverse` — Mark Price Kline.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/mark-kline
   */
  static getMarkPriceKline(
    ctx: BybitContext,
    params: GetMarkPriceKlineParams,
  ): Promise<GetMarkPriceKlineResult> {
    return BybitHttp.request<GetMarkPriceKlineResult>(ctx, {
      method: 'GET',
      path: '/v5/market/mark-price-kline',
      query: {
        category: params.category,
        symbol: params.symbol,
        interval: params.interval,
        start: params.start,
        end: params.end,
        limit: params.limit,
      },
    });
  }

  /**
   * GET `/v5/market/index-price-kline?category=linear|inverse` — Index Price Kline.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/index-kline
   */
  static getIndexPriceKline(
    ctx: BybitContext,
    params: GetIndexPriceKlineParams,
  ): Promise<GetIndexPriceKlineResult> {
    return BybitHttp.request<GetIndexPriceKlineResult>(ctx, {
      method: 'GET',
      path: '/v5/market/index-price-kline',
      query: {
        category: params.category,
        symbol: params.symbol,
        interval: params.interval,
        start: params.start,
        end: params.end,
        limit: params.limit,
      },
    });
  }

  /**
   * GET `/v5/market/premium-index-price-kline?category=linear` — Premium Index Price Kline.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/preimum-index-kline
   *
   * Поддерживается только для `linear`. Для `inverse` Bybit вернёт
   * ошибку — это ограничение биржи, а не библиотеки.
   */
  static getPremiumIndexPriceKline(
    ctx: BybitContext,
    params: GetPremiumIndexPriceKlineParams,
  ): Promise<GetPremiumIndexPriceKlineResult> {
    return BybitHttp.request<GetPremiumIndexPriceKlineResult>(ctx, {
      method: 'GET',
      path: '/v5/market/premium-index-price-kline',
      query: {
        category: params.category,
        symbol: params.symbol,
        interval: params.interval,
        start: params.start,
        end: params.end,
        limit: params.limit,
      },
    });
  }

  /**
   * GET `/v5/market/instruments-info?category=linear|inverse` — Get Instruments Info.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/instrument
   */
  static getInstrumentsInfo(
    ctx: BybitContext,
    params: GetFuturesInstrumentsInfoParams,
  ): Promise<GetFuturesInstrumentsInfoResult> {
    return BybitHttp.request<GetFuturesInstrumentsInfoResult>(ctx, {
      method: 'GET',
      path: '/v5/market/instruments-info',
      query: {
        category: params.category,
        symbol: params.symbol,
        status: params.status,
        baseCoin: params.baseCoin,
        limit: params.limit,
        cursor: params.cursor,
      },
    });
  }

  /**
   * GET `/v5/market/orderbook?category=linear|inverse` — Get Orderbook.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/orderbook
   */
  static getOrderbook(
    ctx: BybitContext,
    params: GetFuturesOrderbookParams,
  ): Promise<GetFuturesOrderbookResult> {
    return BybitHttp.request<GetFuturesOrderbookResult>(ctx, {
      method: 'GET',
      path: '/v5/market/orderbook',
      query: {
        category: params.category,
        symbol: params.symbol,
        limit: params.limit,
      },
    });
  }

  /**
   * GET `/v5/market/tickers?category=linear|inverse` — Get Tickers.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/tickers
   */
  static getTickers(
    ctx: BybitContext,
    params: GetFuturesTickersParams,
  ): Promise<GetFuturesTickersResult> {
    return BybitHttp.request<GetFuturesTickersResult>(ctx, {
      method: 'GET',
      path: '/v5/market/tickers',
      query: {
        category: params.category,
        symbol: params.symbol,
        baseCoin: params.baseCoin,
        expDate: params.expDate,
      },
    });
  }

  /**
   * GET `/v5/market/funding/history?category=linear|inverse` — Get Funding Rate History.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/history-fund-rate
   */
  static getFundingRateHistory(
    ctx: BybitContext,
    params: GetFundingRateHistoryParams,
  ): Promise<GetFundingRateHistoryResult> {
    return BybitHttp.request<GetFundingRateHistoryResult>(ctx, {
      method: 'GET',
      path: '/v5/market/funding/history',
      query: {
        category: params.category,
        symbol: params.symbol,
        startTime: params.startTime,
        endTime: params.endTime,
        limit: params.limit,
      },
    });
  }

  /**
   * GET `/v5/market/recent-trade?category=linear|inverse` — Get Public Recent Trades.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/recent-trade
   */
  static getRecentTrades(
    ctx: BybitContext,
    params: GetFuturesRecentTradesParams,
  ): Promise<GetFuturesRecentTradesResult> {
    return BybitHttp.request<GetFuturesRecentTradesResult>(ctx, {
      method: 'GET',
      path: '/v5/market/recent-trade',
      query: {
        category: params.category,
        symbol: params.symbol,
        limit: params.limit,
        optionType: params.optionType,
        baseCoin: params.baseCoin,
      },
    });
  }

  /**
   * GET `/v5/market/open-interest?category=linear|inverse` — Get Open Interest.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/open-interest
   */
  static getOpenInterest(
    ctx: BybitContext,
    params: GetOpenInterestParams,
  ): Promise<GetOpenInterestResult> {
    return BybitHttp.request<GetOpenInterestResult>(ctx, {
      method: 'GET',
      path: '/v5/market/open-interest',
      query: {
        category: params.category,
        symbol: params.symbol,
        intervalTime: params.intervalTime,
        startTime: params.startTime,
        endTime: params.endTime,
        limit: params.limit,
        cursor: params.cursor,
      },
    });
  }

  /**
   * GET `/v5/market/risk-limit?category=linear|inverse` — Get Risk Limit.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/risk-limit
   */
  static getRiskLimit(ctx: BybitContext, params: GetRiskLimitParams): Promise<GetRiskLimitResult> {
    return BybitHttp.request<GetRiskLimitResult>(ctx, {
      method: 'GET',
      path: '/v5/market/risk-limit',
      query: {
        category: params.category,
        symbol: params.symbol,
        cursor: params.cursor,
      },
    });
  }

  /**
   * GET `/v5/market/delivery-price?category=linear|inverse` — Get Delivery Price.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/delivery-price
   *
   * Имеет смысл только для futures-контрактов с поставкой (не perpetual).
   */
  static getDeliveryPrice(
    ctx: BybitContext,
    params: GetDeliveryPriceParams,
  ): Promise<GetDeliveryPriceResult> {
    return BybitHttp.request<GetDeliveryPriceResult>(ctx, {
      method: 'GET',
      path: '/v5/market/delivery-price',
      query: {
        category: params.category,
        symbol: params.symbol,
        baseCoin: params.baseCoin,
        limit: params.limit,
        cursor: params.cursor,
      },
    });
  }

  /**
   * GET `/v5/market/account-ratio?category=linear|inverse` — Get Long/Short Ratio.
   *
   * @see https://bybit-exchange.github.io/docs/v5/market/long-short-ratio
   */
  static getLongShortRatio(
    ctx: BybitContext,
    params: GetLongShortRatioParams,
  ): Promise<GetLongShortRatioResult> {
    return BybitHttp.request<GetLongShortRatioResult>(ctx, {
      method: 'GET',
      path: '/v5/market/account-ratio',
      query: {
        category: params.category,
        symbol: params.symbol,
        period: params.period,
        limit: params.limit,
      },
    });
  }
}
