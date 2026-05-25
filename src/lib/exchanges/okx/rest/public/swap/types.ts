import type { CtType, InstrumentState } from '../../../types/common.js';
import type { Bar, OkxCandle, OkxPriceCandle } from '../../../types/market.js';
import type {
  OkxOrderbookSnapshot,
  OkxPublicTrade,
  OkxTickerCommonFields,
} from '../_shared/types.js';

// ============================================================================
// /api/v5/public/instruments?instType=SWAP
// ============================================================================

export interface GetSwapInstrumentsParams {
  /** Underlying, например `'BTC-USD'`. Альтернатива — `instFamily`. */
  uly?: string;
  /** Семейство, например `'BTC-USD'`. */
  instFamily?: string;
  instId?: string;
}

/** Один SWAP-контракт. */
export interface SwapInstrument {
  instType: 'SWAP';
  instId: string;
  uly: string;
  instFamily: string;
  baseCcy: string;
  quoteCcy: string;
  /** Settlement-валюта. */
  settleCcy: string;
  /** Стоимость одного контракта в `ctValCcy`. */
  ctVal: string;
  /** Множитель контракта. */
  ctMult: string;
  /** Валюта `ctVal`. */
  ctValCcy: string;
  /** linear / inverse. */
  ctType: CtType;
  /** Доступные leverage-уровни (через запятую). */
  lever: string;
  /** Шаг цены. */
  tickSz: string;
  /** Размер «лота». */
  lotSz: string;
  /** Минимальный размер ордера в контрактах. */
  minSz: string;
  state: InstrumentState;
  /** Время листинга (ms, string-encoded integer). */
  listTime: string;
  ruleType?: string;
  maxLmtSz?: string;
  maxMktSz?: string;
  maxTwapSz?: string;
  maxIcebergSz?: string;
  maxTriggerSz?: string;
  maxStopSz?: string;
}

export type GetSwapInstrumentsResult = SwapInstrument[];

// ============================================================================
// /api/v5/market/tickers?instType=SWAP
// ============================================================================

export interface GetSwapTickersParams {
  uly?: string;
  instFamily?: string;
}

export type SwapTicker = OkxTickerCommonFields<'SWAP'>;
export type GetSwapTickersResult = SwapTicker[];

// ============================================================================
// /api/v5/market/ticker?instId=...
// ============================================================================

export interface GetSwapTickerParams {
  instId: string;
}

export type GetSwapTickerResult = SwapTicker[];

// ============================================================================
// /api/v5/market/books?instId=...
// ============================================================================

export interface GetSwapOrderbookParams {
  instId: string;
  /** Глубина. SWAP/FUTURES: 1..400, по умолчанию 1. */
  sz?: number;
}

export type GetSwapOrderbookResult = OkxOrderbookSnapshot[];

// ============================================================================
// /api/v5/market/candles
// ============================================================================

export interface GetSwapKlineParams {
  instId: string;
  bar?: Bar;
  before?: number;
  after?: number;
  limit?: number;
}

export type GetSwapKlineResult = OkxCandle[];

// ============================================================================
// /api/v5/market/history-candles
// ============================================================================

export interface GetSwapHistoryKlineParams {
  instId: string;
  bar?: Bar;
  before?: number;
  after?: number;
  limit?: number;
}

export type GetSwapHistoryKlineResult = OkxCandle[];

// ============================================================================
// /api/v5/market/index-candles
// ============================================================================

export interface GetSwapIndexKlineParams {
  /** Index code, например `'BTC-USDT'`. */
  instId: string;
  bar?: Bar;
  before?: number;
  after?: number;
  limit?: number;
}

export type GetSwapIndexKlineResult = OkxPriceCandle[];

// ============================================================================
// /api/v5/market/mark-price-candles
// ============================================================================

export interface GetSwapMarkPriceKlineParams {
  instId: string;
  bar?: Bar;
  before?: number;
  after?: number;
  limit?: number;
}

export type GetSwapMarkPriceKlineResult = OkxPriceCandle[];

// ============================================================================
// /api/v5/market/trades
// ============================================================================

export interface GetSwapRecentTradesParams {
  instId: string;
  limit?: number;
}

export type SwapPublicTrade = OkxPublicTrade;
export type GetSwapRecentTradesResult = SwapPublicTrade[];

// ============================================================================
// /api/v5/market/history-trades
// ============================================================================

export interface GetSwapHistoryTradesParams {
  instId: string;
  type?: '1' | '2';
  before?: string;
  after?: string;
  limit?: number;
}

export type GetSwapHistoryTradesResult = SwapPublicTrade[];

// ============================================================================
// /api/v5/public/funding-rate?instId=...
// ============================================================================

export interface GetFundingRateParams {
  instId: string;
}

export interface FundingRateItem {
  instType: 'SWAP';
  instId: string;
  fundingRate: string;
  /** Прогноз следующей funding rate (может быть пустой строкой). */
  nextFundingRate: string;
  /** Время следующего расчёта funding, ms. String-encoded integer. */
  fundingTime: string;
  /** Время следующего следующего расчёта (для прогноза). */
  nextFundingTime: string;
  /** Метод расчёта: `'current_period'` / `'next_period'`. */
  method?: string;
}

export type GetFundingRateResult = FundingRateItem[];

// ============================================================================
// /api/v5/public/funding-rate-history?instId=...
// ============================================================================

export interface GetFundingRateHistoryParams {
  instId: string;
  before?: number;
  after?: number;
  /** 1..100, по умолчанию 100. */
  limit?: number;
}

export interface FundingRateHistoryItem {
  instType: 'SWAP';
  instId: string;
  fundingRate: string;
  realizedRate: string;
  /** Время выплаты funding, ms. String-encoded integer. */
  fundingTime: string;
}

export type GetFundingRateHistoryResult = FundingRateHistoryItem[];

// ============================================================================
// /api/v5/public/open-interest?instType=SWAP
// ============================================================================

export interface GetSwapOpenInterestParams {
  uly?: string;
  instFamily?: string;
  instId?: string;
}

export interface OpenInterestItem {
  instType: 'SWAP';
  instId: string;
  /** Open interest в контрактах. */
  oi: string;
  /** Open interest в quote-валюте. */
  oiCcy: string;
  /** Время измерения, ms. String-encoded integer. */
  ts: string;
}

export type GetSwapOpenInterestResult = OpenInterestItem[];

// ============================================================================
// /api/v5/public/mark-price?instType=SWAP
// ============================================================================

export interface GetSwapMarkPriceParams {
  uly?: string;
  instFamily?: string;
  instId?: string;
}

export interface MarkPriceItem {
  instType: 'SWAP';
  instId: string;
  markPx: string;
  /** Время расчёта, ms. String-encoded integer. */
  ts: string;
}

export type GetSwapMarkPriceResult = MarkPriceItem[];

// ============================================================================
// /api/v5/public/price-limit?instId=...
// ============================================================================

export interface GetSwapPriceLimitParams {
  instId: string;
}

export interface PriceLimitItem {
  instType: 'SWAP';
  instId: string;
  buyLmt: string;
  sellLmt: string;
  /** Время расчёта, ms. String-encoded integer. */
  ts: string;
  /** Включён ли механизм price limit. */
  enabled?: boolean;
}

export type GetSwapPriceLimitResult = PriceLimitItem[];

// ============================================================================
// /api/v5/public/insurance-fund?instType=SWAP
// ============================================================================

export interface GetSwapInsuranceFundParams {
  /** Тип записи. */
  type?: 'liquidation_balance_deposit' | 'bankruptcy_loss' | 'platform_revenue' | 'adl';
  uly?: string;
  instFamily?: string;
  ccy?: string;
  before?: number;
  after?: number;
  /** 1..100, по умолчанию 100. */
  limit?: number;
}

export interface InsuranceFundEntry {
  amt: string;
  balance: string;
  ccy: string;
  /** Тип события. */
  type: string;
  /** Время события, ms. String-encoded integer. */
  ts: string;
}

export interface InsuranceFundResult {
  total: string;
  instFamily: string;
  instType: 'SWAP';
  details: InsuranceFundEntry[];
}

export type GetSwapInsuranceFundResult = InsuranceFundResult[];
