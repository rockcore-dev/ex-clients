import { describe, expect, it } from 'vitest';

import { OkxPublicCommon } from '../../../../src/index.js';

/**
 * Smoke-тест против live OKX REST. Не требует ключей. Проверяет, что:
 *
 * 1. Базовый URL и envelope работают.
 * 2. Сервер действительно отдаёт `{ ts }` в массиве из 1 элемента.
 * 3. `ts` парсится в текущее время в разумных пределах (±5 минут).
 *
 * `vitest.config.integration.ts` (или скрипт `test:integration`) запускает
 * этот файл отдельно от unit-тестов, чтобы избежать сетевой нестабильности
 * в основном CI-прогоне.
 */
describe('OKX live — public', () => {
  it('GET /api/v5/public/time returns a parseable server time', async () => {
    const data = await OkxPublicCommon.getSystemTime();

    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(1);
    const [item] = data;
    expect(item).toBeDefined();
    if (item === undefined) return;
    expect(typeof item.ts).toBe('string');
    expect(item.ts).toMatch(/^\d+$/);

    const ms = Number.parseInt(item.ts, 10);
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    expect(ms).toBeGreaterThan(now - fiveMinutes);
    expect(ms).toBeLessThan(now + fiveMinutes);
  });
});
