/**
 * Размер свечи (`bar`) в OKX v5.
 *
 * Часовые/дневные/недельные/месячные интервалы поддерживают суффикс `utc`
 * (UTC+0 cutoff) — `1Hutc`, `1Dutc`, и т.д. Без суффикса — Hong Kong time
 * (UTC+8) cutoff.
 *
 * @see https://www.okx.com/docs-v5/en/#public-data-rest-api-get-mark-price-candlesticks
 */
export type Bar =
  | '1s'
  | '1m'
  | '3m'
  | '5m'
  | '15m'
  | '30m'
  | '1H'
  | '2H'
  | '4H'
  | '6H'
  | '8H'
  | '12H'
  | '1D'
  | '2D'
  | '3D'
  | '1W'
  | '1M'
  | '3M'
  | '6Hutc'
  | '12Hutc'
  | '1Dutc'
  | '2Dutc'
  | '3Dutc'
  | '1Wutc'
  | '1Mutc'
  | '3Mutc';

/**
 * Стандартная свеча из `/api/v5/market/candles` и `/history-candles`.
 *
 * Bybit отдаёт массив фиксированного порядка из 9 строк:
 *   `[ts, o, h, l, c, vol, volCcy, volCcyQuote, confirm]`.
 *
 * - `ts` — открытие свечи, ms.
 * - `vol` — объём в контрактах (для FUTURES/SWAP/OPTION) или в base-валюте (для SPOT).
 * - `volCcy` — объём в quote-валюте (для SPOT) или в base-валюте (для FUTURES).
 * - `volCcyQuote` — объём в quote-валюте.
 * - `confirm` — `'1'` если свеча закрыта, `'0'` если ещё нет.
 *
 * Все значения — строки (числовая точность сохраняется).
 *
 * @see https://www.okx.com/docs-v5/en/#public-data-rest-api-get-candlesticks
 */
export type OkxCandle = readonly [
  ts: string,
  o: string,
  h: string,
  l: string,
  c: string,
  vol: string,
  volCcy: string,
  volCcyQuote: string,
  confirm: string,
];

/**
 * Свеча индекса / mark-price из `/api/v5/market/{index,mark-price}-candles`.
 *
 * 6 полей: `[ts, o, h, l, c, confirm]` — без объёмов.
 *
 * @see https://www.okx.com/docs-v5/en/#public-data-rest-api-get-index-candlesticks
 */
export type OkxPriceCandle = readonly [
  ts: string,
  o: string,
  h: string,
  l: string,
  c: string,
  confirm: string,
];

/**
 * Уровень стакана `[price, size, liquidatedOrders, numOrders]`.
 *
 * Все значения — строки. `liquidatedOrders` обычно `'0'` для всех уровней.
 *
 * @see https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-order-book
 */
export type OkxOrderbookLevel = readonly [
  price: string,
  size: string,
  liquidatedOrders: string,
  numOrders: string,
];
