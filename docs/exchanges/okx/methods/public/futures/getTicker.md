[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicFuturesMarket.getTicker`

> `GET /api/v5/market/ticker` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-ticker)

## Signature

```ts
static getTicker(
  ctx: OkxContext,
  params: GetFuturesTickerParams,
): Promise<GetFuturesTickerResult>
```

## Parameters

| Field    | Type   | Required | Описание                     |
| -------- | ------ | :------: | ---------------------------- |
| `instId` | string |   yes    | Например, `'BTC-USD-241227'` |

## Response

`GetFuturesTickerResult = FuturesTicker[]` — массив длиной 1.

## Example

```ts
import { OkxPublicFuturesMarket } from 'rock-clients';

const [t] = await OkxPublicFuturesMarket.getTicker({}, { instId: 'BTC-USD-241227' });
console.log(t?.last);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
