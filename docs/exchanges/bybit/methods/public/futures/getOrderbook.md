[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicFuturesMarket.getOrderbook`

> `GET /v5/market/orderbook?category=linear|inverse` · Public · No auth.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/orderbook)

## Signature

```ts
static getOrderbook(
  ctx: BybitContext,
  params: GetFuturesOrderbookParams,
): Promise<GetFuturesOrderbookResult>
```

## Parameters

| Поле       | Тип                     | Обяз. | Описание                                 |
| ---------- | ----------------------- | ----- | ---------------------------------------- |
| `category` | `'linear' \| 'inverse'` | Да    | Тип фьючерса.                            |
| `symbol`   | `string`                | Да    | Тикер.                                   |
| `limit`    | `number`                | Нет   | linear/inverse: 1..500. По умолчанию 25. |

## Response

```ts
interface GetFuturesOrderbookResult {
  s: string; // symbol
  b: OrderbookLevel[]; // bids
  a: OrderbookLevel[]; // asks
  ts: number; // ms timestamp
  u: number; // update id
  seq?: number; // sequence id (linear/inverse)
  cts?: number; // matching engine timestamp, ms
}

type OrderbookLevel = readonly [price: string, size: string];
```

## Example

```ts
import { BybitPublicFuturesMarket } from 'rock-clients';

const ob = await BybitPublicFuturesMarket.getOrderbook(
  {},
  { category: 'linear', symbol: 'BTCUSDT', limit: 200 },
);
console.log(ob.b.length, ob.a.length);
```

## Errors

| Класс ошибки        | Когда                                                      |
| ------------------- | ---------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0`                               |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope |

## Related

- Spot-аналог: [`BybitPublicSpotMarket.getOrderbook`](../spot/getOrderbook.md).

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpublicfuturesmarketgetorderbook)
