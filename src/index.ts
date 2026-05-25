export { Bybit } from './lib/exchanges/bybit/index.js';

export { BybitPublicCommon } from './lib/exchanges/bybit/rest/public/common/index.js';
export { BybitPublicSpotMarket } from './lib/exchanges/bybit/rest/public/spot/index.js';
export { BybitPublicFuturesMarket } from './lib/exchanges/bybit/rest/public/futures/index.js';

export {
  BybitPrivateSpotTrade,
  BybitPrivateSpotAccount,
} from './lib/exchanges/bybit/rest/private/spot/index.js';
export {
  BybitPrivateFuturesTrade,
  BybitPrivateFuturesPosition,
  BybitPrivateFuturesAccount,
} from './lib/exchanges/bybit/rest/private/futures/index.js';

export { BybitHttp } from './lib/exchanges/bybit/http/http.js';
export { BybitSigner } from './lib/exchanges/bybit/http/signer.js';
export { BybitApiError, BybitNetworkError } from './lib/exchanges/bybit/http/errors.js';

export type {
  BybitContext,
  BybitAuthenticatedContext,
  BybitCredentials,
  BybitEnv,
} from './lib/exchanges/bybit/context.js';
export type { Category, FuturesCategory } from './lib/exchanges/bybit/types/index.js';
export type {
  HttpMethod,
  RequestOptions,
  BybitEnvelope,
} from './lib/exchanges/bybit/http/types.js';
export type { GetServerTimeResult } from './lib/exchanges/bybit/rest/public/common/BybitPublicCommon.js';

export const VERSION = '0.1.0';
