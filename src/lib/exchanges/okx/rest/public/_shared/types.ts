import type { InstType, OkxOrderSide } from '../../../types/common.js';
import type { OkxOrderbookLevel } from '../../../types/market.js';

/**
 * Внутренние shared-типы для public-методов OKX. Не реэкспортируются
 * наружу — у каждого PublicXxxMarket класса свой набор re-export'ов
 * с конкретным `instType`-литералом.
 */

/**
 * Тикер `/api/v5/market/tickers` или `/ticker`.
 *
 * Поля одинаковые для SPOT / SWAP / FUTURES / OPTION; различается только
 * `instType`-литерал. Per-class types сужают `instType` до конкретного
 * значения, чтобы получить точную типизацию.
 */
export interface OkxTickerCommonFields<T extends InstType> {
  instType: T;
  instId: string;
  last: string;
  lastSz: string;
  askPx: string;
  askSz: string;
  bidPx: string;
  bidSz: string;
  open24h: string;
  high24h: string;
  low24h: string;
  /** Объём в quote-валюте за 24ч (для SPOT) или в quote/USD (для contracts). */
  volCcy24h: string;
  /** Объём в base-валюте за 24ч (для SPOT) или в контрактах. */
  vol24h: string;
  /** Время генерации тикера, ms. String-encoded integer. */
  ts: string;
  /** Цена открытия дня по UTC+0. */
  sodUtc0: string;
  /** Цена открытия дня по UTC+8 (Hong Kong). */
  sodUtc8: string;
}

/**
 * Ответ `/api/v5/market/books` — массив снимков (всегда длиной 1 для
 * этого эндпоинта, OKX возвращает их в `data: [{...}]`).
 */
export interface OkxOrderbookSnapshot {
  /** Asks: уровни от меньшей цены к большей. */
  asks: OkxOrderbookLevel[];
  /** Bids: уровни от большей цены к меньшей. */
  bids: OkxOrderbookLevel[];
  /** Время снимка, ms. String-encoded integer. */
  ts: string;
}

/**
 * Публичная сделка из `/api/v5/market/trades` или `/history-trades`.
 */
export interface OkxPublicTrade {
  instId: string;
  tradeId: string;
  /** Цена сделки. */
  px: string;
  /** Размер сделки в base-валюте (SPOT) или контрактах (SWAP/FUTURES). */
  sz: string;
  side: OkxOrderSide;
  /** Время сделки, ms. String-encoded integer. */
  ts: string;
}
