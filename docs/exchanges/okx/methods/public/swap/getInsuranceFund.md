[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSwapMarket.getInsuranceFund`

> `GET /api/v5/public/insurance-fund` (с `instType=SWAP`) · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-insurance-fund)

## Signature

```ts
static getInsuranceFund(
  ctx: OkxContext,
  params?: GetSwapInsuranceFundParams,
): Promise<GetSwapInsuranceFundResult>
```

## Parameters

| Field        | Type                                                                                | Required | Описание                |
| ------------ | ----------------------------------------------------------------------------------- | :------: | ----------------------- |
| `type`       | `'liquidation_balance_deposit' \| 'bankruptcy_loss' \| 'platform_revenue' \| 'adl'` |    no    | Тип записи              |
| `uly`        | string                                                                              |    no    | Underlying фильтр       |
| `instFamily` | string                                                                              |    no    | Фильтр по семейству     |
| `ccy`        | string                                                                              |    no    | Валюта (USDT, BTC, ...) |
| `before`     | number                                                                              |    no    | Pagination ts (ms)      |
| `after`      | number                                                                              |    no    | Pagination ts (ms)      |
| `limit`      | number                                                                              |    no    | 1..100                  |

## Response

```ts
interface InsuranceFundResult {
  total: string;
  instFamily: string;
  instType: 'SWAP';
  details: InsuranceFundEntry[];
}

interface InsuranceFundEntry {
  amt: string;
  balance: string;
  ccy: string;
  type: string;
  ts: string;
}
```

OKX возвращает массив, обычно длиной 1.

## Example

```ts
import { OkxPublicSwapMarket } from 'rock-clients';

const [r] = await OkxPublicSwapMarket.getInsuranceFund(
  {},
  {
    uly: 'BTC-USDT',
    ccy: 'USDT',
    limit: 50,
  },
);
console.log(r?.total, r?.details.length);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
