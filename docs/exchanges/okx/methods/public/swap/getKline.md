[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSwapMarket.getKline`

> `GET /api/v5/market/candles` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-candlesticks)

## Signature

```ts
static getKline(
  ctx: OkxContext,
  params: GetSwapKlineParams,
): Promise<GetSwapKlineResult>
```

## Parameters

| Field    | Type   | Required | Описание                    |
| -------- | ------ | :------: | --------------------------- |
| `instId` | string |   yes    | Например, `'BTC-USDT-SWAP'` |
| `bar`    | `Bar`  |    no    | По умолчанию `'1m'`         |
| `before` | number |    no    | Pagination ts (ms)          |
| `after`  | number |    no    | Pagination ts (ms)          |
| `limit`  | number |    no    | 1..300, по умолчанию 100    |

## Response

`GetSwapKlineResult = OkxCandle[]` — 9-полевые свечи. У SWAP `vol` — в контрактах, `volCcy` — в base-валюте, `volCcyQuote` — в quote-валюте.

## Example

```ts
import { OkxPublicSwapMarket } from 'rock-clients';

const candles = await OkxPublicSwapMarket.getKline(
  {},
  {
    instId: 'BTC-USDT-SWAP',
    bar: '15m',
    limit: 100,
  },
);
console.log(candles[0]);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
