import { describe, expect, it } from 'vitest';

import {
  Bybit,
  BybitPrivateFuturesAccount,
  BybitPrivateFuturesPosition,
  BybitPrivateFuturesTrade,
  BybitPrivateSpotAccount,
  BybitPrivateSpotTrade,
  BybitPublicCommon,
  BybitPublicFuturesMarket,
  BybitPublicSpotMarket,
} from '../../../../src/index.js';
import { expectNotConstructable } from './_helpers.js';

describe('Bybit facade', () => {
  it('exposes public sub-classes via static properties', () => {
    expect(Bybit.public.common).toBe(BybitPublicCommon);
    expect(Bybit.public.spot.market).toBe(BybitPublicSpotMarket);
    expect(Bybit.public.futures.market).toBe(BybitPublicFuturesMarket);
  });

  it('exposes private sub-classes via static properties', () => {
    expect(Bybit.private.spot.trade).toBe(BybitPrivateSpotTrade);
    expect(Bybit.private.spot.account).toBe(BybitPrivateSpotAccount);
    expect(Bybit.private.futures.trade).toBe(BybitPrivateFuturesTrade);
    expect(Bybit.private.futures.position).toBe(BybitPrivateFuturesPosition);
    expect(Bybit.private.futures.account).toBe(BybitPrivateFuturesAccount);
  });

  it('cannot be instantiated with new', () => {
    expectNotConstructable(Bybit, /namespace class/);
  });

  it('private constructors on skeleton classes also throw', () => {
    const classes = [
      BybitPublicSpotMarket,
      BybitPublicFuturesMarket,
      BybitPrivateSpotTrade,
      BybitPrivateSpotAccount,
      BybitPrivateFuturesTrade,
      BybitPrivateFuturesPosition,
      BybitPrivateFuturesAccount,
    ];
    for (const cls of classes) {
      expectNotConstructable(cls, /static class/);
    }
  });
});
