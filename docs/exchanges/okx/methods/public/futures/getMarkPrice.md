[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicFuturesMarket.getMarkPrice`

> `GET /api/v5/public/mark-price` (с `instType=FUTURES`) · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-mark-price)

## Signature

```ts
static getMarkPrice(
  ctx: OkxContext,
  params?: GetFuturesMarkPriceParams,
): Promise<GetFuturesMarkPriceResult>
```

## Parameters

| Field        | Type   | Required | Описание            |
| ------------ | ------ | :------: | ------------------- |
| `uly`        | string |    no    | Underlying фильтр   |
| `instFamily` | string |    no    | Фильтр по семейству |
| `instId`     | string |    no    | Конкретный контракт |

## Response

```ts
interface FuturesMarkPriceItem {
  instType: 'FUTURES';
  instId: string;
  markPx: string;
  ts: string;
}
```

## Example

```ts
import { OkxPublicFuturesMarket } from 'rock-clients';

const [m] = await OkxPublicFuturesMarket.getMarkPrice({}, { instId: 'BTC-USD-241227' });
console.log(m?.markPx);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
