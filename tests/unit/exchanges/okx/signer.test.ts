import { createHmac } from 'node:crypto';

import { describe, expect, it } from 'vitest';

import { OkxSigner } from '../../../../src/lib/exchanges/okx/http/signer.js';
import { expectNotConstructable } from './_helpers.js';

describe('OkxSigner', () => {
  it('produces base64 HMAC-SHA256 over (timestamp + method + requestPath + body)', () => {
    const credentials = {
      apiKey: 'TEST_KEY',
      apiSecret: 'TEST_SECRET',
      passphrase: 'TEST_PASS',
    };
    const timestamp = '2024-05-01T00:00:00.000Z';
    const method = 'POST';
    const requestPath = '/api/v5/trade/order';
    const body = '{"instId":"BTC-USDT"}';

    const expected = createHmac('sha256', credentials.apiSecret)
      .update(`${timestamp}${method}${requestPath}${body}`)
      .digest('base64');

    expect(OkxSigner.sign(credentials, timestamp, method, requestPath, body)).toBe(expected);
  });

  it('returns base64 string (Y/+/= alphabet, not hex)', () => {
    const sig = OkxSigner.sign(
      { apiKey: 'K', apiSecret: 'S', passphrase: 'P' },
      '2024-01-01T00:00:00.000Z',
      'GET',
      '/api/v5/account/balance',
      '',
    );
    expect(sig).toMatch(/^[A-Za-z0-9+/]+=*$/);
    expect(sig).not.toMatch(/^[0-9a-f]+$/);
  });

  it('produces different signatures for different secrets', () => {
    const a = OkxSigner.sign(
      { apiKey: 'K', apiSecret: 'A', passphrase: 'P' },
      'ts',
      'GET',
      '/path',
      '',
    );
    const b = OkxSigner.sign(
      { apiKey: 'K', apiSecret: 'B', passphrase: 'P' },
      'ts',
      'GET',
      '/path',
      '',
    );
    expect(a).not.toBe(b);
  });

  it('formats timestamp as ISO-8601 with milliseconds and Z suffix', () => {
    const ts = OkxSigner.formatTimestamp(1_700_000_000_000);
    expect(ts).toBe(new Date(1_700_000_000_000).toISOString());
    expect(ts).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  it('cannot be instantiated with new', () => {
    expectNotConstructable(OkxSigner, /static class/);
  });
});
