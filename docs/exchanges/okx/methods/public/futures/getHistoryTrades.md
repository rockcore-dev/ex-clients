[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicFuturesMarket.getHistoryTrades`

> `GET /api/v5/market/history-trades` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-trades-history)

## Signature

```ts
static getHistoryTrades(
  ctx: OkxContext,
  params: GetFuturesHistoryTradesParams,
): Promise<GetFuturesHistoryTradesResult>
```

## Parameters

| Field    | Type         | Required | Описание                     |
| -------- | ------------ | :------: | ---------------------------- |
| `instId` | string       |   yes    | Например, `'BTC-USD-241227'` |
| `type`   | `'1' \| '2'` |    no    | Pagination type              |
| `before` | string       |    no    | Курсор                       |
| `after`  | string       |    no    | Курсор                       |
| `limit`  | number       |    no    | 1..100                       |

## Response

`GetFuturesHistoryTradesResult = FuturesPublicTrade[]` — формат идентичен [`getRecentTrades`](getRecentTrades.md).

## Example

```ts
import { OkxPublicFuturesMarket } from 'rock-clients';

const trades = await OkxPublicFuturesMarket.getHistoryTrades(
  {},
  {
    instId: 'BTC-USD-241227',
    type: '2',
    limit: 100,
  },
);
console.log(trades.length);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
