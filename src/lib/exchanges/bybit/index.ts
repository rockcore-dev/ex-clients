import {
  BybitPrivateFuturesAccount,
  BybitPrivateFuturesPosition,
  BybitPrivateFuturesTrade,
} from './rest/private/futures/index.js';
import { BybitPrivateSpotAccount, BybitPrivateSpotTrade } from './rest/private/spot/index.js';
import { BybitPublicCommon } from './rest/public/common/index.js';
import { BybitPublicFuturesMarket } from './rest/public/futures/index.js';
import { BybitPublicSpotMarket } from './rest/public/spot/index.js';

/**
 * Bybit v5 facade — a class-shaped namespace that aggregates every static
 * sub-client into a single tree:
 *
 *     Bybit.public.common
 *     Bybit.public.spot.market
 *     Bybit.public.futures.market
 *     Bybit.private.spot.trade
 *     Bybit.private.spot.account
 *     Bybit.private.futures.trade
 *     Bybit.private.futures.position
 *     Bybit.private.futures.account
 *
 * This class has **no** instance state and **cannot** be instantiated.
 * For tree-shake-friendly imports, prefer the individual sub-classes
 * exported from the package root (e.g. `BybitPublicCommon`).
 */
export class Bybit {
  static readonly public = {
    common: BybitPublicCommon,
    spot: {
      market: BybitPublicSpotMarket,
    },
    futures: {
      market: BybitPublicFuturesMarket,
    },
  } as const;

  static readonly private = {
    spot: {
      trade: BybitPrivateSpotTrade,
      account: BybitPrivateSpotAccount,
    },
    futures: {
      trade: BybitPrivateFuturesTrade,
      position: BybitPrivateFuturesPosition,
      account: BybitPrivateFuturesAccount,
    },
  } as const;

  private constructor() {
    throw new Error('Bybit is a namespace class and cannot be instantiated');
  }
}
