/**
 * Product category in Bybit v5 unified API.
 *
 * - `spot` — spot market.
 * - `linear` — USDT and USDC perpetuals / futures.
 * - `inverse` — coin-margined perpetuals / futures.
 * - `option` — options (out of scope for the current phase).
 *
 * @see https://bybit-exchange.github.io/docs/v5/intro#category
 */
export type Category = 'spot' | 'linear' | 'inverse' | 'option';

/** Subset of `Category` covering all kinds of futures (linear + inverse). */
export type FuturesCategory = Extract<Category, 'linear' | 'inverse'>;
