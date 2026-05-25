import { describe, expect, it } from 'vitest';

import { OkxPublicSpotMarket } from '../../../../src/index.js';
import { makeOkxOkFetch } from './_helpers.js';

describe('OkxPublicSpotMarket', () => {
  describe('getInstruments', () => {
    it('GET /api/v5/public/instruments?instType=SPOT', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSpotMarket.getInstruments({ fetch: fetchImpl });
      expect(captured.method).toBe('GET');
      expect(captured.path).toBe('/api/v5/public/instruments');
      expect(captured.query).toEqual({ instType: 'SPOT' });
    });

    it('forwards instId when provided', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSpotMarket.getInstruments({ fetch: fetchImpl }, { instId: 'BTC-USDT' });
      expect(captured.query).toEqual({ instType: 'SPOT', instId: 'BTC-USDT' });
    });
  });

  describe('getTickers', () => {
    it('fixes instType=SPOT and forwards uly/instFamily', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSpotMarket.getTickers(
        { fetch: fetchImpl },
        { uly: 'BTC-USDT', instFamily: 'BTC-USDT' },
      );
      expect(captured.path).toBe('/api/v5/market/tickers');
      expect(captured.query).toEqual({
        instType: 'SPOT',
        uly: 'BTC-USDT',
        instFamily: 'BTC-USDT',
      });
    });
  });

  describe('getTicker', () => {
    it('GET /api/v5/market/ticker?instId=...', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSpotMarket.getTicker({ fetch: fetchImpl }, { instId: 'BTC-USDT' });
      expect(captured.path).toBe('/api/v5/market/ticker');
      expect(captured.query).toEqual({ instId: 'BTC-USDT' });
    });
  });

  describe('getOrderbook', () => {
    it('GET /api/v5/market/books?instId=...&sz=...', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSpotMarket.getOrderbook({ fetch: fetchImpl }, { instId: 'BTC-USDT', sz: 50 });
      expect(captured.path).toBe('/api/v5/market/books');
      expect(captured.query).toEqual({ instId: 'BTC-USDT', sz: '50' });
    });
  });

  describe('getKline', () => {
    it('GET /api/v5/market/candles with all params', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSpotMarket.getKline(
        { fetch: fetchImpl },
        {
          instId: 'BTC-USDT',
          bar: '15m',
          before: 1_700_000_000_000,
          after: 1_710_000_000_000,
          limit: 50,
        },
      );
      expect(captured.path).toBe('/api/v5/market/candles');
      expect(captured.query).toEqual({
        instId: 'BTC-USDT',
        bar: '15m',
        before: '1700000000000',
        after: '1710000000000',
        limit: '50',
      });
    });
  });

  describe('getHistoryKline', () => {
    it('GET /api/v5/market/history-candles', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSpotMarket.getHistoryKline(
        { fetch: fetchImpl },
        { instId: 'BTC-USDT', bar: '1H' },
      );
      expect(captured.path).toBe('/api/v5/market/history-candles');
      expect(captured.query).toEqual({ instId: 'BTC-USDT', bar: '1H' });
    });
  });

  describe('getRecentTrades', () => {
    it('GET /api/v5/market/trades', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSpotMarket.getRecentTrades(
        { fetch: fetchImpl },
        { instId: 'BTC-USDT', limit: 100 },
      );
      expect(captured.path).toBe('/api/v5/market/trades');
      expect(captured.query).toEqual({ instId: 'BTC-USDT', limit: '100' });
    });
  });

  describe('getHistoryTrades', () => {
    it('GET /api/v5/market/history-trades with pagination', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSpotMarket.getHistoryTrades(
        { fetch: fetchImpl },
        { instId: 'BTC-USDT', type: '2', before: '1', after: '100', limit: 50 },
      );
      expect(captured.path).toBe('/api/v5/market/history-trades');
      expect(captured.query).toEqual({
        instId: 'BTC-USDT',
        type: '2',
        before: '1',
        after: '100',
        limit: '50',
      });
    });
  });
});
