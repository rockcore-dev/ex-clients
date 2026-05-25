import { describe, expect, it } from 'vitest';

import { BybitPublicCommon } from '../../../../src/index.js';
import { expectNotConstructable, makeOkFetch } from './_helpers.js';

describe('BybitPublicCommon.getServerTime', () => {
  it('parses envelope and returns timeSecond / timeNano', async () => {
    const { fetchImpl } = makeOkFetch({
      timeSecond: '1700000000',
      timeNano: '1700000000000000000',
    });

    const result = await BybitPublicCommon.getServerTime({ fetch: fetchImpl });

    expect(result).toEqual({
      timeSecond: '1700000000',
      timeNano: '1700000000000000000',
    });
  });

  it('calls GET /v5/market/time on mainnet by default', async () => {
    const { fetchImpl, captured } = makeOkFetch({ timeSecond: '0', timeNano: '0' });

    await BybitPublicCommon.getServerTime({ fetch: fetchImpl });

    expect(captured.url).toBe('https://api.bybit.com/v5/market/time');
    expect(captured.method).toBe('GET');
    expect(captured.path).toBe('/v5/market/time');
    expect(captured.query).toEqual({});
  });

  it('targets testnet when env=testnet', async () => {
    const { fetchImpl, captured } = makeOkFetch({ timeSecond: '0', timeNano: '0' });

    await BybitPublicCommon.getServerTime({ env: 'testnet', fetch: fetchImpl });

    expect(captured.url).toBe('https://api-testnet.bybit.com/v5/market/time');
  });
});

describe('BybitPublicCommon.getInsurance', () => {
  it('GET /v5/market/insurance with no filter', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      updatedTime: '1700000000000',
      list: [
        { coin: 'BTC', balance: '600.5', value: '36000000' },
        { coin: 'ETH', balance: '12000', value: '36000000' },
      ],
    });

    const result = await BybitPublicCommon.getInsurance({ fetch: fetchImpl });

    expect(captured.path).toBe('/v5/market/insurance');
    expect(captured.method).toBe('GET');
    expect(captured.query).toEqual({});
    expect(result.list).toHaveLength(2);
    expect(result.list[0]).toEqual({ coin: 'BTC', balance: '600.5', value: '36000000' });
    expect(result.updatedTime).toBe('1700000000000');
  });

  it('appends coin filter when provided', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      updatedTime: '1700000000000',
      list: [{ coin: 'BTC', balance: '1', value: '60000' }],
    });

    await BybitPublicCommon.getInsurance({ fetch: fetchImpl }, { coin: 'BTC' });

    expect(captured.query).toEqual({ coin: 'BTC' });
  });

  it('omits coin from query when undefined', async () => {
    const { fetchImpl, captured } = makeOkFetch({ updatedTime: '0', list: [] });

    await BybitPublicCommon.getInsurance({ fetch: fetchImpl }, {});

    expect(captured.query).toEqual({});
  });
});

describe('BybitPublicCommon — class invariants', () => {
  it('cannot be instantiated with new', () => {
    expectNotConstructable(BybitPublicCommon, /static class/);
  });
});
