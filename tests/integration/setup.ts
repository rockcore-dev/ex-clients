import { config as loadDotenv } from 'dotenv';

loadDotenv();

/**
 * Helpers shared across integration tests.
 *
 * Bybit testnet base URL is `https://api-testnet.bybit.com`. Private
 * tests should obtain credentials via `requireBybitTestnetCredentials()`
 * which returns `null` if the env vars are missing — callers then
 * use `describe.skipIf` / `it.skipIf` to gracefully skip.
 */

export interface BybitTestnetCredentials {
  apiKey: string;
  apiSecret: string;
}

export function readBybitTestnetCredentials(): BybitTestnetCredentials | null {
  const apiKey = process.env.BYBIT_TESTNET_API_KEY;
  const apiSecret = process.env.BYBIT_TESTNET_API_SECRET;
  if (apiKey === undefined || apiSecret === undefined || apiKey === '' || apiSecret === '') {
    return null;
  }
  return { apiKey, apiSecret };
}

export const BYBIT_TESTNET_ENV = 'testnet' as const;
