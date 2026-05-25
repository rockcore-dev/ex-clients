import { describe, expect, it } from 'vitest';

import { OkxPublicFuturesMarket } from '../../../../src/index.js';
import { makeOkxOkFetch } from './_helpers.js';

describe('OkxPublicFuturesMarket', () => {
  describe('getInstruments', () => {
    it('fixes instType=FUTURES', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicFuturesMarket.getInstruments(
        { fetch: fetchImpl },
        { uly: 'BTC-USD', instFamily: 'BTC-USD', instId: 'BTC-USD-241227' },
      );
      expect(captured.path).toBe('/api/v5/public/instruments');
      expect(captured.query).toEqual({
        instType: 'FUTURES',
        uly: 'BTC-USD',
        instFamily: 'BTC-USD',
        instId: 'BTC-USD-241227',
      });
    });
  });

  describe('getTickers', () => {
    it('fixes instType=FUTURES', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicFuturesMarket.getTickers({ fetch: fetchImpl });
      expect(captured.query).toEqual({ instType: 'FUTURES' });
    });
  });

  describe('getTicker / getOrderbook', () => {
    it('GET /api/v5/market/ticker', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicFuturesMarket.getTicker({ fetch: fetchImpl }, { instId: 'BTC-USD-241227' });
      expect(captured.path).toBe('/api/v5/market/ticker');
      expect(captured.query).toEqual({ instId: 'BTC-USD-241227' });
    });

    it('GET /api/v5/market/books', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicFuturesMarket.getOrderbook(
        { fetch: fetchImpl },
        { instId: 'BTC-USD-241227', sz: 100 },
      );
      expect(captured.path).toBe('/api/v5/market/books');
      expect(captured.query).toEqual({ instId: 'BTC-USD-241227', sz: '100' });
    });
  });

  describe('kline family', () => {
    it.each([
      ['getKline', '/api/v5/market/candles'],
      ['getHistoryKline', '/api/v5/market/history-candles'],
      ['getIndexKline', '/api/v5/market/index-candles'],
      ['getMarkPriceKline', '/api/v5/market/mark-price-candles'],
    ] as const)('%s -> %s', async (method, path) => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      const fn = OkxPublicFuturesMarket[method] as (
        ctx: { fetch: typeof fetch },
        params: { instId: string; bar: '4H' },
      ) => Promise<unknown>;
      await fn({ fetch: fetchImpl }, { instId: 'BTC-USD-241227', bar: '4H' });
      expect(captured.path).toBe(path);
      expect(captured.query).toEqual({ instId: 'BTC-USD-241227', bar: '4H' });
    });
  });

  describe('getRecentTrades / getHistoryTrades', () => {
    it('GET /api/v5/market/trades', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicFuturesMarket.getRecentTrades(
        { fetch: fetchImpl },
        { instId: 'BTC-USD-241227' },
      );
      expect(captured.path).toBe('/api/v5/market/trades');
      expect(captured.query).toEqual({ instId: 'BTC-USD-241227' });
    });

    it('GET /api/v5/market/history-trades', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicFuturesMarket.getHistoryTrades(
        { fetch: fetchImpl },
        { instId: 'BTC-USD-241227', type: '2' },
      );
      expect(captured.path).toBe('/api/v5/market/history-trades');
      expect(captured.query).toEqual({ instId: 'BTC-USD-241227', type: '2' });
    });
  });

  describe('getOpenInterest', () => {
    it('fixes instType=FUTURES and forwards uly', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicFuturesMarket.getOpenInterest({ fetch: fetchImpl }, { uly: 'BTC-USD' });
      expect(captured.path).toBe('/api/v5/public/open-interest');
      expect(captured.query).toEqual({ instType: 'FUTURES', uly: 'BTC-USD' });
    });
  });

  describe('getMarkPrice', () => {
    it('fixes instType=FUTURES', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicFuturesMarket.getMarkPrice({ fetch: fetchImpl }, { instId: 'BTC-USD-241227' });
      expect(captured.path).toBe('/api/v5/public/mark-price');
      expect(captured.query).toEqual({ instType: 'FUTURES', instId: 'BTC-USD-241227' });
    });
  });

  describe('getPriceLimit', () => {
    it('GET /api/v5/public/price-limit', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicFuturesMarket.getPriceLimit(
        { fetch: fetchImpl },
        { instId: 'BTC-USD-241227' },
      );
      expect(captured.path).toBe('/api/v5/public/price-limit');
      expect(captured.query).toEqual({ instId: 'BTC-USD-241227' });
    });
  });

  describe('getInsuranceFund', () => {
    it('fixes instType=FUTURES and forwards instFamily/ccy', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicFuturesMarket.getInsuranceFund(
        { fetch: fetchImpl },
        { instFamily: 'BTC-USD', ccy: 'BTC' },
      );
      expect(captured.query).toEqual({
        instType: 'FUTURES',
        instFamily: 'BTC-USD',
        ccy: 'BTC',
      });
    });
  });

  describe('getEstimatedPrice', () => {
    it('GET /api/v5/public/estimated-price?instId=...', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicFuturesMarket.getEstimatedPrice(
        { fetch: fetchImpl },
        { instId: 'BTC-USD-241227' },
      );
      expect(captured.path).toBe('/api/v5/public/estimated-price');
      expect(captured.query).toEqual({ instId: 'BTC-USD-241227' });
    });
  });

  describe('getDeliveryExerciseHistory', () => {
    it('fixes instType=FUTURES and forwards uly + pagination', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicFuturesMarket.getDeliveryExerciseHistory(
        { fetch: fetchImpl },
        { uly: 'BTC-USD', before: 1, after: 100, limit: 50 },
      );
      expect(captured.path).toBe('/api/v5/public/delivery-exercise-history');
      expect(captured.query).toEqual({
        instType: 'FUTURES',
        uly: 'BTC-USD',
        before: '1',
        after: '100',
        limit: '50',
      });
    });
  });
});
