[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicFuturesMarket.getRecentTrades`

> `GET /api/v5/market/trades` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-trades)

## Signature

```ts
static getRecentTrades(
  ctx: OkxContext,
  params: GetFuturesRecentTradesParams,
): Promise<GetFuturesRecentTradesResult>
```

## Parameters

| Field    | Type   | Required | Описание                     |
| -------- | ------ | :------: | ---------------------------- |
| `instId` | string |   yes    | Например, `'BTC-USD-241227'` |
| `limit`  | number |    no    | 1..500, по умолчанию 100     |

## Response

`GetFuturesRecentTradesResult = FuturesPublicTrade[]` — `{ instId, tradeId, px, sz, side, ts }`. Размер `sz` — в контрактах.

## Example

```ts
import { OkxPublicFuturesMarket } from 'rock-clients';

const trades = await OkxPublicFuturesMarket.getRecentTrades(
  {},
  {
    instId: 'BTC-USD-241227',
  },
);
console.log(trades.length);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
