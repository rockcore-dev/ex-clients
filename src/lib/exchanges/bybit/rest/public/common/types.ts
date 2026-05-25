/**
 * Result of `GET /v5/market/time`.
 *
 * @see https://bybit-exchange.github.io/docs/v5/market/time
 */
export interface GetServerTimeResult {
  /** Bybit server time, в секундах. String-encoded integer (как в API). */
  timeSecond: string;
  /** Bybit server time, в наносекундах. String-encoded integer (как в API). */
  timeNano: string;
}

/**
 * Параметры для `GET /v5/market/insurance`.
 *
 * @see https://bybit-exchange.github.io/docs/v5/market/insurance
 */
export interface GetInsuranceParams {
  /** Фильтр по конкретной монете (например, `'BTC'`). По умолчанию — все монеты. */
  coin?: string;
}

/**
 * Запись страхового пула Bybit для одной монеты.
 */
export interface InsurancePoolItem {
  /** Тикер монеты (например, `'BTC'`). */
  coin: string;
  /** Баланс пула в этой монете. String-encoded number. */
  balance: string;
  /** Стоимость пула в USD. String-encoded number. */
  value: string;
}

/**
 * Result of `GET /v5/market/insurance`.
 */
export interface GetInsuranceResult {
  /** Время последнего обновления, в миллисекундах. String-encoded integer. */
  updatedTime: string;
  /** Список монет в страховом пуле. */
  list: InsurancePoolItem[];
}
