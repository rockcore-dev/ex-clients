[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSpotMarket.getOrderbook`

> `GET /api/v5/market/books` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-order-book)

## Signature

```ts
static getOrderbook(
  ctx: OkxContext,
  params: GetSpotOrderbookParams,
): Promise<GetSpotOrderbookResult>
```

## Parameters

| Field    | Type   | Required | Описание                                |
| -------- | ------ | :------: | --------------------------------------- |
| `instId` | string |   yes    | Например, `'BTC-USDT'`                  |
| `sz`     | number |    no    | Глубина стакана, 1..400. По умолчанию 1 |

## Response

```ts
type GetSpotOrderbookResult = OkxOrderbookSnapshot[]; // массив длиной 1

interface OkxOrderbookSnapshot {
  asks: OkxOrderbookLevel[]; // от меньшей цены к большей
  bids: OkxOrderbookLevel[]; // от большей цены к меньшей
  ts: string; // ms
}

type OkxOrderbookLevel = readonly [
  price: string,
  size: string,
  liquidatedOrders: string,
  numOrders: string,
];
```

## Example

```ts
import { OkxPublicSpotMarket } from 'rock-clients';

const [snap] = await OkxPublicSpotMarket.getOrderbook({}, { instId: 'BTC-USDT', sz: 50 });
const bestBid = snap?.bids[0]?.[0];
const bestAsk = snap?.asks[0]?.[0];
console.log({ bestBid, bestAsk });
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
