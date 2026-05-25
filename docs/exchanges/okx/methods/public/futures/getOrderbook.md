[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicFuturesMarket.getOrderbook`

> `GET /api/v5/market/books` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-order-book)

## Signature

```ts
static getOrderbook(
  ctx: OkxContext,
  params: GetFuturesOrderbookParams,
): Promise<GetFuturesOrderbookResult>
```

## Parameters

| Field    | Type   | Required | Описание                       |
| -------- | ------ | :------: | ------------------------------ |
| `instId` | string |   yes    | Например, `'BTC-USD-241227'`   |
| `sz`     | number |    no    | Глубина 1..400, по умолчанию 1 |

## Response

`GetFuturesOrderbookResult = OkxOrderbookSnapshot[]` — массив длиной 1. Размер указывается в **контрактах**.

## Example

```ts
import { OkxPublicFuturesMarket } from 'rock-clients';

const [snap] = await OkxPublicFuturesMarket.getOrderbook(
  {},
  {
    instId: 'BTC-USD-241227',
    sz: 100,
  },
);
console.log(snap?.bids.length, snap?.asks.length);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
