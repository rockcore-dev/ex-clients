import type {
  ContractType,
  IntervalTime,
  Kline,
  KlineInterval,
  OrderSide,
  OrderbookLevel,
  PriceKline,
} from '../../../types/market.js';
import type { FuturesCategory } from '../../../types/common.js';

// ============================================================================
// /v5/market/kline (linear / inverse)
// ============================================================================

export interface GetFuturesKlineParams {
  category: FuturesCategory;
  symbol: string;
  interval: KlineInterval;
  start?: number;
  end?: number;
  /** Лимит. 1..1000, по умолчанию 200. */
  limit?: number;
}

export interface GetFuturesKlineResult {
  category: FuturesCategory;
  symbol: string;
  list: Kline[];
}

// ============================================================================
// /v5/market/mark-price-kline
// ============================================================================

export interface GetMarkPriceKlineParams {
  category: FuturesCategory;
  symbol: string;
  interval: KlineInterval;
  start?: number;
  end?: number;
  limit?: number;
}

export interface GetMarkPriceKlineResult {
  category: FuturesCategory;
  symbol: string;
  list: PriceKline[];
}

// ============================================================================
// /v5/market/index-price-kline
// ============================================================================

export interface GetIndexPriceKlineParams {
  category: FuturesCategory;
  symbol: string;
  interval: KlineInterval;
  start?: number;
  end?: number;
  limit?: number;
}

export interface GetIndexPriceKlineResult {
  category: FuturesCategory;
  symbol: string;
  list: PriceKline[];
}

// ============================================================================
// /v5/market/premium-index-price-kline (linear only)
// ============================================================================

export interface GetPremiumIndexPriceKlineParams {
  /** Bybit поддерживает premium-index только для linear (USDT perpetual). */
  category: 'linear';
  symbol: string;
  interval: KlineInterval;
  start?: number;
  end?: number;
  limit?: number;
}

export interface GetPremiumIndexPriceKlineResult {
  category: 'linear';
  symbol: string;
  list: PriceKline[];
}

// ============================================================================
// /v5/market/instruments-info (linear / inverse)
// ============================================================================

export interface GetFuturesInstrumentsInfoParams {
  category: FuturesCategory;
  symbol?: string;
  status?: 'Trading' | 'Closed';
  baseCoin?: string;
  limit?: number;
  cursor?: string;
}

export interface FuturesInstrument {
  symbol: string;
  contractType: ContractType;
  status: string;
  baseCoin: string;
  quoteCoin: string;
  /** Время листинга, ms. String-encoded integer. */
  launchTime: string;
  /** Время делистинга, ms. `'0'` — бессрочный контракт. */
  deliveryTime: string;
  deliveryFeeRate: string;
  priceScale: string;
  leverageFilter: {
    minLeverage: string;
    maxLeverage: string;
    leverageStep: string;
  };
  priceFilter: {
    minPrice: string;
    maxPrice: string;
    tickSize: string;
  };
  lotSizeFilter: {
    minOrderQty: string;
    maxOrderQty: string;
    qtyStep: string;
    postOnlyMaxOrderQty?: string;
    minNotionalValue?: string;
    maxMktOrderQty?: string;
  };
  unifiedMarginTrade: boolean;
  /** Интервал расчёта funding в минутах. String-encoded integer. */
  fundingInterval: number;
  settleCoin: string;
  copyTrading?: string;
  upperFundingRate?: string;
  lowerFundingRate?: string;
}

export interface GetFuturesInstrumentsInfoResult {
  category: FuturesCategory;
  list: FuturesInstrument[];
  nextPageCursor?: string;
}

// ============================================================================
// /v5/market/orderbook (linear / inverse)
// ============================================================================

export interface GetFuturesOrderbookParams {
  category: FuturesCategory;
  symbol: string;
  /** Глубина. linear/inverse: 1..500. По умолчанию 25. */
  limit?: number;
}

export interface GetFuturesOrderbookResult {
  s: string;
  b: OrderbookLevel[];
  a: OrderbookLevel[];
  ts: number;
  u: number;
  /** Sequence id (только linear/inverse). */
  seq?: number;
  /** Время сопоставления, ms (только linear/inverse). String-encoded integer. */
  cts?: number;
}

// ============================================================================
// /v5/market/tickers (linear / inverse)
// ============================================================================

export interface GetFuturesTickersParams {
  category: FuturesCategory;
  symbol?: string;
  baseCoin?: string;
  expDate?: string;
}

export interface FuturesTicker {
  symbol: string;
  lastPrice: string;
  indexPrice: string;
  markPrice: string;
  prevPrice24h: string;
  price24hPcnt: string;
  highPrice24h: string;
  lowPrice24h: string;
  prevPrice1h: string;
  openInterest: string;
  openInterestValue: string;
  turnover24h: string;
  volume24h: string;
  fundingRate: string;
  /** Время следующего funding, ms. String-encoded integer. */
  nextFundingTime: string;
  predictedDeliveryPrice?: string;
  basisRate?: string;
  deliveryFeeRate?: string;
  deliveryTime?: string;
  ask1Size: string;
  bid1Size: string;
  ask1Price: string;
  bid1Price: string;
  basis?: string;
  preOpenPrice?: string;
  preQty?: string;
  curPreListingPhase?: string;
}

export interface GetFuturesTickersResult {
  category: FuturesCategory;
  list: FuturesTicker[];
}

// ============================================================================
// /v5/market/funding/history
// ============================================================================

export interface GetFundingRateHistoryParams {
  category: FuturesCategory;
  symbol: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface FundingRateHistoryItem {
  symbol: string;
  fundingRate: string;
  /** Время выплаты, ms. String-encoded integer. */
  fundingRateTimestamp: string;
}

export interface GetFundingRateHistoryResult {
  category: FuturesCategory;
  list: FundingRateHistoryItem[];
}

// ============================================================================
// /v5/market/recent-trade (linear / inverse)
// ============================================================================

export interface GetFuturesRecentTradesParams {
  category: FuturesCategory;
  symbol: string;
  /** Лимит. linear/inverse: 1..1000. По умолчанию 500. */
  limit?: number;
  /** Только block trades. */
  optionType?: 'Call' | 'Put';
  /** baseCoin (только для option). */
  baseCoin?: string;
}

export interface FuturesPublicTrade {
  execId: string;
  symbol: string;
  price: string;
  size: string;
  side: OrderSide;
  /** Время сделки, ms. String-encoded integer. */
  time: string;
  isBlockTrade: boolean;
}

export interface GetFuturesRecentTradesResult {
  category: FuturesCategory;
  list: FuturesPublicTrade[];
}

// ============================================================================
// /v5/market/open-interest
// ============================================================================

export interface GetOpenInterestParams {
  category: FuturesCategory;
  symbol: string;
  intervalTime: IntervalTime;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}

export interface OpenInterestItem {
  /** Open interest, в контрактах (для inverse) или в базовой монете (для linear). */
  openInterest: string;
  /** Время точки, ms. String-encoded integer. */
  timestamp: string;
}

export interface GetOpenInterestResult {
  category: FuturesCategory;
  symbol: string;
  list: OpenInterestItem[];
  nextPageCursor?: string;
}

// ============================================================================
// /v5/market/risk-limit
// ============================================================================

export interface GetRiskLimitParams {
  category: FuturesCategory;
  symbol?: string;
  cursor?: string;
}

export interface RiskLimitItem {
  /** Идентификатор уровня риска. Bybit отдаёт integer. */
  id: number;
  symbol: string;
  riskLimitValue: string;
  maintenanceMargin: string;
  initialMargin: string;
  isLowestRisk: 0 | 1;
  maxLeverage: string;
  mmDeduction: string;
  section?: string[];
}

export interface GetRiskLimitResult {
  category: FuturesCategory;
  list: RiskLimitItem[];
  nextPageCursor?: string;
}

// ============================================================================
// /v5/market/delivery-price
// ============================================================================

export interface GetDeliveryPriceParams {
  category: FuturesCategory;
  symbol?: string;
  baseCoin?: string;
  limit?: number;
  cursor?: string;
}

export interface DeliveryPriceItem {
  symbol: string;
  deliveryPrice: string;
  /** Время поставки, ms. String-encoded integer. */
  deliveryTime: string;
}

export interface GetDeliveryPriceResult {
  category: FuturesCategory;
  list: DeliveryPriceItem[];
  nextPageCursor?: string;
}

// ============================================================================
// /v5/market/account-ratio (long/short ratio)
// ============================================================================

export interface GetLongShortRatioParams {
  category: FuturesCategory;
  symbol: string;
  /** Период агрегации. */
  period: '5min' | '15min' | '30min' | '1h' | '4h' | '4d';
  limit?: number;
}

export interface LongShortRatioItem {
  symbol: string;
  buyRatio: string;
  sellRatio: string;
  /** Время точки, ms. String-encoded integer. */
  timestamp: string;
}

export interface GetLongShortRatioResult {
  list: LongShortRatioItem[];
}
