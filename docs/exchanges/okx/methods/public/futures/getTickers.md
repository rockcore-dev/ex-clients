[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicFuturesMarket.getTickers`

> `GET /api/v5/market/tickers` (с `instType=FUTURES`) · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-tickers)

## Signature

```ts
static getTickers(
  ctx: OkxContext,
  params?: GetFuturesTickersParams,
): Promise<GetFuturesTickersResult>
```

## Parameters

| Field        | Type   | Required | Описание             |
| ------------ | ------ | :------: | -------------------- |
| `uly`        | string |    no    | Фильтр по underlying |
| `instFamily` | string |    no    | Фильтр по семейству  |

## Response

`GetFuturesTickersResult = FuturesTicker[]` — те же поля, что у спот-тикера, только `instType: 'FUTURES'`.

## Example

```ts
import { OkxPublicFuturesMarket } from 'rock-clients';

const tickers = await OkxPublicFuturesMarket.getTickers({}, { uly: 'BTC-USD' });
console.log(tickers.map((t) => t.instId));
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
