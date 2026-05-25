[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSwapMarket.getTickers`

> `GET /api/v5/market/tickers` (с `instType=SWAP`) · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-tickers)

## Signature

```ts
static getTickers(
  ctx: OkxContext,
  params?: GetSwapTickersParams,
): Promise<GetSwapTickersResult>
```

## Parameters

| Field        | Type   | Required | Описание             |
| ------------ | ------ | :------: | -------------------- |
| `uly`        | string |    no    | Фильтр по underlying |
| `instFamily` | string |    no    | Фильтр по семейству  |

`instType=SWAP` подставляется автоматически.

## Response

`GetSwapTickersResult = SwapTicker[]` — те же поля, что у спот-тикера, только `instType: 'SWAP'`.

## Example

```ts
import { OkxPublicSwapMarket } from 'rock-clients';

const tickers = await OkxPublicSwapMarket.getTickers({});
const btc = tickers.find((t) => t.instId === 'BTC-USDT-SWAP');
console.log(btc?.last, btc?.vol24h);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
