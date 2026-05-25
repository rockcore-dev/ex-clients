[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSwapMarket.getHistoryTrades`

> `GET /api/v5/market/history-trades` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-trades-history)

## Signature

```ts
static getHistoryTrades(
  ctx: OkxContext,
  params: GetSwapHistoryTradesParams,
): Promise<GetSwapHistoryTradesResult>
```

## Parameters

| Field    | Type         | Required | Описание                                 |
| -------- | ------------ | :------: | ---------------------------------------- |
| `instId` | string       |   yes    | Например, `'BTC-USDT-SWAP'`              |
| `type`   | `'1' \| '2'` |    no    | Pagination type: `1` — tradeId, `2` — ts |
| `before` | string       |    no    | Курсор                                   |
| `after`  | string       |    no    | Курсор                                   |
| `limit`  | number       |    no    | 1..100                                   |

## Response

`GetSwapHistoryTradesResult = SwapPublicTrade[]` — формат идентичен [`getRecentTrades`](getRecentTrades.md).

## Example

```ts
import { OkxPublicSwapMarket } from 'rock-clients';

const trades = await OkxPublicSwapMarket.getHistoryTrades(
  {},
  {
    instId: 'BTC-USDT-SWAP',
    type: '1',
    limit: 100,
  },
);
console.log(trades.length);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
