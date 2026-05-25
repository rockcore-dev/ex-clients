[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSwapMarket.getIndexKline`

> `GET /api/v5/market/index-candles` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-index-candlesticks)

Свечи **индексной цены**. Здесь `instId` — это индекс-код (например, `'BTC-USDT'` — индекс пары BTC/USDT, **не** контракт `'BTC-USDT-SWAP'`).

## Signature

```ts
static getIndexKline(
  ctx: OkxContext,
  params: GetSwapIndexKlineParams,
): Promise<GetSwapIndexKlineResult>
```

## Parameters

| Field    | Type   | Required | Описание                          |
| -------- | ------ | :------: | --------------------------------- |
| `instId` | string |   yes    | Index code, например `'BTC-USDT'` |
| `bar`    | `Bar`  |    no    | По умолчанию `'1m'`               |
| `before` | number |    no    | Pagination, ms                    |
| `after`  | number |    no    | Pagination, ms                    |
| `limit`  | number |    no    | 1..100                            |

## Response

```ts
type GetSwapIndexKlineResult = OkxPriceCandle[];
type OkxPriceCandle = readonly [
  ts: string,
  o: string,
  h: string,
  l: string,
  c: string,
  confirm: string,
];
```

(6 полей — без объёмов.)

## Example

```ts
import { OkxPublicSwapMarket } from 'rock-clients';

const idx = await OkxPublicSwapMarket.getIndexKline({}, { instId: 'BTC-USDT', bar: '1H' });
console.log(idx[0]);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
