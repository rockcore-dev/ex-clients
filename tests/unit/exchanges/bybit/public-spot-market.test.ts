import { describe, expect, it } from 'vitest';

import { BybitPublicSpotMarket } from '../../../../src/index.js';
import { expectNotConstructable, makeOkFetch } from './_helpers.js';

describe('BybitPublicSpotMarket.getKline', () => {
  it('forces category=spot and forwards required + optional params', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      category: 'spot',
      symbol: 'BTCUSDT',
      list: [
        ['1700000000000', '50000', '50500', '49500', '50100', '12.5', '628125'],
        ['1699996400000', '49000', '49600', '48800', '50000', '10.0', '492000'],
      ],
    });

    const result = await BybitPublicSpotMarket.getKline(
      { fetch: fetchImpl },
      {
        symbol: 'BTCUSDT',
        interval: '60',
        start: 1_699_996_400_000,
        end: 1_700_000_000_000,
        limit: 200,
      },
    );

    expect(captured.path).toBe('/v5/market/kline');
    expect(captured.method).toBe('GET');
    expect(captured.query).toEqual({
      category: 'spot',
      symbol: 'BTCUSDT',
      interval: '60',
      start: '1699996400000',
      end: '1700000000000',
      limit: '200',
    });
    expect(result.category).toBe('spot');
    expect(result.list).toHaveLength(2);
    expect(result.list[0]).toEqual([
      '1700000000000',
      '50000',
      '50500',
      '49500',
      '50100',
      '12.5',
      '628125',
    ]);
  });

  it('omits start/end/limit when not provided', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      category: 'spot',
      symbol: 'BTCUSDT',
      list: [],
    });

    await BybitPublicSpotMarket.getKline(
      { fetch: fetchImpl },
      { symbol: 'BTCUSDT', interval: 'D' },
    );

    expect(captured.query).toEqual({
      category: 'spot',
      symbol: 'BTCUSDT',
      interval: 'D',
    });
  });
});

describe('BybitPublicSpotMarket.getInstrumentsInfo', () => {
  it('GET /v5/market/instruments-info with category=spot only', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      category: 'spot',
      list: [
        {
          symbol: 'BTCUSDT',
          baseCoin: 'BTC',
          quoteCoin: 'USDT',
          innovation: '0',
          status: 'Trading',
          marginTrading: 'utaOnly',
          lotSizeFilter: {
            basePrecision: '0.000001',
            quotePrecision: '0.00000001',
            minOrderQty: '0.000048',
            maxOrderQty: '71.73956243',
            minOrderAmt: '1',
            maxOrderAmt: '4000000',
          },
          priceFilter: { tickSize: '0.01' },
        },
      ],
    });

    const result = await BybitPublicSpotMarket.getInstrumentsInfo({ fetch: fetchImpl });

    expect(captured.path).toBe('/v5/market/instruments-info');
    expect(captured.query).toEqual({ category: 'spot' });
    expect(result.list[0]?.symbol).toBe('BTCUSDT');
  });

  it('forwards filters and pagination', async () => {
    const { fetchImpl, captured } = makeOkFetch({ category: 'spot', list: [] });

    await BybitPublicSpotMarket.getInstrumentsInfo(
      { fetch: fetchImpl },
      { symbol: 'BTCUSDT', status: 'Trading', baseCoin: 'BTC', limit: 50, cursor: 'abc' },
    );

    expect(captured.query).toEqual({
      category: 'spot',
      symbol: 'BTCUSDT',
      status: 'Trading',
      baseCoin: 'BTC',
      limit: '50',
      cursor: 'abc',
    });
  });
});

describe('BybitPublicSpotMarket.getOrderbook', () => {
  it('returns the raw {s,b,a,ts,u} envelope from Bybit', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      s: 'BTCUSDT',
      b: [
        ['50000.00', '0.5'],
        ['49999.50', '1.0'],
      ],
      a: [['50000.50', '0.4']],
      ts: 1_700_000_000_000,
      u: 12345,
    });

    const result = await BybitPublicSpotMarket.getOrderbook(
      { fetch: fetchImpl },
      { symbol: 'BTCUSDT', limit: 50 },
    );

    expect(captured.path).toBe('/v5/market/orderbook');
    expect(captured.query).toEqual({ category: 'spot', symbol: 'BTCUSDT', limit: '50' });
    expect(result.s).toBe('BTCUSDT');
    expect(result.b[0]).toEqual(['50000.00', '0.5']);
    expect(result.u).toBe(12345);
  });

  it('omits limit when not provided', async () => {
    const { fetchImpl, captured } = makeOkFetch({ s: 'X', b: [], a: [], ts: 0, u: 0 });

    await BybitPublicSpotMarket.getOrderbook({ fetch: fetchImpl }, { symbol: 'BTCUSDT' });

    expect(captured.query).toEqual({ category: 'spot', symbol: 'BTCUSDT' });
  });
});

describe('BybitPublicSpotMarket.getTickers', () => {
  it('returns the spot ticker list', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      category: 'spot',
      list: [
        {
          symbol: 'BTCUSDT',
          bid1Price: '50000',
          bid1Size: '0.5',
          ask1Price: '50001',
          ask1Size: '0.6',
          lastPrice: '50000.5',
          prevPrice24h: '49000',
          price24hPcnt: '0.0204',
          highPrice24h: '50500',
          lowPrice24h: '48800',
          turnover24h: '1000000',
          volume24h: '20',
        },
      ],
    });

    const result = await BybitPublicSpotMarket.getTickers({ fetch: fetchImpl });

    expect(captured.path).toBe('/v5/market/tickers');
    expect(captured.query).toEqual({ category: 'spot' });
    expect(result.list[0]?.symbol).toBe('BTCUSDT');
    expect(result.list[0]?.lastPrice).toBe('50000.5');
  });

  it('forwards symbol filter', async () => {
    const { fetchImpl, captured } = makeOkFetch({ category: 'spot', list: [] });

    await BybitPublicSpotMarket.getTickers({ fetch: fetchImpl }, { symbol: 'ETHUSDT' });

    expect(captured.query).toEqual({ category: 'spot', symbol: 'ETHUSDT' });
  });
});

describe('BybitPublicSpotMarket.getRecentTrades', () => {
  it('GET /v5/market/recent-trade?category=spot', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      category: 'spot',
      list: [
        {
          execId: 'abc',
          symbol: 'BTCUSDT',
          price: '50000',
          size: '0.01',
          side: 'Buy',
          time: '1700000000000',
          isBlockTrade: false,
        },
      ],
    });

    const result = await BybitPublicSpotMarket.getRecentTrades(
      { fetch: fetchImpl },
      { symbol: 'BTCUSDT', limit: 10 },
    );

    expect(captured.path).toBe('/v5/market/recent-trade');
    expect(captured.query).toEqual({ category: 'spot', symbol: 'BTCUSDT', limit: '10' });
    expect(result.list[0]?.side).toBe('Buy');
  });

  it('omits limit when not provided', async () => {
    const { fetchImpl, captured } = makeOkFetch({ category: 'spot', list: [] });

    await BybitPublicSpotMarket.getRecentTrades({ fetch: fetchImpl }, { symbol: 'BTCUSDT' });

    expect(captured.query).toEqual({ category: 'spot', symbol: 'BTCUSDT' });
  });
});

describe('BybitPublicSpotMarket — class invariants', () => {
  it('cannot be instantiated with new', () => {
    expectNotConstructable(BybitPublicSpotMarket, /static class/);
  });
});
