[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicFuturesMarket.getKline`

> `GET /api/v5/market/candles` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-candlesticks)

## Signature

```ts
static getKline(
  ctx: OkxContext,
  params: GetFuturesKlineParams,
): Promise<GetFuturesKlineResult>
```

## Parameters

| Field    | Type   | Required | Описание                     |
| -------- | ------ | :------: | ---------------------------- |
| `instId` | string |   yes    | Например, `'BTC-USD-241227'` |
| `bar`    | `Bar`  |    no    | По умолчанию `'1m'`          |
| `before` | number |    no    | Pagination ts (ms)           |
| `after`  | number |    no    | Pagination ts (ms)           |
| `limit`  | number |    no    | 1..300                       |

## Response

`GetFuturesKlineResult = OkxCandle[]` — формат идентичен [Spot/Swap getKline](../swap/getKline.md). Объёмы указаны в контрактах.

## Example

```ts
import { OkxPublicFuturesMarket } from 'rock-clients';

const candles = await OkxPublicFuturesMarket.getKline(
  {},
  {
    instId: 'BTC-USD-241227',
    bar: '4H',
    limit: 100,
  },
);
console.log(candles.length);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
