[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSpotMarket.getRecentTrades`

> `GET /api/v5/market/trades` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-trades)

## Signature

```ts
static getRecentTrades(
  ctx: OkxContext,
  params: GetSpotRecentTradesParams,
): Promise<GetSpotRecentTradesResult>
```

## Parameters

| Field    | Type   | Required | Описание                 |
| -------- | ------ | :------: | ------------------------ |
| `instId` | string |   yes    | Например, `'BTC-USDT'`   |
| `limit`  | number |    no    | 1..500, по умолчанию 100 |

## Response

```ts
type GetSpotRecentTradesResult = SpotPublicTrade[];

interface SpotPublicTrade {
  instId: string;
  tradeId: string;
  px: string;
  sz: string;
  side: 'buy' | 'sell';
  ts: string; // ms
}
```

## Example

```ts
import { OkxPublicSpotMarket } from 'rock-clients';

const trades = await OkxPublicSpotMarket.getRecentTrades({}, { instId: 'BTC-USDT', limit: 50 });
const lastBuy = trades.find((t) => t.side === 'buy');
console.log(lastBuy?.px, lastBuy?.sz);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
