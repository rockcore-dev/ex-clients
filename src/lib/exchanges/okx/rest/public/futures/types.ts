import type { CtType, InstrumentState } from '../../../types/common.js';
import type { Bar, OkxCandle, OkxPriceCandle } from '../../../types/market.js';
import type {
  OkxOrderbookSnapshot,
  OkxPublicTrade,
  OkxTickerCommonFields,
} from '../_shared/types.js';

// ============================================================================
// /api/v5/public/instruments?instType=FUTURES
// ============================================================================

export interface GetFuturesInstrumentsParams {
  uly?: string;
  instFamily?: string;
  instId?: string;
}

export interface FuturesInstrument {
  instType: 'FUTURES';
  instId: string;
  uly: string;
  instFamily: string;
  baseCcy: string;
  quoteCcy: string;
  settleCcy: string;
  ctVal: string;
  ctMult: string;
  ctValCcy: string;
  ctType: CtType;
  /** Тип контракта по сроку: `'this_week' | 'next_week' | 'quarter' | 'next_quarter'` и т.п. */
  alias?: string;
  /** Время делистинга, ms. String-encoded integer. */
  expTime: string;
  /** Время листинга, ms. String-encoded integer. */
  listTime: string;
  lever: string;
  tickSz: string;
  lotSz: string;
  minSz: string;
  state: InstrumentState;
  ruleType?: string;
  maxLmtSz?: string;
  maxMktSz?: string;
  maxTwapSz?: string;
  maxIcebergSz?: string;
  maxTriggerSz?: string;
  maxStopSz?: string;
}

export type GetFuturesInstrumentsResult = FuturesInstrument[];

// ============================================================================
// /api/v5/market/tickers?instType=FUTURES
// ============================================================================

export interface GetFuturesTickersParams {
  uly?: string;
  instFamily?: string;
}

export type FuturesTicker = OkxTickerCommonFields<'FUTURES'>;
export type GetFuturesTickersResult = FuturesTicker[];

// ============================================================================
// /api/v5/market/ticker?instId=...
// ============================================================================

export interface GetFuturesTickerParams {
  instId: string;
}

export type GetFuturesTickerResult = FuturesTicker[];

// ============================================================================
// /api/v5/market/books?instId=...
// ============================================================================

export interface GetFuturesOrderbookParams {
  instId: string;
  /** Глубина. SWAP/FUTURES: 1..400, по умолчанию 1. */
  sz?: number;
}

export type GetFuturesOrderbookResult = OkxOrderbookSnapshot[];

// ============================================================================
// /api/v5/market/candles
// ============================================================================

export interface GetFuturesKlineParams {
  instId: string;
  bar?: Bar;
  before?: number;
  after?: number;
  limit?: number;
}

export type GetFuturesKlineResult = OkxCandle[];

// ============================================================================
// /api/v5/market/history-candles
// ============================================================================

export interface GetFuturesHistoryKlineParams {
  instId: string;
  bar?: Bar;
  before?: number;
  after?: number;
  limit?: number;
}

export type GetFuturesHistoryKlineResult = OkxCandle[];

// ============================================================================
// /api/v5/market/index-candles
// ============================================================================

export interface GetFuturesIndexKlineParams {
  /** Index code, например `'BTC-USD'`. */
  instId: string;
  bar?: Bar;
  before?: number;
  after?: number;
  limit?: number;
}

export type GetFuturesIndexKlineResult = OkxPriceCandle[];

// ============================================================================
// /api/v5/market/mark-price-candles
// ============================================================================

export interface GetFuturesMarkPriceKlineParams {
  instId: string;
  bar?: Bar;
  before?: number;
  after?: number;
  limit?: number;
}

export type GetFuturesMarkPriceKlineResult = OkxPriceCandle[];

// ============================================================================
// /api/v5/market/trades
// ============================================================================

export interface GetFuturesRecentTradesParams {
  instId: string;
  limit?: number;
}

export type FuturesPublicTrade = OkxPublicTrade;
export type GetFuturesRecentTradesResult = FuturesPublicTrade[];

// ============================================================================
// /api/v5/market/history-trades
// ============================================================================

export interface GetFuturesHistoryTradesParams {
  instId: string;
  type?: '1' | '2';
  before?: string;
  after?: string;
  limit?: number;
}

export type GetFuturesHistoryTradesResult = FuturesPublicTrade[];

// ============================================================================
// /api/v5/public/open-interest?instType=FUTURES
// ============================================================================

export interface GetFuturesOpenInterestParams {
  uly?: string;
  instFamily?: string;
  instId?: string;
}

export interface FuturesOpenInterestItem {
  instType: 'FUTURES';
  instId: string;
  oi: string;
  oiCcy: string;
  ts: string;
}

export type GetFuturesOpenInterestResult = FuturesOpenInterestItem[];

// ============================================================================
// /api/v5/public/mark-price?instType=FUTURES
// ============================================================================

export interface GetFuturesMarkPriceParams {
  uly?: string;
  instFamily?: string;
  instId?: string;
}

export interface FuturesMarkPriceItem {
  instType: 'FUTURES';
  instId: string;
  markPx: string;
  ts: string;
}

export type GetFuturesMarkPriceResult = FuturesMarkPriceItem[];

// ============================================================================
// /api/v5/public/price-limit?instId=...
// ============================================================================

export interface GetFuturesPriceLimitParams {
  instId: string;
}

export interface FuturesPriceLimitItem {
  instType: 'FUTURES';
  instId: string;
  buyLmt: string;
  sellLmt: string;
  ts: string;
  enabled?: boolean;
}

export type GetFuturesPriceLimitResult = FuturesPriceLimitItem[];

// ============================================================================
// /api/v5/public/insurance-fund?instType=FUTURES
// ============================================================================

export interface GetFuturesInsuranceFundParams {
  type?: 'liquidation_balance_deposit' | 'bankruptcy_loss' | 'platform_revenue' | 'adl';
  uly?: string;
  instFamily?: string;
  ccy?: string;
  before?: number;
  after?: number;
  limit?: number;
}

export interface FuturesInsuranceFundEntry {
  amt: string;
  balance: string;
  ccy: string;
  type: string;
  ts: string;
}

export interface FuturesInsuranceFundResult {
  total: string;
  instFamily: string;
  instType: 'FUTURES';
  details: FuturesInsuranceFundEntry[];
}

export type GetFuturesInsuranceFundResult = FuturesInsuranceFundResult[];

// ============================================================================
// /api/v5/public/estimated-price?instId=...
// ============================================================================

export interface GetEstimatedPriceParams {
  /** instId фьючерса/опциона (например, `'BTC-USD-220325'`). */
  instId: string;
}

export interface EstimatedPriceItem {
  instType: 'FUTURES' | 'OPTION';
  instId: string;
  /** Прогнозируемая цена поставки. */
  settlePx: string;
  /** Время прогноза, ms. String-encoded integer. */
  ts: string;
}

export type GetEstimatedPriceResult = EstimatedPriceItem[];

// ============================================================================
// /api/v5/public/delivery-exercise-history?instType=FUTURES
// ============================================================================

export interface GetDeliveryExerciseHistoryParams {
  /** Underlying, обязательно если не задан `instFamily`. */
  uly?: string;
  /** Инструмент-семейство, обязательно если не задан `uly`. */
  instFamily?: string;
  before?: number;
  after?: number;
  /** 1..100, по умолчанию 100. */
  limit?: number;
}

export interface DeliveryExerciseDetail {
  /** Тип события: `'delivery'` / `'exercised'` / `'expired_otm'`. */
  type: string;
  /** instId инструмента. */
  insId: string;
  /** Цена поставки/исполнения. */
  px: string;
}

export interface DeliveryExerciseRecord {
  /** Время поставки/исполнения, ms. String-encoded integer. */
  ts: string;
  details: DeliveryExerciseDetail[];
}

export type GetDeliveryExerciseHistoryResult = DeliveryExerciseRecord[];
