[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSwapMarket.getOrderbook`

> `GET /api/v5/market/books` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-order-book)

## Signature

```ts
static getOrderbook(
  ctx: OkxContext,
  params: GetSwapOrderbookParams,
): Promise<GetSwapOrderbookResult>
```

## Parameters

| Field    | Type   | Required | Описание                       |
| -------- | ------ | :------: | ------------------------------ |
| `instId` | string |   yes    | Например, `'BTC-USDT-SWAP'`    |
| `sz`     | number |    no    | Глубина 1..400, по умолчанию 1 |

## Response

```ts
type GetSwapOrderbookResult = OkxOrderbookSnapshot[]; // массив длиной 1
```

Уровни — `[price, size, liquidatedOrders, numOrders]`. У SWAP/FUTURES размер `size` указывается в **контрактах**, не в base-валюте.

## Example

```ts
import { OkxPublicSwapMarket } from 'rock-clients';

const [snap] = await OkxPublicSwapMarket.getOrderbook({}, { instId: 'BTC-USDT-SWAP', sz: 50 });
console.log(snap?.bids[0], snap?.asks[0]);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
