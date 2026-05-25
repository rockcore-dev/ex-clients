/**
 * Тип инструмента в OKX v5.
 *
 * @see https://www.okx.com/docs-v5/en/#overview-instrument-type
 */
export type InstType = 'SPOT' | 'MARGIN' | 'SWAP' | 'FUTURES' | 'OPTION';

/** Подтип `InstType`, описывающий торгуемые с плечом контракты. */
export type ContractInstType = Extract<InstType, 'SWAP' | 'FUTURES' | 'OPTION'>;

/** Сторона сделки / ордера. */
export type OkxOrderSide = 'buy' | 'sell';

/**
 * Тип контракта для FUTURES/SWAP/OPTION.
 *
 * - `linear` — USDT/USDC-маржинальные контракты.
 * - `inverse` — coin-маржинальные контракты.
 *
 * @see https://www.okx.com/docs-v5/en/#public-data-rest-api-get-instruments
 */
export type CtType = 'linear' | 'inverse';

/**
 * Состояние инструмента.
 *
 * @see https://www.okx.com/docs-v5/en/#public-data-rest-api-get-instruments
 */
export type InstrumentState = 'live' | 'suspend' | 'preopen' | 'test' | 'expired';
