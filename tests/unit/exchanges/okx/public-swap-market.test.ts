import { describe, expect, it } from 'vitest';

import { OkxPublicSwapMarket } from '../../../../src/index.js';
import { makeOkxOkFetch } from './_helpers.js';

describe('OkxPublicSwapMarket', () => {
  describe('getInstruments', () => {
    it('fixes instType=SWAP and forwards uly/instFamily/instId', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSwapMarket.getInstruments(
        { fetch: fetchImpl },
        { uly: 'BTC-USDT', instFamily: 'BTC-USDT', instId: 'BTC-USDT-SWAP' },
      );
      expect(captured.path).toBe('/api/v5/public/instruments');
      expect(captured.query).toEqual({
        instType: 'SWAP',
        uly: 'BTC-USDT',
        instFamily: 'BTC-USDT',
        instId: 'BTC-USDT-SWAP',
      });
    });
  });

  describe('getTickers', () => {
    it('fixes instType=SWAP', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSwapMarket.getTickers({ fetch: fetchImpl });
      expect(captured.query).toEqual({ instType: 'SWAP' });
    });
  });

  describe('getTicker', () => {
    it('GET /api/v5/market/ticker?instId=BTC-USDT-SWAP', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSwapMarket.getTicker({ fetch: fetchImpl }, { instId: 'BTC-USDT-SWAP' });
      expect(captured.query).toEqual({ instId: 'BTC-USDT-SWAP' });
    });
  });

  describe('getOrderbook', () => {
    it('forwards sz', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSwapMarket.getOrderbook(
        { fetch: fetchImpl },
        { instId: 'BTC-USDT-SWAP', sz: 400 },
      );
      expect(captured.query).toEqual({ instId: 'BTC-USDT-SWAP', sz: '400' });
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
      const fn = OkxPublicSwapMarket[method] as (
        ctx: { fetch: typeof fetch },
        params: { instId: string; bar: '1m' },
      ) => Promise<unknown>;
      await fn({ fetch: fetchImpl }, { instId: 'BTC-USDT-SWAP', bar: '1m' });
      expect(captured.path).toBe(path);
      expect(captured.query).toEqual({ instId: 'BTC-USDT-SWAP', bar: '1m' });
    });
  });

  describe('getRecentTrades and getHistoryTrades', () => {
    it('GET /api/v5/market/trades', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSwapMarket.getRecentTrades(
        { fetch: fetchImpl },
        { instId: 'BTC-USDT-SWAP', limit: 200 },
      );
      expect(captured.path).toBe('/api/v5/market/trades');
      expect(captured.query).toEqual({ instId: 'BTC-USDT-SWAP', limit: '200' });
    });

    it('GET /api/v5/market/history-trades', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSwapMarket.getHistoryTrades(
        { fetch: fetchImpl },
        { instId: 'BTC-USDT-SWAP', type: '1' },
      );
      expect(captured.path).toBe('/api/v5/market/history-trades');
      expect(captured.query).toEqual({ instId: 'BTC-USDT-SWAP', type: '1' });
    });
  });

  describe('getFundingRate', () => {
    it('GET /api/v5/public/funding-rate', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSwapMarket.getFundingRate({ fetch: fetchImpl }, { instId: 'BTC-USDT-SWAP' });
      expect(captured.path).toBe('/api/v5/public/funding-rate');
      expect(captured.query).toEqual({ instId: 'BTC-USDT-SWAP' });
    });
  });

  describe('getFundingRateHistory', () => {
    it('GET /api/v5/public/funding-rate-history with pagination', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSwapMarket.getFundingRateHistory(
        { fetch: fetchImpl },
        { instId: 'BTC-USDT-SWAP', before: 1, after: 100, limit: 50 },
      );
      expect(captured.path).toBe('/api/v5/public/funding-rate-history');
      expect(captured.query).toEqual({
        instId: 'BTC-USDT-SWAP',
        before: '1',
        after: '100',
        limit: '50',
      });
    });
  });

  describe('getOpenInterest', () => {
    it('fixes instType=SWAP', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSwapMarket.getOpenInterest({ fetch: fetchImpl });
      expect(captured.path).toBe('/api/v5/public/open-interest');
      expect(captured.query).toEqual({ instType: 'SWAP' });
    });
  });

  describe('getMarkPrice', () => {
    it('fixes instType=SWAP and forwards instId', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSwapMarket.getMarkPrice({ fetch: fetchImpl }, { instId: 'BTC-USDT-SWAP' });
      expect(captured.path).toBe('/api/v5/public/mark-price');
      expect(captured.query).toEqual({ instType: 'SWAP', instId: 'BTC-USDT-SWAP' });
    });
  });

  describe('getPriceLimit', () => {
    it('GET /api/v5/public/price-limit', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSwapMarket.getPriceLimit({ fetch: fetchImpl }, { instId: 'BTC-USDT-SWAP' });
      expect(captured.path).toBe('/api/v5/public/price-limit');
      expect(captured.query).toEqual({ instId: 'BTC-USDT-SWAP' });
    });
  });

  describe('getInsuranceFund', () => {
    it('fixes instType=SWAP and forwards full param set', async () => {
      const { fetchImpl, captured } = makeOkxOkFetch([]);
      await OkxPublicSwapMarket.getInsuranceFund(
        { fetch: fetchImpl },
        {
          type: 'liquidation_balance_deposit',
          uly: 'BTC-USDT',
          instFamily: 'BTC-USDT',
          ccy: 'USDT',
          before: 1,
          after: 100,
          limit: 50,
        },
      );
      expect(captured.path).toBe('/api/v5/public/insurance-fund');
      expect(captured.query).toEqual({
        instType: 'SWAP',
        type: 'liquidation_balance_deposit',
        uly: 'BTC-USDT',
        instFamily: 'BTC-USDT',
        ccy: 'USDT',
        before: '1',
        after: '100',
        limit: '50',
      });
    });
  });
});
