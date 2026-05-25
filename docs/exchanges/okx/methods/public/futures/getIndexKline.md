[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicFuturesMarket.getIndexKline`

> `GET /api/v5/market/index-candles` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-index-candlesticks)

Свечи **индексной цены**. `instId` — index code (например, `'BTC-USD'`), не контракт.

## Signature

```ts
static getIndexKline(
  ctx: OkxContext,
  params: GetFuturesIndexKlineParams,
): Promise<GetFuturesIndexKlineResult>
```

## Parameters

| Field    | Type   | Required | Описание                         |
| -------- | ------ | :------: | -------------------------------- |
| `instId` | string |   yes    | Index code, например `'BTC-USD'` |
| `bar`    | `Bar`  |    no    | По умолчанию `'1m'`              |
| `before` | number |    no    | Pagination, ms                   |
| `after`  | number |    no    | Pagination, ms                   |
| `limit`  | number |    no    | 1..100                           |

## Response

`GetFuturesIndexKlineResult = OkxPriceCandle[]` — 6-полевые свечи без объёмов.

## Example

```ts
import { OkxPublicFuturesMarket } from 'rock-clients';

const idx = await OkxPublicFuturesMarket.getIndexKline({}, { instId: 'BTC-USD', bar: '1D' });
console.log(idx[0]);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
