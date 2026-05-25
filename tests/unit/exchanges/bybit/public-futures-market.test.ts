import { describe, expect, it } from 'vitest';

import { BybitPublicFuturesMarket } from '../../../../src/index.js';
import { expectNotConstructable, makeOkFetch } from './_helpers.js';

describe('BybitPublicFuturesMarket.getKline', () => {
  it('forwards category=linear and full kline list', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      category: 'linear',
      symbol: 'BTCUSDT',
      list: [['1700000000000', '50000', '50500', '49500', '50100', '12.5', '628125']],
    });

    const result = await BybitPublicFuturesMarket.getKline(
      { fetch: fetchImpl },
      { category: 'linear', symbol: 'BTCUSDT', interval: '15', limit: 100 },
    );

    expect(captured.path).toBe('/v5/market/kline');
    expect(captured.query).toEqual({
      category: 'linear',
      symbol: 'BTCUSDT',
      interval: '15',
      limit: '100',
    });
    expect(result.list[0]?.[5]).toBe('12.5');
  });

  it('supports category=inverse', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      category: 'inverse',
      symbol: 'BTCUSD',
      list: [],
    });

    await BybitPublicFuturesMarket.getKline(
      { fetch: fetchImpl },
      { category: 'inverse', symbol: 'BTCUSD', interval: '60' },
    );

    expect(captured.query.category).toBe('inverse');
  });
});

describe('BybitPublicFuturesMarket.getMarkPriceKline', () => {
  it('hits /v5/market/mark-price-kline and parses 5-field tuples', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      category: 'linear',
      symbol: 'BTCUSDT',
      list: [['1700000000000', '50000', '50500', '49500', '50100']],
    });

    const result = await BybitPublicFuturesMarket.getMarkPriceKline(
      { fetch: fetchImpl },
      { category: 'linear', symbol: 'BTCUSDT', interval: '60' },
    );

    expect(captured.path).toBe('/v5/market/mark-price-kline');
    expect(captured.query).toEqual({
      category: 'linear',
      symbol: 'BTCUSDT',
      interval: '60',
    });
    expect(result.list[0]).toHaveLength(5);
    expect(result.list[0]?.[4]).toBe('50100');
  });
});

describe('BybitPublicFuturesMarket.getIndexPriceKline', () => {
  it('hits /v5/market/index-price-kline', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      category: 'linear',
      symbol: 'BTCUSDT',
      list: [],
    });

    await BybitPublicFuturesMarket.getIndexPriceKline(
      { fetch: fetchImpl },
      { category: 'linear', symbol: 'BTCUSDT', interval: 'D' },
    );

    expect(captured.path).toBe('/v5/market/index-price-kline');
    expect(captured.query).toEqual({
      category: 'linear',
      symbol: 'BTCUSDT',
      interval: 'D',
    });
  });
});

describe('BybitPublicFuturesMarket.getPremiumIndexPriceKline', () => {
  it('only allows category=linear at the type level and hits the correct path', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      category: 'linear',
      symbol: 'BTCUSDT',
      list: [],
    });

    await BybitPublicFuturesMarket.getPremiumIndexPriceKline(
      { fetch: fetchImpl },
      { category: 'linear', symbol: 'BTCUSDT', interval: '15', limit: 30 },
    );

    expect(captured.path).toBe('/v5/market/premium-index-price-kline');
    expect(captured.query).toEqual({
      category: 'linear',
      symbol: 'BTCUSDT',
      interval: '15',
      limit: '30',
    });
  });
});

describe('BybitPublicFuturesMarket.getInstrumentsInfo', () => {
  it('returns the list of futures instruments and supports pagination', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      category: 'linear',
      list: [
        {
          symbol: 'BTCUSDT',
          contractType: 'LinearPerpetual',
          status: 'Trading',
          baseCoin: 'BTC',
          quoteCoin: 'USDT',
          launchTime: '1585526400000',
          deliveryTime: '0',
          deliveryFeeRate: '',
          priceScale: '2',
          leverageFilter: { minLeverage: '1', maxLeverage: '100', leverageStep: '0.01' },
          priceFilter: { minPrice: '0.5', maxPrice: '1000000', tickSize: '0.5' },
          lotSizeFilter: { minOrderQty: '0.001', maxOrderQty: '100', qtyStep: '0.001' },
          unifiedMarginTrade: true,
          fundingInterval: 480,
          settleCoin: 'USDT',
        },
      ],
      nextPageCursor: 'cursor-2',
    });

    const result = await BybitPublicFuturesMarket.getInstrumentsInfo(
      { fetch: fetchImpl },
      { category: 'linear', symbol: 'BTCUSDT', limit: 1, cursor: 'cursor-1' },
    );

    expect(captured.path).toBe('/v5/market/instruments-info');
    expect(captured.query).toEqual({
      category: 'linear',
      symbol: 'BTCUSDT',
      limit: '1',
      cursor: 'cursor-1',
    });
    expect(result.list[0]?.contractType).toBe('LinearPerpetual');
    expect(result.nextPageCursor).toBe('cursor-2');
  });
});

describe('BybitPublicFuturesMarket.getOrderbook', () => {
  it('returns deep orderbook for futures with seq/cts fields', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      s: 'BTCUSDT',
      b: [['50000', '0.5']],
      a: [['50001', '0.4']],
      ts: 1_700_000_000_000,
      u: 1,
      seq: 99,
      cts: 1_700_000_000_001,
    });

    const result = await BybitPublicFuturesMarket.getOrderbook(
      { fetch: fetchImpl },
      { category: 'linear', symbol: 'BTCUSDT', limit: 200 },
    );

    expect(captured.path).toBe('/v5/market/orderbook');
    expect(captured.query).toEqual({ category: 'linear', symbol: 'BTCUSDT', limit: '200' });
    expect(result.seq).toBe(99);
    expect(result.cts).toBe(1_700_000_000_001);
  });
});

describe('BybitPublicFuturesMarket.getTickers', () => {
  it('forwards baseCoin and expDate filters', async () => {
    const { fetchImpl, captured } = makeOkFetch({ category: 'linear', list: [] });

    await BybitPublicFuturesMarket.getTickers(
      { fetch: fetchImpl },
      { category: 'linear', baseCoin: 'BTC', expDate: '15DEC23' },
    );

    expect(captured.path).toBe('/v5/market/tickers');
    expect(captured.query).toEqual({
      category: 'linear',
      baseCoin: 'BTC',
      expDate: '15DEC23',
    });
  });
});

describe('BybitPublicFuturesMarket.getFundingRateHistory', () => {
  it('GET /v5/market/funding/history with full params', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      category: 'linear',
      list: [{ symbol: 'BTCUSDT', fundingRate: '0.0001', fundingRateTimestamp: '1700000000000' }],
    });

    const result = await BybitPublicFuturesMarket.getFundingRateHistory(
      { fetch: fetchImpl },
      {
        category: 'linear',
        symbol: 'BTCUSDT',
        startTime: 1_699_996_400_000,
        endTime: 1_700_000_000_000,
        limit: 50,
      },
    );

    expect(captured.path).toBe('/v5/market/funding/history');
    expect(captured.query).toEqual({
      category: 'linear',
      symbol: 'BTCUSDT',
      startTime: '1699996400000',
      endTime: '1700000000000',
      limit: '50',
    });
    expect(result.list[0]?.fundingRate).toBe('0.0001');
  });
});

describe('BybitPublicFuturesMarket.getRecentTrades', () => {
  it('GET /v5/market/recent-trade?category=linear', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      category: 'linear',
      list: [
        {
          execId: 'e1',
          symbol: 'BTCUSDT',
          price: '50000',
          size: '0.1',
          side: 'Sell',
          time: '1700000000000',
          isBlockTrade: false,
        },
      ],
    });

    const result = await BybitPublicFuturesMarket.getRecentTrades(
      { fetch: fetchImpl },
      { category: 'linear', symbol: 'BTCUSDT', limit: 200 },
    );

    expect(captured.query).toEqual({
      category: 'linear',
      symbol: 'BTCUSDT',
      limit: '200',
    });
    expect(result.list[0]?.side).toBe('Sell');
  });
});

describe('BybitPublicFuturesMarket.getOpenInterest', () => {
  it('GET /v5/market/open-interest with intervalTime and pagination', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      category: 'linear',
      symbol: 'BTCUSDT',
      list: [{ openInterest: '15000.5', timestamp: '1700000000000' }],
      nextPageCursor: 'cursor-2',
    });

    const result = await BybitPublicFuturesMarket.getOpenInterest(
      { fetch: fetchImpl },
      {
        category: 'linear',
        symbol: 'BTCUSDT',
        intervalTime: '1h',
        startTime: 1_699_996_400_000,
        endTime: 1_700_000_000_000,
        limit: 50,
        cursor: 'cursor-1',
      },
    );

    expect(captured.path).toBe('/v5/market/open-interest');
    expect(captured.query).toEqual({
      category: 'linear',
      symbol: 'BTCUSDT',
      intervalTime: '1h',
      startTime: '1699996400000',
      endTime: '1700000000000',
      limit: '50',
      cursor: 'cursor-1',
    });
    expect(result.nextPageCursor).toBe('cursor-2');
  });
});

describe('BybitPublicFuturesMarket.getRiskLimit', () => {
  it('GET /v5/market/risk-limit with cursor and symbol', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      category: 'linear',
      list: [
        {
          id: 1,
          symbol: 'BTCUSDT',
          riskLimitValue: '2000000',
          maintenanceMargin: '0.005',
          initialMargin: '0.01',
          isLowestRisk: 1,
          maxLeverage: '100.00',
          mmDeduction: '0',
        },
      ],
      nextPageCursor: 'next',
    });

    const result = await BybitPublicFuturesMarket.getRiskLimit(
      { fetch: fetchImpl },
      { category: 'linear', symbol: 'BTCUSDT', cursor: 'cursor-1' },
    );

    expect(captured.path).toBe('/v5/market/risk-limit');
    expect(captured.query).toEqual({
      category: 'linear',
      symbol: 'BTCUSDT',
      cursor: 'cursor-1',
    });
    expect(result.list[0]?.isLowestRisk).toBe(1);
  });

  it('omits symbol/cursor when not provided', async () => {
    const { fetchImpl, captured } = makeOkFetch({ category: 'inverse', list: [] });

    await BybitPublicFuturesMarket.getRiskLimit({ fetch: fetchImpl }, { category: 'inverse' });

    expect(captured.query).toEqual({ category: 'inverse' });
  });
});

describe('BybitPublicFuturesMarket.getDeliveryPrice', () => {
  it('GET /v5/market/delivery-price with all filters', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      category: 'linear',
      list: [{ symbol: 'BTC-30JUN23', deliveryPrice: '30000.5', deliveryTime: '1688083200000' }],
    });

    await BybitPublicFuturesMarket.getDeliveryPrice(
      { fetch: fetchImpl },
      {
        category: 'linear',
        symbol: 'BTC-30JUN23',
        baseCoin: 'BTC',
        limit: 100,
        cursor: 'c1',
      },
    );

    expect(captured.path).toBe('/v5/market/delivery-price');
    expect(captured.query).toEqual({
      category: 'linear',
      symbol: 'BTC-30JUN23',
      baseCoin: 'BTC',
      limit: '100',
      cursor: 'c1',
    });
  });
});

describe('BybitPublicFuturesMarket.getLongShortRatio', () => {
  it('GET /v5/market/account-ratio', async () => {
    const { fetchImpl, captured } = makeOkFetch({
      list: [
        { symbol: 'BTCUSDT', buyRatio: '0.55', sellRatio: '0.45', timestamp: '1700000000000' },
      ],
    });

    const result = await BybitPublicFuturesMarket.getLongShortRatio(
      { fetch: fetchImpl },
      { category: 'linear', symbol: 'BTCUSDT', period: '1h', limit: 10 },
    );

    expect(captured.path).toBe('/v5/market/account-ratio');
    expect(captured.query).toEqual({
      category: 'linear',
      symbol: 'BTCUSDT',
      period: '1h',
      limit: '10',
    });
    expect(result.list[0]?.buyRatio).toBe('0.55');
  });
});

describe('BybitPublicFuturesMarket — class invariants', () => {
  it('cannot be instantiated with new', () => {
    expectNotConstructable(BybitPublicFuturesMarket, /static class/);
  });
});
