[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicFuturesMarket.getOpenInterest`

> `GET /api/v5/public/open-interest` (с `instType=FUTURES`) · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-open-interest)

## Signature

```ts
static getOpenInterest(
  ctx: OkxContext,
  params?: GetFuturesOpenInterestParams,
): Promise<GetFuturesOpenInterestResult>
```

## Parameters

| Field        | Type   | Required | Описание            |
| ------------ | ------ | :------: | ------------------- |
| `uly`        | string |    no    | Underlying фильтр   |
| `instFamily` | string |    no    | Фильтр по семейству |
| `instId`     | string |    no    | Конкретный контракт |

## Response

```ts
interface FuturesOpenInterestItem {
  instType: 'FUTURES';
  instId: string;
  oi: string;
  oiCcy: string;
  ts: string;
}
```

## Example

```ts
import { OkxPublicFuturesMarket } from 'rock-clients';

const all = await OkxPublicFuturesMarket.getOpenInterest({}, { uly: 'BTC-USD' });
console.log(all);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
