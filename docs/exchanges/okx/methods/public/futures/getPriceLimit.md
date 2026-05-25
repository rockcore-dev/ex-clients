[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicFuturesMarket.getPriceLimit`

> `GET /api/v5/public/price-limit` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-limit-price)

## Signature

```ts
static getPriceLimit(
  ctx: OkxContext,
  params: GetFuturesPriceLimitParams,
): Promise<GetFuturesPriceLimitResult>
```

## Parameters

| Field    | Type   | Required | Описание                     |
| -------- | ------ | :------: | ---------------------------- |
| `instId` | string |   yes    | Например, `'BTC-USD-241227'` |

## Response

```ts
interface FuturesPriceLimitItem {
  instType: 'FUTURES';
  instId: string;
  buyLmt: string;
  sellLmt: string;
  ts: string;
  enabled?: boolean;
}
```

## Example

```ts
import { OkxPublicFuturesMarket } from 'rock-clients';

const [pl] = await OkxPublicFuturesMarket.getPriceLimit({}, { instId: 'BTC-USD-241227' });
console.log(pl?.buyLmt, pl?.sellLmt);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
