[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicFuturesMarket.getMarkPriceKline`

> `GET /api/v5/market/mark-price-candles` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-mark-price-candlesticks)

Свечи mark-price для futures-контракта.

## Signature

```ts
static getMarkPriceKline(
  ctx: OkxContext,
  params: GetFuturesMarkPriceKlineParams,
): Promise<GetFuturesMarkPriceKlineResult>
```

## Parameters

| Field    | Type   | Required | Описание                     |
| -------- | ------ | :------: | ---------------------------- |
| `instId` | string |   yes    | Например, `'BTC-USD-241227'` |
| `bar`    | `Bar`  |    no    | По умолчанию `'1m'`          |
| `before` | number |    no    | Pagination, ms               |
| `after`  | number |    no    | Pagination, ms               |
| `limit`  | number |    no    | 1..100                       |

## Response

`GetFuturesMarkPriceKlineResult = OkxPriceCandle[]` — 6-полевые свечи.

## Example

```ts
import { OkxPublicFuturesMarket } from 'rock-clients';

const mp = await OkxPublicFuturesMarket.getMarkPriceKline(
  {},
  {
    instId: 'BTC-USD-241227',
    bar: '15m',
  },
);
console.log(mp.at(-1));
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
