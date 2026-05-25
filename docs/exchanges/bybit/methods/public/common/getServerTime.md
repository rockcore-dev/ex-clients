[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicCommon.getServerTime`

> `GET /v5/market/time` · Public · No auth · No category.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/time)

## Signature

```ts
static getServerTime(ctx?: BybitContext): Promise<GetServerTimeResult>
```

## Parameters

Запрос: параметров нет. Используется только `ctx`.

| `ctx` поле | Тип                      | По умолчанию         | Описание                                |
| ---------- | ------------------------ | -------------------- | --------------------------------------- |
| `env`      | `'mainnet' \| 'testnet'` | `'mainnet'`          | Какое окружение Bybit использовать      |
| `baseUrl`  | `string`                 | вычисляется из `env` | Прямое переопределение базового URL     |
| `fetch`    | `typeof fetch`           | `globalThis.fetch`   | Подмена `fetch` (используется в тестах) |

`credentials` и `recvWindow` игнорируются — публичная ручка без подписи.

## Response

```ts
interface GetServerTimeResult {
  timeSecond: string;
  timeNano: string;
}
```

| Field        | Type   | Описание                                                  |
| ------------ | ------ | --------------------------------------------------------- |
| `timeSecond` | string | Серверное время Bybit в секундах. String-encoded int.     |
| `timeNano`   | string | Серверное время Bybit в наносекундах. String-encoded int. |

> Числовые поля приходят строками — это поведение Bybit v5. Библиотека не парсит их в `number`, чтобы не терять точность.

## Example — mainnet

```ts
import { BybitPublicCommon } from 'rock-clients';

const t = await BybitPublicCommon.getServerTime();
console.log(t.timeSecond, t.timeNano);
// '1700000000' '1700000000000000000'
```

## Example — testnet

```ts
import { Bybit } from 'rock-clients';

const t = await Bybit.public.common.getServerTime({ env: 'testnet' });
console.log(new Date(Number(t.timeSecond) * 1000).toISOString());
```

## Example — sync check

```ts
import { BybitPublicCommon } from 'rock-clients';

const bybit = await BybitPublicCommon.getServerTime({ env: 'testnet' });
const local = Math.floor(Date.now() / 1000);
const drift = local - Number(bybit.timeSecond);

if (Math.abs(drift) > 5) {
  console.warn(`Local clock differs from Bybit by ${drift}s — signed requests may fail`);
}
```

## Errors

| Класс ошибки        | Когда                                                               |
| ------------------- | ------------------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0` (крайне маловероятно для этого метода) |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope          |

## Related

- Группа [Market (public)](../../../coverage.md#market-public).
- Архитектура: [docs/architecture.md](../../../../architecture.md).
- Лендинг биржи: [docs/exchanges/bybit/README.md](../../../README.md).

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpubliccommongetservertime)
