import { describe, expect, it, vi } from 'vitest';

import { BybitApiError, BybitHttp, BybitNetworkError } from '../../../../src/index.js';
import { expectNotConstructable } from './_helpers.js';

function ok<T>(result: T): Response {
  return new Response(JSON.stringify({ retCode: 0, retMsg: 'OK', result, time: 1 }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

function bybitError(retCode: number, retMsg: string): Response {
  return new Response(JSON.stringify({ retCode, retMsg, result: {}, time: 1 }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('BybitHttp.request', () => {
  it('returns parsed `result` on retCode=0', async () => {
    const fetchImpl = vi.fn(() => Promise.resolve(ok({ hello: 'world' })));
    const result = await BybitHttp.request<{ hello: string }>(
      { fetch: fetchImpl },
      { method: 'GET', path: '/v5/ping' },
    );
    expect(result).toEqual({ hello: 'world' });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('targets mainnet by default and testnet when env=testnet', async () => {
    const captured: string[] = [];
    const fetchImpl = vi.fn((url: string) => {
      captured.push(url);
      return Promise.resolve(ok({}));
    });
    await BybitHttp.request({ fetch: fetchImpl }, { method: 'GET', path: '/v5/market/time' });
    await BybitHttp.request(
      { env: 'testnet', fetch: fetchImpl },
      { method: 'GET', path: '/v5/market/time' },
    );
    expect(captured[0]).toBe('https://api.bybit.com/v5/market/time');
    expect(captured[1]).toBe('https://api-testnet.bybit.com/v5/market/time');
  });

  it('sorts query params and appends them to the URL', async () => {
    let capturedUrl = '';
    const fetchImpl = vi.fn((url: string) => {
      capturedUrl = url;
      return Promise.resolve(ok({}));
    });
    await BybitHttp.request(
      { fetch: fetchImpl },
      {
        method: 'GET',
        path: '/v5/market/tickers',
        query: { symbol: 'BTCUSDT', category: 'spot' },
      },
    );
    expect(capturedUrl).toBe(
      'https://api.bybit.com/v5/market/tickers?category=spot&symbol=BTCUSDT',
    );
  });

  it('throws BybitApiError on non-zero retCode', async () => {
    const fetchImpl = vi.fn(() => Promise.resolve(bybitError(10001, 'params error')));
    await expect(
      BybitHttp.request({ fetch: fetchImpl }, { method: 'GET', path: '/v5/x' }),
    ).rejects.toBeInstanceOf(BybitApiError);
  });

  it('throws BybitNetworkError when fetch itself fails', async () => {
    const fetchImpl = vi.fn(() => Promise.reject(new Error('ECONNRESET')));
    await expect(
      BybitHttp.request({ fetch: fetchImpl }, { method: 'GET', path: '/v5/x' }),
    ).rejects.toBeInstanceOf(BybitNetworkError);
  });

  it('throws BybitNetworkError on non-2xx HTTP status', async () => {
    const fetchImpl = vi.fn(() =>
      Promise.resolve(new Response('Bad Gateway', { status: 502, statusText: 'Bad Gateway' })),
    );
    await expect(
      BybitHttp.request({ fetch: fetchImpl }, { method: 'GET', path: '/v5/x' }),
    ).rejects.toBeInstanceOf(BybitNetworkError);
  });

  it('throws BybitNetworkError on non-JSON body', async () => {
    const fetchImpl = vi.fn(() =>
      Promise.resolve(new Response('<html>nope</html>', { status: 200 })),
    );
    await expect(
      BybitHttp.request({ fetch: fetchImpl }, { method: 'GET', path: '/v5/x' }),
    ).rejects.toBeInstanceOf(BybitNetworkError);
  });

  it('throws BybitNetworkError if envelope shape is invalid', async () => {
    const fetchImpl = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );
    await expect(
      BybitHttp.request({ fetch: fetchImpl }, { method: 'GET', path: '/v5/x' }),
    ).rejects.toBeInstanceOf(BybitNetworkError);
  });

  it('refuses signed request without credentials', async () => {
    const fetchImpl = vi.fn(() => Promise.resolve(ok({})));
    await expect(
      BybitHttp.request(
        { fetch: fetchImpl },
        { method: 'GET', path: '/v5/account/wallet-balance', auth: true },
      ),
    ).rejects.toBeInstanceOf(BybitNetworkError);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('attaches X-BAPI-* headers for signed requests', async () => {
    let capturedHeaders: Headers | undefined;
    const fetchImpl = vi.fn((_url: string, init: RequestInit) => {
      capturedHeaders = new Headers(init.headers);
      return Promise.resolve(ok({}));
    });

    await BybitHttp.request(
      {
        env: 'testnet',
        credentials: { apiKey: 'KEY', apiSecret: 'SECRET' },
        recvWindow: 7000,
        fetch: fetchImpl,
      },
      {
        method: 'GET',
        path: '/v5/account/wallet-balance',
        query: { accountType: 'UNIFIED' },
        auth: true,
      },
    );

    expect(capturedHeaders?.get('x-bapi-api-key')).toBe('KEY');
    expect(capturedHeaders?.get('x-bapi-sign-type')).toBe('2');
    expect(capturedHeaders?.get('x-bapi-recv-window')).toBe('7000');
    expect(capturedHeaders?.get('x-bapi-timestamp')).toMatch(/^\d+$/);
    expect(capturedHeaders?.get('x-bapi-sign')).toMatch(/^[0-9a-f]{64}$/);
  });

  it('cannot be instantiated with new', () => {
    expectNotConstructable(BybitHttp, /static class/);
  });
});
