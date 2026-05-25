[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSwapMarket.getMarkPrice`

> `GET /api/v5/public/mark-price` (с `instType=SWAP`) · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-mark-price)

## Signature

```ts
static getMarkPrice(
  ctx: OkxContext,
  params?: GetSwapMarkPriceParams,
): Promise<GetSwapMarkPriceResult>
```

## Parameters

| Field        | Type   | Required | Описание            |
| ------------ | ------ | :------: | ------------------- |
| `uly`        | string |    no    | Underlying фильтр   |
| `instFamily` | string |    no    | Фильтр по семейству |
| `instId`     | string |    no    | Конкретный контракт |

## Response

```ts
interface MarkPriceItem {
  instType: 'SWAP';
  instId: string;
  markPx: string;
  ts: string;
}
```

## Example

```ts
import { OkxPublicSwapMarket } from 'rock-clients';

const [m] = await OkxPublicSwapMarket.getMarkPrice({}, { instId: 'BTC-USDT-SWAP' });
console.log(m?.markPx);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
