import { describe, expect, it, vi } from 'vitest';

import { OkxApiError, OkxHttp, OkxNetworkError } from '../../../../src/index.js';
import { expectNotConstructable, makeOkxOkFetch, okxOkEnvelope, urlOf } from './_helpers.js';

function okxError(code: string, msg: string): Response {
  return new Response(JSON.stringify({ code, msg, data: [] }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('OkxHttp.request', () => {
  it('returns parsed `data` on code="0"', async () => {
    const fetchImpl = vi.fn(() => Promise.resolve(okxOkEnvelope([{ ts: '1' }])));
    const data = await OkxHttp.request<{ ts: string }[]>(
      { fetch: fetchImpl },
      { method: 'GET', path: '/api/v5/public/time' },
    );
    expect(data).toEqual([{ ts: '1' }]);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('targets www.okx.com by default', async () => {
    const { fetchImpl, captured } = makeOkxOkFetch([]);
    await OkxHttp.request({ fetch: fetchImpl }, { method: 'GET', path: '/api/v5/public/time' });
    expect(captured.url.startsWith('https://www.okx.com')).toBe(true);
    expect(captured.path).toBe('/api/v5/public/time');
  });

  it('honours ctx.baseUrl override', async () => {
    let capturedUrl = '';
    const fetchImpl = vi.fn<typeof fetch>((input) => {
      capturedUrl = urlOf(input);
      return Promise.resolve(okxOkEnvelope([]));
    });
    await OkxHttp.request(
      { baseUrl: 'https://aws.okx.com', fetch: fetchImpl },
      { method: 'GET', path: '/api/v5/public/time' },
    );
    expect(capturedUrl).toBe('https://aws.okx.com/api/v5/public/time');
  });

  it('does NOT add x-simulated-trading header for env=live', async () => {
    const { fetchImpl, captured } = makeOkxOkFetch([]);
    await OkxHttp.request({ fetch: fetchImpl }, { method: 'GET', path: '/api/v5/public/time' });
    expect(captured.headers['x-simulated-trading']).toBeUndefined();
  });

  it('adds x-simulated-trading: 1 header for env=demo', async () => {
    const { fetchImpl, captured } = makeOkxOkFetch([]);
    await OkxHttp.request(
      { env: 'demo', fetch: fetchImpl },
      { method: 'GET', path: '/api/v5/public/time' },
    );
    expect(captured.headers['x-simulated-trading']).toBe('1');
  });

  it('sorts query params and appends them to the URL', async () => {
    const { fetchImpl, captured } = makeOkxOkFetch([]);
    await OkxHttp.request(
      { fetch: fetchImpl },
      {
        method: 'GET',
        path: '/api/v5/market/tickers',
        query: { instType: 'SPOT', instFamily: 'BTC-USDT' },
      },
    );
    expect(captured.url).toBe(
      'https://www.okx.com/api/v5/market/tickers?instFamily=BTC-USDT&instType=SPOT',
    );
  });

  it('drops undefined query params', async () => {
    const { fetchImpl, captured } = makeOkxOkFetch([]);
    await OkxHttp.request(
      { fetch: fetchImpl },
      {
        method: 'GET',
        path: '/api/v5/market/tickers',
        query: { instType: 'SPOT', uly: undefined, instFamily: 'BTC-USDT' },
      },
    );
    expect(captured.query).toEqual({ instType: 'SPOT', instFamily: 'BTC-USDT' });
  });

  it('throws OkxApiError on non-zero code', async () => {
    const fetchImpl = vi.fn(() => Promise.resolve(okxError('51000', 'Parameter error')));
    await expect(
      OkxHttp.request({ fetch: fetchImpl }, { method: 'GET', path: '/api/v5/x' }),
    ).rejects.toBeInstanceOf(OkxApiError);
  });

  it('throws OkxNetworkError when fetch itself fails', async () => {
    const fetchImpl = vi.fn(() => Promise.reject(new Error('ECONNRESET')));
    await expect(
      OkxHttp.request({ fetch: fetchImpl }, { method: 'GET', path: '/api/v5/x' }),
    ).rejects.toBeInstanceOf(OkxNetworkError);
  });

  it('throws OkxNetworkError on non-2xx HTTP status', async () => {
    const fetchImpl = vi.fn(() =>
      Promise.resolve(new Response('Bad Gateway', { status: 502, statusText: 'Bad Gateway' })),
    );
    await expect(
      OkxHttp.request({ fetch: fetchImpl }, { method: 'GET', path: '/api/v5/x' }),
    ).rejects.toBeInstanceOf(OkxNetworkError);
  });

  it('throws OkxNetworkError on non-JSON body', async () => {
    const fetchImpl = vi.fn(() =>
      Promise.resolve(new Response('<html>nope</html>', { status: 200 })),
    );
    await expect(
      OkxHttp.request({ fetch: fetchImpl }, { method: 'GET', path: '/api/v5/x' }),
    ).rejects.toBeInstanceOf(OkxNetworkError);
  });

  it('throws OkxNetworkError if envelope shape is invalid', async () => {
    const fetchImpl = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );
    await expect(
      OkxHttp.request({ fetch: fetchImpl }, { method: 'GET', path: '/api/v5/x' }),
    ).rejects.toBeInstanceOf(OkxNetworkError);
  });

  it('refuses signed request without credentials', async () => {
    const fetchImpl = vi.fn(() => Promise.resolve(okxOkEnvelope([])));
    await expect(
      OkxHttp.request(
        { fetch: fetchImpl },
        { method: 'GET', path: '/api/v5/account/balance', auth: true },
      ),
    ).rejects.toBeInstanceOf(OkxNetworkError);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('attaches OK-ACCESS-* headers for signed GET requests with query', async () => {
    const { fetchImpl, captured } = makeOkxOkFetch([]);
    await OkxHttp.request(
      {
        credentials: { apiKey: 'KEY', apiSecret: 'SECRET', passphrase: 'PASS' },
        fetch: fetchImpl,
      },
      {
        method: 'GET',
        path: '/api/v5/account/balance',
        query: { ccy: 'BTC' },
        auth: true,
      },
    );
    expect(captured.headers['ok-access-key']).toBe('KEY');
    expect(captured.headers['ok-access-passphrase']).toBe('PASS');
    expect(captured.headers['ok-access-timestamp']).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    );
    expect(captured.headers['ok-access-sign']).toMatch(/^[A-Za-z0-9+/]+=*$/);
  });

  it('signs over the full requestPath including query string', async () => {
    const { fetchImpl, captured } = makeOkxOkFetch([]);
    await OkxHttp.request(
      {
        credentials: { apiKey: 'KEY', apiSecret: 'SECRET', passphrase: 'PASS' },
        fetch: fetchImpl,
      },
      {
        method: 'GET',
        path: '/api/v5/account/balance',
        query: { ccy: 'BTC' },
        auth: true,
      },
    );
    const ts = captured.headers['ok-access-timestamp'];
    const sig = captured.headers['ok-access-sign'];
    const { createHmac } = await import('node:crypto');
    const expected = createHmac('sha256', 'SECRET')
      .update(`${ts ?? ''}GET/api/v5/account/balance?ccy=BTC`)
      .digest('base64');
    expect(sig).toBe(expected);
  });

  it('serialises POST body and sets Content-Type: application/json', async () => {
    const { fetchImpl, captured } = makeOkxOkFetch([]);
    await OkxHttp.request(
      {
        credentials: { apiKey: 'KEY', apiSecret: 'SECRET', passphrase: 'PASS' },
        fetch: fetchImpl,
      },
      {
        method: 'POST',
        path: '/api/v5/trade/order',
        body: { instId: 'BTC-USDT', tdMode: 'cash', side: 'buy', ordType: 'market', sz: '1' },
        auth: true,
      },
    );
    expect(captured.method).toBe('POST');
    expect(captured.headers['content-type']).toBe('application/json');
    expect(captured.body).toBe(
      JSON.stringify({
        instId: 'BTC-USDT',
        tdMode: 'cash',
        side: 'buy',
        ordType: 'market',
        sz: '1',
      }),
    );
  });

  it('cannot be instantiated with new', () => {
    expectNotConstructable(OkxHttp, /static class/);
  });
});
