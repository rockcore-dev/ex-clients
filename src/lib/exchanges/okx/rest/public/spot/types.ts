import type { InstrumentState } from '../../../types/common.js';
import type { Bar, OkxCandle } from '../../../types/market.js';
import type {
  OkxOrderbookSnapshot,
  OkxPublicTrade,
  OkxTickerCommonFields,
} from '../_shared/types.js';

// ============================================================================
// /api/v5/public/instruments?instType=SPOT
// ============================================================================

export interface GetSpotInstrumentsParams {
  /** Конкретный символ, например `'BTC-USDT'`. */
  instId?: string;
}

/**
 * Один SPOT-инструмент. Часть полей фьючерсного контракта
 * (`ctVal`, `ctMult`, `expTime` и т.п.) отсутствуют либо приходят пустой
 * строкой — оставлены как опциональные на случай эволюции схемы.
 */
export interface SpotInstrument {
  instType: 'SPOT';
  instId: string;
  baseCcy: string;
  quoteCcy: string;
  /** Размер «лота» (минимальное приращение количества). */
  lotSz: string;
  /** Минимальный размер ордера в base-валюте. */
  minSz: string;
  /** Шаг цены. */
  tickSz: string;
  state: InstrumentState;
  ruleType?: string;
  /** Максимальный размер лимит-ордера. */
  maxLmtSz?: string;
  /** Максимальный размер market-ордера. */
  maxMktSz?: string;
  /** Максимальный размер twap-ордера. */
  maxTwapSz?: string;
  /** Максимальный размер iceberg-ордера. */
  maxIcebergSz?: string;
  /** Максимальный размер trigger-ордера. */
  maxTriggerSz?: string;
  /** Максимальный размер stop-market-ордера. */
  maxStopSz?: string;
}

export type GetSpotInstrumentsResult = SpotInstrument[];

// ============================================================================
// /api/v5/market/tickers?instType=SPOT
// ============================================================================

export interface GetSpotTickersParams {
  /** Не используется для SPOT — поле зарезервировано и игнорируется OKX. */
  uly?: string;
  instFamily?: string;
}

export type SpotTicker = OkxTickerCommonFields<'SPOT'>;
export type GetSpotTickersResult = SpotTicker[];

// ============================================================================
// /api/v5/market/ticker?instId=...
// ============================================================================

export interface GetSpotTickerParams {
  instId: string;
}

/** OKX возвращает массив (всегда длиной 1) для одиночного тикера. */
export type GetSpotTickerResult = SpotTicker[];

// ============================================================================
// /api/v5/market/books?instId=...
// ============================================================================

export interface GetSpotOrderbookParams {
  instId: string;
  /** Глубина стакана. SPOT: 1..400, по умолчанию 1. */
  sz?: number;
}

export type GetSpotOrderbookResult = OkxOrderbookSnapshot[];

// ============================================================================
// /api/v5/market/candles?instId=...
// ============================================================================

export interface GetSpotKlineParams {
  instId: string;
  /** Размер свечи. По умолчанию `'1m'`. */
  bar?: Bar;
  /** Pagination: возвращает свечи **до** этого ts (исключительно), ms. */
  before?: number;
  /** Pagination: возвращает свечи **после** этого ts (исключительно), ms. */
  after?: number;
  /** 1..300, по умолчанию 100. */
  limit?: number;
}

export type GetSpotKlineResult = OkxCandle[];

// ============================================================================
// /api/v5/market/history-candles?instId=...
// ============================================================================

export interface GetSpotHistoryKlineParams {
  instId: string;
  bar?: Bar;
  before?: number;
  after?: number;
  /** 1..100, по умолчанию 100. */
  limit?: number;
}

export type GetSpotHistoryKlineResult = OkxCandle[];

// ============================================================================
// /api/v5/market/trades?instId=...
// ============================================================================

export interface GetSpotRecentTradesParams {
  instId: string;
  /** 1..500, по умолчанию 100. */
  limit?: number;
}

export type SpotPublicTrade = OkxPublicTrade;
export type GetSpotRecentTradesResult = SpotPublicTrade[];

// ============================================================================
// /api/v5/market/history-trades?instId=...
// ============================================================================

export interface GetSpotHistoryTradesParams {
  instId: string;
  /** Тип pagination: `1` — tradeId, `2` — ts. По умолчанию `1`. */
  type?: '1' | '2';
  /** Pagination: до этой записи (исключительно). */
  before?: string;
  /** Pagination: после этой записи (исключительно). */
  after?: string;
  /** 1..100, по умолчанию 100. */
  limit?: number;
}

export type GetSpotHistoryTradesResult = SpotPublicTrade[];
