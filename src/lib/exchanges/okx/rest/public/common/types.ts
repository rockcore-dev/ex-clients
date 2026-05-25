/**
 * Один элемент ответа `GET /api/v5/public/time`. OKX возвращает массив
 * (всегда из 1 элемента) с одним полем `ts` — серверным временем в ms.
 *
 * @see https://www.okx.com/docs-v5/en/#public-data-rest-api-get-system-time
 */
export interface OkxSystemTimeItem {
  /** Серверное время в миллисекундах. String-encoded integer. */
  ts: string;
}

/** Result of `GET /api/v5/public/time`. */
export type GetSystemTimeResult = OkxSystemTimeItem[];
