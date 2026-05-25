import { type OkxContext, resolveBaseUrl, resolveEnv, resolveFetch } from '../context.js';

import { OkxApiError, OkxNetworkError } from './errors.js';
import { OkxSigner } from './signer.js';
import type { OkxEnvelope, RequestOptions } from './types.js';

/**
 * Транспортный слой для OKX v5 REST API. Static class — never instantiate.
 *
 * Отвечает за:
 * 1. Сборку URL и query-string.
 * 2. Подпись запроса при `opts.auth === true`.
 * 3. Установку заголовка `x-simulated-trading: 1` для `env='demo'`.
 * 4. Выполнение через `globalThis.fetch` (или `ctx.fetch`).
 * 5. Парсинг envelope `{ code, msg, data }`.
 * 6. Превращение `code !== '0'` в `OkxApiError`, транспортных проблем —
 *    в `OkxNetworkError`.
 *
 * Числовые поля от OKX (цены, qty, ts) **не парсятся** в `number` —
 * остаются строками для сохранения точности.
 */
export class OkxHttp {
  private constructor() {
    throw new Error('OkxHttp is a static class and cannot be instantiated');
  }

  static async request<T>(ctx: OkxContext, opts: RequestOptions): Promise<T> {
    const baseUrl = resolveBaseUrl(ctx);
    const fetchImpl = resolveFetch(ctx);
    const env = resolveEnv(ctx);

    const queryString = buildQueryString(opts.query);
    const requestPath = `${opts.path}${queryString ? `?${queryString}` : ''}`;
    const url = `${baseUrl}${requestPath}`;

    const headers: Record<string, string> = {
      Accept: 'application/json',
    };

    let bodyString = '';
    if (opts.body !== undefined) {
      bodyString = JSON.stringify(opts.body);
      headers['Content-Type'] = 'application/json';
    }

    if (env === 'demo') {
      headers['x-simulated-trading'] = '1';
    }

    if (opts.auth === true) {
      if (ctx.credentials === undefined) {
        throw new OkxNetworkError(
          'credentials are required for a signed request but were not provided',
          opts.method,
          opts.path,
        );
      }
      const timestamp = OkxSigner.formatTimestamp(Date.now());
      const signature = OkxSigner.sign(
        ctx.credentials,
        timestamp,
        opts.method,
        requestPath,
        bodyString,
      );
      headers['OK-ACCESS-KEY'] = ctx.credentials.apiKey;
      headers['OK-ACCESS-SIGN'] = signature;
      headers['OK-ACCESS-TIMESTAMP'] = timestamp;
      headers['OK-ACCESS-PASSPHRASE'] = ctx.credentials.passphrase;
    }

    const init: RequestInit = {
      method: opts.method,
      headers,
    };
    if (bodyString !== '') {
      init.body = bodyString;
    }

    let response: Response;
    try {
      response = await fetchImpl(url, init);
    } catch (cause) {
      throw new OkxNetworkError(
        `fetch failed: ${cause instanceof Error ? cause.message : String(cause)}`,
        opts.method,
        opts.path,
        cause,
      );
    }

    if (!response.ok) {
      throw new OkxNetworkError(
        `HTTP ${String(response.status)} ${response.statusText}`,
        opts.method,
        opts.path,
      );
    }

    let envelope: OkxEnvelope<T>;
    try {
      envelope = (await response.json()) as OkxEnvelope<T>;
    } catch (cause) {
      throw new OkxNetworkError('response body is not valid JSON', opts.method, opts.path, cause);
    }

    if (
      envelope === null ||
      typeof envelope !== 'object' ||
      typeof envelope.code !== 'string' ||
      typeof envelope.msg !== 'string'
    ) {
      throw new OkxNetworkError(
        'response does not match the OKX v5 envelope shape',
        opts.method,
        opts.path,
      );
    }

    if (envelope.code !== '0') {
      throw new OkxApiError(envelope.code, envelope.msg, envelope.data, opts.method, opts.path);
    }

    return envelope.data;
  }
}

/**
 * Стабильная сборка query string. Параметры с `undefined` отбрасываются.
 * Ключи сортируются — это требуется для воспроизводимости подписи (хотя
 * OKX, в отличие от Bybit, не требует строго сортированный порядок).
 */
function buildQueryString(
  query: Record<string, string | number | boolean | undefined> | undefined,
): string {
  if (query === undefined) return '';
  const params = new URLSearchParams();
  const entries = Object.entries(query)
    .filter((entry): entry is [string, string | number | boolean] => entry[1] !== undefined)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  for (const [key, value] of entries) {
    params.append(key, String(value));
  }
  return params.toString();
}
