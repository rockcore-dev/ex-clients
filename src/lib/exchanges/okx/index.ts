import {
  OkxPrivateFuturesAccount,
  OkxPrivateFuturesPosition,
  OkxPrivateFuturesTrade,
} from './rest/private/futures/index.js';
import { OkxPrivateSpotAccount, OkxPrivateSpotTrade } from './rest/private/spot/index.js';
import {
  OkxPrivateSwapAccount,
  OkxPrivateSwapPosition,
  OkxPrivateSwapTrade,
} from './rest/private/swap/index.js';
import { OkxPublicCommon } from './rest/public/common/index.js';
import { OkxPublicFuturesMarket } from './rest/public/futures/index.js';
import { OkxPublicSpotMarket } from './rest/public/spot/index.js';
import { OkxPublicSwapMarket } from './rest/public/swap/index.js';

/**
 * OKX v5 facade — class-shaped namespace, агрегирует все статические
 * sub-клиенты в одно дерево:
 *
 *     Okx.public.common
 *     Okx.public.spot.market
 *     Okx.public.swap.market
 *     Okx.public.futures.market
 *     Okx.private.spot.trade
 *     Okx.private.spot.account
 *     Okx.private.swap.trade
 *     Okx.private.swap.position
 *     Okx.private.swap.account
 *     Okx.private.futures.trade
 *     Okx.private.futures.position
 *     Okx.private.futures.account
 *
 * Класс не имеет состояния и не может быть инстанциирован.
 * Для tree-shake-friendly импортов используйте прямые имена классов
 * из корня пакета (`OkxPublicCommon`, `OkxPublicSpotMarket`, ...).
 */
export class Okx {
  static readonly public = {
    common: OkxPublicCommon,
    spot: {
      market: OkxPublicSpotMarket,
    },
    swap: {
      market: OkxPublicSwapMarket,
    },
    futures: {
      market: OkxPublicFuturesMarket,
    },
  } as const;

  static readonly private = {
    spot: {
      trade: OkxPrivateSpotTrade,
      account: OkxPrivateSpotAccount,
    },
    swap: {
      trade: OkxPrivateSwapTrade,
      position: OkxPrivateSwapPosition,
      account: OkxPrivateSwapAccount,
    },
    futures: {
      trade: OkxPrivateFuturesTrade,
      position: OkxPrivateFuturesPosition,
      account: OkxPrivateFuturesAccount,
    },
  } as const;

  private constructor() {
    throw new Error('Okx is a namespace class and cannot be instantiated');
  }
}
