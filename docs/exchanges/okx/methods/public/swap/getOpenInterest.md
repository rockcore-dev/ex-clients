[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSwapMarket.getOpenInterest`

> `GET /api/v5/public/open-interest` (с `instType=SWAP`) · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-open-interest)

## Signature

```ts
static getOpenInterest(
  ctx: OkxContext,
  params?: GetSwapOpenInterestParams,
): Promise<GetSwapOpenInterestResult>
```

## Parameters

| Field        | Type   | Required | Описание            |
| ------------ | ------ | :------: | ------------------- |
| `uly`        | string |    no    | Underlying фильтр   |
| `instFamily` | string |    no    | Фильтр по семейству |
| `instId`     | string |    no    | Конкретный контракт |

## Response

```ts
interface OpenInterestItem {
  instType: 'SWAP';
  instId: string;
  oi: string; // в контрактах
  oiCcy: string; // в quote-валюте
  ts: string;
}
```

## Example

```ts
import { OkxPublicSwapMarket } from 'rock-clients';

const all = await OkxPublicSwapMarket.getOpenInterest({});
console.log(all.length, all[0]);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
