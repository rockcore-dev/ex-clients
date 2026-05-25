export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

/**
 * Standard Bybit v5 response envelope.
 *
 * @see https://bybit-exchange.github.io/docs/v5/intro#api-rate-limit
 */
export interface BybitEnvelope<T> {
  retCode: number;
  retMsg: string;
  result: T;
  retExtInfo?: unknown;
  time?: number;
}

export interface RequestOptions {
  method: HttpMethod;
  /** Endpoint path beginning with a slash, e.g. `/v5/market/time`. */
  path: string;
  /** Query string parameters (for GET / DELETE). String-typed only. */
  query?: Record<string, string | number | boolean | undefined>;
  /** JSON body (for POST / PUT). */
  body?: Record<string, unknown>;
  /** When `true`, the request is signed with HMAC-SHA256. Context must include credentials. */
  auth?: boolean;
}
