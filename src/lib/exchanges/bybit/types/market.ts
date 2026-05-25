/**
 * Market data types shared across categories.
 *
 * @see https://bybit-exchange.github.io/docs/v5/market/kline
 */

/**
 * Kline interval accepted by Bybit v5.
 *
 * - Минуты: `'1' | '3' | '5' | '15' | '30' | '60' | '120' | '240' | '360' | '720'`.
 * - День / неделя / месяц: `'D' | 'W' | 'M'`.
 *
 * Передаётся в API как-есть (string), без преобразований.
 */
export type KlineInterval =
  | '1'
  | '3'
  | '5'
  | '15'
  | '30'
  | '60'
  | '120'
  | '240'
  | '360'
  | '720'
  | 'D'
  | 'W'
  | 'M';

/**
 * Стандартный 7-полевой kline из `/v5/market/kline`.
 *
 * Bybit отдаёт массив фиксированного порядка:
 * `[startTime, openPrice, highPrice, lowPrice, closePrice, volume, turnover]`.
 * Все значения — строки (числовая точность сохраняется).
 */
export type Kline = readonly [
  startTime: string,
  openPrice: string,
  highPrice: string,
  lowPrice: string,
  closePrice: string,
  volume: string,
  turnover: string,
];

/**
 * 5-полевой kline из `/v5/market/{mark|index|premium-index}-price-kline`.
 *
 * Bybit отдаёт массив фиксированного порядка:
 * `[startTime, openPrice, highPrice, lowPrice, closePrice]` — без volume/turnover.
 */
export type PriceKline = readonly [
  startTime: string,
  openPrice: string,
  highPrice: string,
  lowPrice: string,
  closePrice: string,
];

/**
 * Уровень стакана: `[price, size]`.
 *
 * Оба значения — строки (числовая точность сохраняется).
 */
export type OrderbookLevel = readonly [price: string, size: string];

/**
 * Сторона сделки / ордера в Bybit v5.
 */
export type OrderSide = 'Buy' | 'Sell';

/**
 * Тип контракта для linear / inverse рынков.
 *
 * @see https://bybit-exchange.github.io/docs/v5/enum#contracttype
 */
export type ContractType =
  | 'LinearPerpetual'
  | 'InversePerpetual'
  | 'LinearFutures'
  | 'InverseFutures';

/**
 * Интервал агрегации open-interest или long/short ratio.
 *
 * @see https://bybit-exchange.github.io/docs/v5/market/open-interest
 */
export type IntervalTime = '5min' | '15min' | '30min' | '1h' | '4h' | '1d';
