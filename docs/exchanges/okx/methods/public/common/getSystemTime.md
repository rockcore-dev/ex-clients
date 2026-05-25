[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicCommon.getSystemTime`

> `GET /api/v5/public/time` · Public · No auth · No instType.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-system-time)

## Signature

```ts
static getSystemTime(ctx?: OkxContext): Promise<GetSystemTimeResult>
```

## Parameters

Запрос: параметров нет. Используется только `ctx`.

| `ctx` поле | Тип                | По умолчанию          | Описание                                |
| ---------- | ------------------ | --------------------- | --------------------------------------- |
| `env`      | `'live' \| 'demo'` | `'live'`              | Окружение OKX (демо включает заголовок) |
| `baseUrl`  | `string`           | `https://www.okx.com` | Прямое переопределение базового URL     |
| `fetch`    | `typeof fetch`     | `globalThis.fetch`    | Подмена `fetch` (используется в тестах) |

`credentials` игнорируются — публичная ручка без подписи.

## Response

```ts
type GetSystemTimeResult = OkxSystemTimeItem[];

interface OkxSystemTimeItem {
  ts: string;
}
```

OKX всегда заворачивает ответ в массив; для `getSystemTime` он содержит ровно один элемент.

| Field | Type   | Описание                                             |
| ----- | ------ | ---------------------------------------------------- |
| `ts`  | string | Серверное время в миллисекундах. String-encoded int. |

## Example — live

```ts
import { OkxPublicCommon } from 'rock-clients';

const [{ ts }] = await OkxPublicCommon.getSystemTime();
console.log(new Date(Number(ts)).toISOString());
```

## Example — demo

```ts
import { Okx } from 'rock-clients';

const [{ ts }] = await Okx.public.common.getSystemTime({ env: 'demo' });
console.log(ts);
```

## Example — sync check

```ts
import { OkxPublicCommon } from 'rock-clients';

const [{ ts }] = await OkxPublicCommon.getSystemTime();
const local = Date.now();
const drift = local - Number(ts);

if (Math.abs(drift) > 5_000) {
  console.warn(`Local clock differs from OKX by ${drift}ms — signed requests may fail`);
}
```

## Errors

| Класс ошибки      | Когда                                                            |
| ----------------- | ---------------------------------------------------------------- |
| `OkxApiError`     | OKX вернул `code !== '0'` (крайне маловероятно для этого метода) |
| `OkxNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope       |

## Related

- Группа [Public · Common](../../../coverage.md#public--common).
- Архитектура: [docs/architecture.md](../../../../architecture.md).
- Лендинг биржи: [docs/exchanges/okx/README.md](../../../README.md).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#okxpubliccommongetsystemtime)
