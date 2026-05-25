[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicFuturesMarket.getInsuranceFund`

> `GET /api/v5/public/insurance-fund` (с `instType=FUTURES`) · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-insurance-fund)

## Signature

```ts
static getInsuranceFund(
  ctx: OkxContext,
  params?: GetFuturesInsuranceFundParams,
): Promise<GetFuturesInsuranceFundResult>
```

## Parameters

Полный набор фильтров и pagination — см. [swap-аналог](../swap/getInsuranceFund.md). `instType=FUTURES` подставляется автоматически.

## Response

```ts
interface FuturesInsuranceFundResult {
  total: string;
  instFamily: string;
  instType: 'FUTURES';
  details: FuturesInsuranceFundEntry[];
}

interface FuturesInsuranceFundEntry {
  amt: string;
  balance: string;
  ccy: string;
  type: string;
  ts: string;
}
```

## Example

```ts
import { OkxPublicFuturesMarket } from 'rock-clients';

const [r] = await OkxPublicFuturesMarket.getInsuranceFund(
  {},
  {
    uly: 'BTC-USD',
    ccy: 'BTC',
  },
);
console.log(r?.total);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
