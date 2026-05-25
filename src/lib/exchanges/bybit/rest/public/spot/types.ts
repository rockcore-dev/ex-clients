import type { Kline, KlineInterval, OrderbookLevel, OrderSide } from '../../../types/market.js';

// ============================================================================
// /v5/market/kline (spot)
// ============================================================================

/** Параметры для `GET /v5/market/kline?category=spot`. */
export interface GetSpotKlineParams {
  /** Тикер инструмента, например `'BTCUSDT'`. Обязательно. */
  symbol: string;
  /** Интервал свечей. */
  interval: KlineInterval;
  /** Начало диапазона, ms. Включительно. */
  start?: number;
  /** Конец диапазона, ms. Включительно. */
  end?: number;
  /** Лимит. Bybit разрешает 1..1000, по умолчанию 200. */
  limit?: number;
}

/** Результат `GET /v5/market/kline?category=spot`. */
export interface GetSpotKlineResult {
  category: 'spot';
  symbol: string;
  /** Список свечей в порядке от новых к старым. */
  list: Kline[];
}

// ============================================================================
// /v5/market/instruments-info (spot)
// ============================================================================

/** Параметры для `GET /v5/market/instruments-info?category=spot`. */
export interface GetSpotInstrumentsInfoParams {
  /** Конкретный символ (например, `'BTCUSDT'`). По умолчанию — все. */
  symbol?: string;
  /** Тип статуса. */
  status?: 'Trading' | 'Closed';
  /** Базовая монета (например, `'BTC'`). */
  baseCoin?: string;
  /** Лимит, 1..1000. По умолчанию 500. */
  limit?: number;
  /** Курсор для постраничного запроса. */
  cursor?: string;
}

/** Один инструмент spot из `instruments-info`. */
export interface SpotInstrument {
  symbol: string;
  baseCoin: string;
  quoteCoin: string;
  /** `'0' | '1'` — флаг innovation token. */
  innovation: string;
  status: string;
  /** `'0' | '1' | 'none' | 'both' | 'utaOnly' | 'normalSpotOnly'`, см. документацию. */
  marginTrading: string;
  /** Может присутствовать только для STOP-tradable. */
  stTag?: string;
  lotSizeFilter: {
    basePrecision: string;
    quotePrecision: string;
    minOrderQty: string;
    maxOrderQty: string;
    minOrderAmt: string;
    maxOrderAmt: string;
  };
  priceFilter: {
    tickSize: string;
  };
  riskParameters?: {
    priceLimitRatioX: string;
    priceLimitRatioY: string;
  };
}

/** Результат `GET /v5/market/instruments-info?category=spot`. */
export interface GetSpotInstrumentsInfoResult {
  category: 'spot';
  list: SpotInstrument[];
}

// ============================================================================
// /v5/market/orderbook (spot)
// ============================================================================

/** Параметры для `GET /v5/market/orderbook?category=spot`. */
export interface GetSpotOrderbookParams {
  symbol: string;
  /** Глубина стакана. Bybit поддерживает spot: 1..200. По умолчанию 1. */
  limit?: number;
}

/** Результат `GET /v5/market/orderbook?category=spot`. */
export interface GetSpotOrderbookResult {
  /** Symbol. */
  s: string;
  /** Bids (price/size, по убыванию цены). */
  b: OrderbookLevel[];
  /** Asks (price/size, по возрастанию цены). */
  a: OrderbookLevel[];
  /** Timestamp генерации, ms. */
  ts: number;
  /** Update id (растущий integer). */
  u: number;
}

// ============================================================================
// /v5/market/tickers (spot)
// ============================================================================

/** Параметры для `GET /v5/market/tickers?category=spot`. */
export interface GetSpotTickersParams {
  symbol?: string;
}

/** Один тикер spot. */
export interface SpotTicker {
  symbol: string;
  bid1Price: string;
  bid1Size: string;
  ask1Price: string;
  ask1Size: string;
  lastPrice: string;
  prevPrice24h: string;
  /** Доля изменения за 24ч (например, `'0.0125'` = +1.25%). */
  price24hPcnt: string;
  highPrice24h: string;
  lowPrice24h: string;
  turnover24h: string;
  volume24h: string;
  usdIndexPrice?: string;
}

/** Результат `GET /v5/market/tickers?category=spot`. */
export interface GetSpotTickersResult {
  category: 'spot';
  list: SpotTicker[];
}

// ============================================================================
// /v5/market/recent-trade (spot)
// ============================================================================

/** Параметры для `GET /v5/market/recent-trade?category=spot`. */
export interface GetSpotRecentTradesParams {
  symbol: string;
  /** Лимит. spot: 1..60. По умолчанию 60. */
  limit?: number;
}

/** Одна публичная сделка. */
export interface SpotPublicTrade {
  /** Идентификатор исполнения у Bybit. */
  execId: string;
  symbol: string;
  price: string;
  size: string;
  side: OrderSide;
  /** Время сделки, ms. String-encoded integer. */
  time: string;
  /** Block-trade флаг (для spot почти всегда `false`). */
  isBlockTrade: boolean;
}

/** Результат `GET /v5/market/recent-trade?category=spot`. */
export interface GetSpotRecentTradesResult {
  category: 'spot';
  list: SpotPublicTrade[];
}
