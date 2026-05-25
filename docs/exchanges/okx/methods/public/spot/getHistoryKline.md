[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSpotMarket.getHistoryKline`

> `GET /api/v5/market/history-candles` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-candlesticks-history)

Расширенная история свечей (за пределами окна `getKline`).

## Signature

```ts
static getHistoryKline(
  ctx: OkxContext,
  params: GetSpotHistoryKlineParams,
): Promise<GetSpotHistoryKlineResult>
```

## Parameters

| Field    | Type   | Required | Описание                 |
| -------- | ------ | :------: | ------------------------ |
| `instId` | string |   yes    | Например, `'BTC-USDT'`   |
| `bar`    | `Bar`  |    no    | По умолчанию `'1m'`      |
| `before` | number |    no    | Pagination, ms           |
| `after`  | number |    no    | Pagination, ms           |
| `limit`  | number |    no    | 1..100, по умолчанию 100 |

## Response

`GetSpotHistoryKlineResult = OkxCandle[]` — формат идентичен [`getKline`](getKline.md).

## Example

```ts
import { OkxPublicSpotMarket } from 'rock-clients';

const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
const candles = await OkxPublicSpotMarket.getHistoryKline(
  {},
  {
    instId: 'BTC-USDT',
    bar: '1H',
    after: oneDayAgo,
  },
);
console.log(candles.length);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
