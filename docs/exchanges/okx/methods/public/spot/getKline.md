[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSpotMarket.getKline`

> `GET /api/v5/market/candles` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-candlesticks)

## Signature

```ts
static getKline(
  ctx: OkxContext,
  params: GetSpotKlineParams,
): Promise<GetSpotKlineResult>
```

## Parameters

| Field    | Type   | Required | Описание                                                 |
| -------- | ------ | :------: | -------------------------------------------------------- |
| `instId` | string |   yes    | Например, `'BTC-USDT'`                                   |
| `bar`    | `Bar`  |    no    | `'1m'`, `'15m'`, `'1H'`, `'1D'`, ... По умолчанию `'1m'` |
| `before` | number |    no    | Pagination: ts (ms), записи **до** этого времени         |
| `after`  | number |    no    | Pagination: ts (ms), записи **после** этого времени      |
| `limit`  | number |    no    | 1..300, по умолчанию 100                                 |

## Response

```ts
type GetSpotKlineResult = OkxCandle[];
type OkxCandle = readonly [
  ts: string,
  o: string,
  h: string,
  l: string,
  c: string,
  vol: string,
  volCcy: string,
  volCcyQuote: string,
  confirm: string,
];
```

## Example

```ts
import { OkxPublicSpotMarket } from 'rock-clients';

const candles = await OkxPublicSpotMarket.getKline(
  {},
  {
    instId: 'BTC-USDT',
    bar: '1H',
    limit: 50,
  },
);

const closed = candles.filter((c) => c[8] === '1');
console.log(closed.length);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
