/**
 * Thrown when Bybit returns a non-zero `retCode` in the response envelope.
 *
 * The envelope shape is `{ retCode, retMsg, result, retExtInfo, time }`.
 * Any `retCode !== 0` indicates a domain error from Bybit's side.
 *
 * @see https://bybit-exchange.github.io/docs/v5/error
 */
export class BybitApiError extends Error {
  override readonly name = 'BybitApiError';

  constructor(
    /** Bybit `retCode`. See the error code table in Bybit docs. */
    public readonly retCode: number,
    /** Bybit `retMsg`. */
    public readonly retMsg: string,
    /** Raw `result` field from the envelope (often `{}` on errors). */
    public readonly result: unknown,
    /** HTTP method that was used. */
    public readonly httpMethod: string,
    /** Endpoint path (e.g. `/v5/market/time`). */
    public readonly path: string,
  ) {
    super(`[Bybit ${retCode}] ${retMsg} (${httpMethod} ${path})`);
  }
}

/**
 * Thrown for transport-layer problems: network errors, non-JSON responses,
 * non-2xx HTTP statuses, malformed envelopes.
 *
 * Distinguished from `BybitApiError` so that callers can decide whether
 * to retry (network) vs surface to the user (API rejection).
 */
export class BybitNetworkError extends Error {
  override readonly name = 'BybitNetworkError';

  constructor(
    message: string,
    public readonly httpMethod: string,
    public readonly path: string,
    public override readonly cause?: unknown,
  ) {
    super(`[Bybit network] ${message} (${httpMethod} ${path})`);
  }
}
