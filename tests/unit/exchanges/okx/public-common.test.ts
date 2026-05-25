import { describe, expect, it } from 'vitest';

import { OkxPublicCommon } from '../../../../src/index.js';
import { makeOkxOkFetch } from './_helpers.js';

describe('OkxPublicCommon.getSystemTime', () => {
  it('GET /api/v5/public/time without query params', async () => {
    const { fetchImpl, captured } = makeOkxOkFetch([{ ts: '1597026383085' }]);
    const data = await OkxPublicCommon.getSystemTime({ fetch: fetchImpl });
    expect(captured.method).toBe('GET');
    expect(captured.path).toBe('/api/v5/public/time');
    expect(captured.query).toEqual({});
    expect(data).toEqual([{ ts: '1597026383085' }]);
  });

  it('works with no ctx argument (default {})', async () => {
    const { fetchImpl, captured } = makeOkxOkFetch([{ ts: '1' }]);
    await OkxPublicCommon.getSystemTime({ fetch: fetchImpl });
    expect(captured.path).toBe('/api/v5/public/time');
  });
});
