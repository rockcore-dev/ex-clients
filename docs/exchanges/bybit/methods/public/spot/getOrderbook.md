[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicSpotMarket.getOrderbook`

> `GET /v5/market/orderbook?category=spot` · Public · No auth.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/orderbook)

## Signature

```ts
static getOrderbook(
  ctx: BybitContext,
  params: GetSpotOrderbookParams,
): Promise<GetSpotOrderbookResult>
```

## Parameters

| Поле     | Тип      | Обяз. | Описание                                       |
| -------- | -------- | ----- | ---------------------------------------------- |
| `symbol` | `string` | Да    | Тикер инструмента, например `'BTCUSDT'`.       |
| `limit`  | `number` | Нет   | Глубина стакана. spot: 1..200. По умолчанию 1. |

## Response

```ts
interface GetSpotOrderbookResult {
  s: string; // symbol
  b: OrderbookLevel[]; // bids
  a: OrderbookLevel[]; // asks
  ts: number; // timestamp ms
  u: number; // update id
}

type OrderbookLevel = readonly [price: string, size: string];
```

> Поля короткие (`s`, `b`, `a`, `ts`, `u`) — это формат Bybit, библиотека его не переименовывает.

## Example

```ts
import { BybitPublicSpotMarket } from 'rock-clients';

const ob = await BybitPublicSpotMarket.getOrderbook(
  { env: 'testnet' },
  { symbol: 'BTCUSDT', limit: 50 },
);
console.log('top bid:', ob.b[0]);
console.log('top ask:', ob.a[0]);
```

## Errors

| Класс ошибки        | Когда                                                      |
| ------------------- | ---------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0`                               |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope |

## Related

- Группа [Market (public)](../../../coverage.md#market-public).
- Futures-аналог: [`BybitPublicFuturesMarket.getOrderbook`](../futures/getOrderbook.md).

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpublicspotmarketgetorderbook)
