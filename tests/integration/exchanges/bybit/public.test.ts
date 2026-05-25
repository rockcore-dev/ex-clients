import { describe, expect, it } from 'vitest';

import { BybitPublicCommon } from '../../../../src/index.js';
import { BYBIT_TESTNET_ENV } from '../../setup.js';

describe('Bybit testnet — public', () => {
  it('GET /v5/market/time returns a parseable server time', async () => {
    const result = await BybitPublicCommon.getServerTime({ env: BYBIT_TESTNET_ENV });
    console.log(result);

    expect(typeof result.timeSecond).toBe('string');
    expect(typeof result.timeNano).toBe('string');
    expect(result.timeSecond).toMatch(/^\d+$/);
    expect(result.timeNano).toMatch(/^\d+$/);

    const seconds = Number.parseInt(result.timeSecond, 10);
    const yearInSeconds = 60 * 60 * 24 * 365;
    const epoch2020 = 1_577_836_800;
    const nowPlusOneYear = Math.floor(Date.now() / 1000) + yearInSeconds;
    expect(seconds).toBeGreaterThan(epoch2020);
    expect(seconds).toBeLessThan(nowPlusOneYear);
  });
});
