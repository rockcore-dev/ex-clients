export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

/**
 * Стандартный envelope OKX v5.
 *
 * Особенность: `code` — строка (`'0'` = успех). `data` всегда массив
 * (даже когда логически возвращается один объект).
 *
 * @see https://www.okx.com/docs-v5/en/#overview-rest-api-response-format
 */
export interface OkxEnvelope<T> {
  code: string;
  msg: string;
  data: T;
}

export interface RequestOptions {
  method: HttpMethod;
  /** Путь эндпоинта, начиная со слеша, например `/api/v5/public/time`. */
  path: string;
  /** Query-параметры (для GET / DELETE). Только примитивы. */
  query?: Record<string, string | number | boolean | undefined>;
  /** JSON body (для POST / PUT). */
  body?: Record<string, unknown> | unknown[];
  /** Если `true`, запрос подписывается. Контекст должен содержать credentials. */
  auth?: boolean;
}
