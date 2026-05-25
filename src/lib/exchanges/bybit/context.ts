/**
 * Environment selector for Bybit base URL.
 *
 * - `mainnet` -> `https://api.bybit.com`
 * - `testnet` -> `https://api-testnet.bybit.com`
 */
export type BybitEnv = 'mainnet' | 'testnet';

export interface BybitCredentials {
  apiKey: string;
  apiSecret: string;
}

/**
 * Per-call context for any Bybit REST static method.
 *
 * Why per-call: this library is intentionally stateless. There are no
 * client instances and no module-level config, so multiple accounts /
 * environments can coexist in the same process without interference.
 */
export interface BybitContext {
  /** Environment preset; ignored if `baseUrl` is supplied. Default: `mainnet`. */
  env?: BybitEnv;
  /** Explicit base URL override (e.g. for a private proxy). Takes precedence over `env`. */
  baseUrl?: string;
  /** Required for private endpoints; absent for public ones. */
  credentials?: BybitCredentials;
  /**
   * recv_window in milliseconds for signed requests. Default: 5000.
   * Bybit rejects signed requests if `now() - timestamp > recvWindow`.
   */
  recvWindow?: number;
  /** Inject a custom fetch implementation (used by tests). Default: `globalThis.fetch`. */
  fetch?: typeof fetch;
}

/**
 * Context guaranteed to carry credentials at the type level.
 *
 * Private endpoints accept this type instead of `BybitContext` so that
 * forgetting credentials becomes a compile-time error.
 */
export type BybitAuthenticatedContext = BybitContext & {
  credentials: BybitCredentials;
};

const MAINNET_BASE_URL = 'https://api.bybit.com';
const TESTNET_BASE_URL = 'https://api-testnet.bybit.com';

export const BYBIT_DEFAULT_RECV_WINDOW = 5000;

/**
 * Resolve the effective base URL for a context.
 *
 * Precedence: `ctx.baseUrl` -> `ctx.env` preset -> mainnet.
 */
export function resolveBaseUrl(ctx: BybitContext): string {
  if (ctx.baseUrl !== undefined) return ctx.baseUrl;
  if (ctx.env === 'testnet') return TESTNET_BASE_URL;
  return MAINNET_BASE_URL;
}

export function resolveRecvWindow(ctx: BybitContext): number {
  return ctx.recvWindow ?? BYBIT_DEFAULT_RECV_WINDOW;
}

export function resolveFetch(ctx: BybitContext): typeof fetch {
  return ctx.fetch ?? globalThis.fetch;
}
