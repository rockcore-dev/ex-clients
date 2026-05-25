[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicFuturesMarket.getHistoryKline`

> `GET /api/v5/market/history-candles` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-candlesticks-history)

## Signature

```ts
static getHistoryKline(
  ctx: OkxContext,
  params: GetFuturesHistoryKlineParams,
): Promise<GetFuturesHistoryKlineResult>
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

`GetFuturesHistoryKlineResult = OkxCandle[]` — формат идентичен [`getKline`](getKline.md).

## Example

```ts
import { OkxPublicFuturesMarket } from 'rock-clients';

const candles = await OkxPublicFuturesMarket.getHistoryKline(
  {},
  {
    instId: 'BTC-USD-241227',
    bar: '1D',
    limit: 100,
  },
);
console.log(candles.length);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
