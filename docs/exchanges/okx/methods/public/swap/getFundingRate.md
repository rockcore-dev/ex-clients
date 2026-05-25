[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSwapMarket.getFundingRate`

> `GET /api/v5/public/funding-rate` · Public · No auth · SWAP only.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-funding-rate)

Текущий funding rate и время следующего расчёта для perpetual swap.

## Signature

```ts
static getFundingRate(
  ctx: OkxContext,
  params: GetFundingRateParams,
): Promise<GetFundingRateResult>
```

## Parameters

| Field    | Type   | Required | Описание                    |
| -------- | ------ | :------: | --------------------------- |
| `instId` | string |   yes    | Например, `'BTC-USDT-SWAP'` |

## Response

```ts
type GetFundingRateResult = FundingRateItem[];

interface FundingRateItem {
  instType: 'SWAP';
  instId: string;
  fundingRate: string; // например '0.0001'
  nextFundingRate: string; // прогноз
  fundingTime: string; // ms, ISO-эпоха в виде строки
  nextFundingTime: string;
  method?: string; // 'current_period' | 'next_period'
}
```

## Example

```ts
import { OkxPublicSwapMarket } from 'rock-clients';

const [r] = await OkxPublicSwapMarket.getFundingRate({}, { instId: 'BTC-USDT-SWAP' });
console.log(r?.fundingRate, new Date(Number(r?.fundingTime)).toISOString());
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
