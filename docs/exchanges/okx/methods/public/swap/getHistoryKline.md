[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSwapMarket.getHistoryKline`

> `GET /api/v5/market/history-candles` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-candlesticks-history)

## Signature

```ts
static getHistoryKline(
  ctx: OkxContext,
  params: GetSwapHistoryKlineParams,
): Promise<GetSwapHistoryKlineResult>
```

## Parameters

| Field    | Type   | Required | Описание                    |
| -------- | ------ | :------: | --------------------------- |
| `instId` | string |   yes    | Например, `'BTC-USDT-SWAP'` |
| `bar`    | `Bar`  |    no    | По умолчанию `'1m'`         |
| `before` | number |    no    | Pagination, ms              |
| `after`  | number |    no    | Pagination, ms              |
| `limit`  | number |    no    | 1..100, по умолчанию 100    |

## Response

`GetSwapHistoryKlineResult = OkxCandle[]` — формат идентичен [`getKline`](getKline.md).

## Example

```ts
import { OkxPublicSwapMarket } from 'rock-clients';

const candles = await OkxPublicSwapMarket.getHistoryKline(
  {},
  {
    instId: 'BTC-USDT-SWAP',
    bar: '1H',
    before: Date.now(),
    limit: 100,
  },
);
console.log(candles.length);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
