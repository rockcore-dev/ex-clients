[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSwapMarket.getRecentTrades`

> `GET /api/v5/market/trades` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-trades)

## Signature

```ts
static getRecentTrades(
  ctx: OkxContext,
  params: GetSwapRecentTradesParams,
): Promise<GetSwapRecentTradesResult>
```

## Parameters

| Field    | Type   | Required | Описание                    |
| -------- | ------ | :------: | --------------------------- |
| `instId` | string |   yes    | Например, `'BTC-USDT-SWAP'` |
| `limit`  | number |    no    | 1..500, по умолчанию 100    |

## Response

`GetSwapRecentTradesResult = SwapPublicTrade[]` — `{ instId, tradeId, px, sz, side, ts }`. У SWAP `sz` — в контрактах.

## Example

```ts
import { OkxPublicSwapMarket } from 'rock-clients';

const trades = await OkxPublicSwapMarket.getRecentTrades({}, { instId: 'BTC-USDT-SWAP' });
console.log(trades[0]);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
