/**
 * Окружение OKX.
 *
 * - `'live'` — основной торговый домен `https://www.okx.com`.
 * - `'demo'` — тот же домен, но к каждому запросу добавляется
 *   заголовок `x-simulated-trading: 1`. У OKX нет отдельного
 *   testnet-URL — демо-торговля включается именно так.
 *
 * @see https://www.okx.com/docs-v5/en/#overview-demo-trading-services
 */
export type OkxEnv = 'live' | 'demo';

/**
 * Учётные данные API-ключа OKX.
 *
 * В отличие от Bybit, у OKX три обязательных поля для подписи:
 * `apiKey`, `apiSecret`, `passphrase` (passphrase задаётся при
 * создании API-ключа на сайте биржи).
 */
export interface OkxCredentials {
  apiKey: string;
  apiSecret: string;
  passphrase: string;
}

/**
 * Per-call контекст для любого OKX REST-метода.
 *
 * Библиотека stateless: контекст передаётся первым аргументом.
 */
export interface OkxContext {
  /** Окружение. По умолчанию `'live'`. Демо включает `x-simulated-trading: 1`. */
  env?: OkxEnv;
  /** Прямое переопределение базового URL (например, `https://aws.okx.com` или прокси). */
  baseUrl?: string;
  /** Креды для приватных эндпоинтов; не нужны для публичных. */
  credentials?: OkxCredentials;
  /** Подмена `fetch` для тестов и кастомных рантаймов. По умолчанию `globalThis.fetch`. */
  fetch?: typeof fetch;
}

/**
 * Контекст с гарантированными credentials. Приватные эндпоинты должны
 * принимать этот тип, чтобы забыть ключи стало ошибкой компиляции.
 */
export type OkxAuthenticatedContext = OkxContext & {
  credentials: OkxCredentials;
};

const LIVE_BASE_URL = 'https://www.okx.com';

/**
 * Резолвит эффективный baseUrl: `ctx.baseUrl` имеет приоритет, иначе
 * возвращается `https://www.okx.com` (демо-режим использует тот же
 * домен, отличается только заголовком).
 */
export function resolveBaseUrl(ctx: OkxContext): string {
  if (ctx.baseUrl !== undefined) return ctx.baseUrl;
  return LIVE_BASE_URL;
}

export function resolveEnv(ctx: OkxContext): OkxEnv {
  return ctx.env ?? 'live';
}

export function resolveFetch(ctx: OkxContext): typeof fetch {
  return ctx.fetch ?? globalThis.fetch;
}
