import { type BybitContext, resolveBaseUrl, resolveFetch, resolveRecvWindow } from '../context.js';

import { BybitApiError, BybitNetworkError } from './errors.js';
import { BybitSigner } from './signer.js';
import type { BybitEnvelope, RequestOptions } from './types.js';

/**
 * Transport layer for Bybit v5 REST API. Static class — never instantiate.
 *
 * Responsibilities:
 * 1. Build the URL from `ctx` + `opts`.
 * 2. Sign the request if `opts.auth === true`.
 * 3. Execute via `globalThis.fetch` (or `ctx.fetch`).
 * 4. Parse the standard `{ retCode, retMsg, result }` envelope.
 * 5. Convert non-zero `retCode` into `BybitApiError`, transport problems
 *    into `BybitNetworkError`.
 *
 * Numbers from Bybit (prices, qty, etc.) are kept as strings — they are
 * passed through untouched. The library never parses them into JS numbers.
 */
export class BybitHttp {
  private constructor() {
    throw new Error('BybitHttp is a static class and cannot be instantiated');
  }

  static async request<T>(ctx: BybitContext, opts: RequestOptions): Promise<T> {
    const baseUrl = resolveBaseUrl(ctx);
    const fetchImpl = resolveFetch(ctx);
    const recvWindow = resolveRecvWindow(ctx);

    const queryString = buildQueryString(opts.query);
    const url = `${baseUrl}${opts.path}${queryString ? `?${queryString}` : ''}`;

    const headers: Record<string, string> = {
      Accept: 'application/json',
    };

    let bodyString: string | undefined;
    if (opts.body !== undefined) {
      bodyString = JSON.stringify(opts.body);
      headers['Content-Type'] = 'application/json';
    }

    if (opts.auth === true) {
      if (ctx.credentials === undefined) {
        throw new BybitNetworkError(
          'credentials are required for a signed request but were not provided',
          opts.method,
          opts.path,
        );
      }
      const timestamp = Date.now();
      const payload =
        opts.method === 'GET' || opts.method === 'DELETE' ? queryString : (bodyString ?? '');
      const signature = BybitSigner.sign(ctx.credentials, recvWindow, timestamp, payload);
      headers['X-BAPI-API-KEY'] = ctx.credentials.apiKey;
      headers['X-BAPI-SIGN'] = signature;
      headers['X-BAPI-SIGN-TYPE'] = '2';
      headers['X-BAPI-TIMESTAMP'] = String(timestamp);
      headers['X-BAPI-RECV-WINDOW'] = String(recvWindow);
    }

    const init: RequestInit = {
      method: opts.method,
      headers,
    };
    if (bodyString !== undefined) {
      init.body = bodyString;
    }

    let response: Response;
    try {
      response = await fetchImpl(url, init);
    } catch (cause) {
      throw new BybitNetworkError(
        `fetch failed: ${cause instanceof Error ? cause.message : String(cause)}`,
        opts.method,
        opts.path,
        cause,
      );
    }

    if (!response.ok) {
      throw new BybitNetworkError(
        `HTTP ${String(response.status)} ${response.statusText}`,
        opts.method,
        opts.path,
      );
    }

    let envelope: BybitEnvelope<T>;
    try {
      envelope = (await response.json()) as BybitEnvelope<T>;
    } catch (cause) {
      throw new BybitNetworkError('response body is not valid JSON', opts.method, opts.path, cause);
    }

    if (
      envelope === null ||
      typeof envelope !== 'object' ||
      typeof envelope.retCode !== 'number' ||
      typeof envelope.retMsg !== 'string'
    ) {
      throw new BybitNetworkError(
        'response does not match the Bybit v5 envelope shape',
        opts.method,
        opts.path,
      );
    }

    if (envelope.retCode !== 0) {
      throw new BybitApiError(
        envelope.retCode,
        envelope.retMsg,
        envelope.result,
        opts.method,
        opts.path,
      );
    }

    return envelope.result;
  }
}

function buildQueryString(
  query: Record<string, string | number | boolean | undefined> | undefined,
): string {
  if (query === undefined) return '';
  const params = new URLSearchParams();
  // Bybit's signing requires a stable ordering of query parameters.
  // URLSearchParams preserves insertion order; we sort keys to ensure
  // identical sign payloads regardless of caller-provided key order.
  const entries = Object.entries(query)
    .filter((entry): entry is [string, string | number | boolean] => entry[1] !== undefined)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  for (const [key, value] of entries) {
    params.append(key, String(value));
  }
  return params.toString();
}
