import { describe, expect, it, vi } from 'vitest';

import { BybitPublicCommon } from '../../../../src/index.js';
import { expectNotConstructable, urlOf } from './_helpers.js';

describe('BybitPublicCommon.getServerTime', () => {
  it('parses the v5 envelope and returns timeSecond / timeNano', async () => {
    const fetchImpl = vi.fn(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            retCode: 0,
            retMsg: 'OK',
            result: { timeSecond: '1700000000', timeNano: '1700000000000000000' },
            time: 1_700_000_000,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        ),
      ),
    );

    const result = await BybitPublicCommon.getServerTime({ fetch: fetchImpl });

    expect(result).toEqual({
      timeSecond: '1700000000',
      timeNano: '1700000000000000000',
    });
  });

  it('calls GET /v5/market/time on mainnet by default', async () => {
    let capturedUrl = '';
    let capturedMethod = '';
    const fetchImpl = vi.fn<typeof fetch>((input, init) => {
      capturedUrl = urlOf(input);
      capturedMethod = String(init?.method);
      return Promise.resolve(
        new Response(
          JSON.stringify({
            retCode: 0,
            retMsg: 'OK',
            result: { timeSecond: '0', timeNano: '0' },
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        ),
      );
    });

    await BybitPublicCommon.getServerTime({ fetch: fetchImpl });

    expect(capturedUrl).toBe('https://api.bybit.com/v5/market/time');
    expect(capturedMethod).toBe('GET');
  });

  it('cannot be instantiated with new', () => {
    expectNotConstructable(BybitPublicCommon, /static class/);
  });
});
