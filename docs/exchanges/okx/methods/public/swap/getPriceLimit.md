[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSwapMarket.getPriceLimit`

> `GET /api/v5/public/price-limit` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-limit-price)

Действующие максимально/минимально допустимые цены для лимитных ордеров.

## Signature

```ts
static getPriceLimit(
  ctx: OkxContext,
  params: GetSwapPriceLimitParams,
): Promise<GetSwapPriceLimitResult>
```

## Parameters

| Field    | Type   | Required | Описание                    |
| -------- | ------ | :------: | --------------------------- |
| `instId` | string |   yes    | Например, `'BTC-USDT-SWAP'` |

## Response

```ts
interface PriceLimitItem {
  instType: 'SWAP';
  instId: string;
  buyLmt: string; // максимальная цена покупки
  sellLmt: string; // минимальная цена продажи
  ts: string;
  enabled?: boolean;
}
```

## Example

```ts
import { OkxPublicSwapMarket } from 'rock-clients';

const [pl] = await OkxPublicSwapMarket.getPriceLimit({}, { instId: 'BTC-USDT-SWAP' });
console.log(pl?.buyLmt, pl?.sellLmt);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
