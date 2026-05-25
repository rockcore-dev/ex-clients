[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicFuturesMarket.getEstimatedPrice`

> `GET /api/v5/public/estimated-price` · Public · No auth · FUTURES/OPTION only.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-estimated-delivery-exercise-price)

Прогнозируемая цена поставки/исполнения. Доступно только в течение последнего часа перед поставкой/экспирацией.

## Signature

```ts
static getEstimatedPrice(
  ctx: OkxContext,
  params: GetEstimatedPriceParams,
): Promise<GetEstimatedPriceResult>
```

## Parameters

| Field    | Type   | Required | Описание                        |
| -------- | ------ | :------: | ------------------------------- |
| `instId` | string |   yes    | `instId` фьючерса (или опциона) |

## Response

```ts
interface EstimatedPriceItem {
  instType: 'FUTURES' | 'OPTION';
  instId: string;
  settlePx: string;
  ts: string;
}
```

## Example

```ts
import { OkxPublicFuturesMarket } from 'rock-clients';

const [e] = await OkxPublicFuturesMarket.getEstimatedPrice(
  {},
  {
    instId: 'BTC-USD-241227',
  },
);
console.log(e?.settlePx);
```

## Errors

| Класс ошибки      | Когда                                                         |
| ----------------- | ------------------------------------------------------------- |
| `OkxApiError`     | Контракт не близок к поставке (OKX отвечает доменной ошибкой) |
| `OkxNetworkError` | Сетевой сбой и т.п. — см. [README](../../../README.md#ошибки) |

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
