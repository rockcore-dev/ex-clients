import { createHmac } from 'node:crypto';

import { describe, expect, it } from 'vitest';

import { BybitSigner } from '../../../../src/lib/exchanges/bybit/http/signer.js';
import { expectNotConstructable } from './_helpers.js';

describe('BybitSigner', () => {
  it('produces the documented HMAC-SHA256 over (timestamp + apiKey + recvWindow + payload)', () => {
    const credentials = { apiKey: 'TEST_KEY', apiSecret: 'TEST_SECRET' };
    const recvWindow = 5000;
    const timestamp = 1_700_000_000_000;
    const payload = 'category=spot&symbol=BTCUSDT';

    const expected = createHmac('sha256', credentials.apiSecret)
      .update(`${String(timestamp)}${credentials.apiKey}${String(recvWindow)}${payload}`)
      .digest('hex');

    expect(BybitSigner.sign(credentials, recvWindow, timestamp, payload)).toBe(expected);
  });

  it('produces different signatures for different secrets', () => {
    const a = BybitSigner.sign({ apiKey: 'K', apiSecret: 'A' }, 5000, 1, 'x');
    const b = BybitSigner.sign({ apiKey: 'K', apiSecret: 'B' }, 5000, 1, 'x');
    expect(a).not.toBe(b);
  });

  it('returns a 64-character lowercase hex string', () => {
    const sig = BybitSigner.sign({ apiKey: 'K', apiSecret: 'S' }, 5000, 1, '');
    expect(sig).toMatch(/^[0-9a-f]{64}$/);
  });

  it('cannot be instantiated with new', () => {
    expectNotConstructable(BybitSigner, /static class/);
  });
});
