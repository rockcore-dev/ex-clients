[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSwapMarket.getMarkPriceKline`

> `GET /api/v5/market/mark-price-candles` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-mark-price-candlesticks)

Свечи **mark-price** (использующейся для UPL и расчёта ликвидаций).

## Signature

```ts
static getMarkPriceKline(
  ctx: OkxContext,
  params: GetSwapMarkPriceKlineParams,
): Promise<GetSwapMarkPriceKlineResult>
```

## Parameters

| Field    | Type   | Required | Описание                             |
| -------- | ------ | :------: | ------------------------------------ |
| `instId` | string |   yes    | Контракт, например `'BTC-USDT-SWAP'` |
| `bar`    | `Bar`  |    no    | По умолчанию `'1m'`                  |
| `before` | number |    no    | Pagination, ms                       |
| `after`  | number |    no    | Pagination, ms                       |
| `limit`  | number |    no    | 1..100                               |

## Response

`GetSwapMarkPriceKlineResult = OkxPriceCandle[]` — 6-полевые свечи (см. [`getIndexKline`](getIndexKline.md)).

## Example

```ts
import { OkxPublicSwapMarket } from 'rock-clients';

const mark = await OkxPublicSwapMarket.getMarkPriceKline(
  {},
  {
    instId: 'BTC-USDT-SWAP',
    bar: '15m',
  },
);
console.log(mark.at(-1));
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
