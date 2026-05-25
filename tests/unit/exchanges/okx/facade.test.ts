import { describe, expect, it } from 'vitest';

import {
  Okx,
  OkxPrivateFuturesAccount,
  OkxPrivateFuturesPosition,
  OkxPrivateFuturesTrade,
  OkxPrivateSpotAccount,
  OkxPrivateSpotTrade,
  OkxPrivateSwapAccount,
  OkxPrivateSwapPosition,
  OkxPrivateSwapTrade,
  OkxPublicCommon,
  OkxPublicFuturesMarket,
  OkxPublicSpotMarket,
  OkxPublicSwapMarket,
} from '../../../../src/index.js';
import { expectNotConstructable } from './_helpers.js';

describe('Okx facade', () => {
  it('exposes public sub-classes via static properties', () => {
    expect(Okx.public.common).toBe(OkxPublicCommon);
    expect(Okx.public.spot.market).toBe(OkxPublicSpotMarket);
    expect(Okx.public.swap.market).toBe(OkxPublicSwapMarket);
    expect(Okx.public.futures.market).toBe(OkxPublicFuturesMarket);
  });

  it('exposes private sub-classes via static properties', () => {
    expect(Okx.private.spot.trade).toBe(OkxPrivateSpotTrade);
    expect(Okx.private.spot.account).toBe(OkxPrivateSpotAccount);
    expect(Okx.private.swap.trade).toBe(OkxPrivateSwapTrade);
    expect(Okx.private.swap.position).toBe(OkxPrivateSwapPosition);
    expect(Okx.private.swap.account).toBe(OkxPrivateSwapAccount);
    expect(Okx.private.futures.trade).toBe(OkxPrivateFuturesTrade);
    expect(Okx.private.futures.position).toBe(OkxPrivateFuturesPosition);
    expect(Okx.private.futures.account).toBe(OkxPrivateFuturesAccount);
  });

  it('cannot be instantiated with new', () => {
    expectNotConstructable(Okx, /namespace class/);
  });

  it('private constructors on skeleton classes also throw', () => {
    const classes = [
      OkxPublicCommon,
      OkxPublicSpotMarket,
      OkxPublicSwapMarket,
      OkxPublicFuturesMarket,
      OkxPrivateSpotTrade,
      OkxPrivateSpotAccount,
      OkxPrivateSwapTrade,
      OkxPrivateSwapPosition,
      OkxPrivateSwapAccount,
      OkxPrivateFuturesTrade,
      OkxPrivateFuturesPosition,
      OkxPrivateFuturesAccount,
    ];
    for (const cls of classes) {
      expectNotConstructable(cls, /static class/);
    }
  });
});
