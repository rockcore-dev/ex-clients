/**
 * Бросается, когда OKX возвращает `code !== '0'` в верхнем envelope.
 *
 * Envelope: `{ code, msg, data }`. Код — **строка** (`'0'` = успех),
 * это особенность OKX; в Bybit он числовой.
 *
 * @see https://www.okx.com/docs-v5/en/#error-code
 */
export class OkxApiError extends Error {
  override readonly name = 'OkxApiError';

  constructor(
    /** Глобальный `code` ответа OKX. */
    public readonly code: string,
    /** Глобальный `msg` ответа OKX. */
    public readonly msg: string,
    /** Сырое поле `data` (часто пустой массив или поэлементные ошибки). */
    public readonly data: unknown,
    /** HTTP-метод запроса. */
    public readonly httpMethod: string,
    /** Путь эндпоинта (например, `/api/v5/public/time`). */
    public readonly path: string,
  ) {
    super(`[OKX ${code}] ${msg} (${httpMethod} ${path})`);
  }
}

/**
 * Бросается на транспортных проблемах: сетевые сбои, не-2xx HTTP, не-JSON
 * тело, неверная форма envelope, отсутствующие credentials для signed-запроса.
 *
 * Отделено от `OkxApiError`, чтобы вызывающий мог решать: ретраить
 * (network) или показать пользователю (rejection).
 */
export class OkxNetworkError extends Error {
  override readonly name = 'OkxNetworkError';

  constructor(
    message: string,
    public readonly httpMethod: string,
    public readonly path: string,
    public override readonly cause?: unknown,
  ) {
    super(`[OKX network] ${message} (${httpMethod} ${path})`);
  }
}
