[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSwapMarket.getFundingRateHistory`

> `GET /api/v5/public/funding-rate-history` · Public · No auth · SWAP only.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-funding-rate-history)

История начисленных funding rate.

## Signature

```ts
static getFundingRateHistory(
  ctx: OkxContext,
  params: GetFundingRateHistoryParams,
): Promise<GetFundingRateHistoryResult>
```

## Parameters

| Field    | Type   | Required | Описание                    |
| -------- | ------ | :------: | --------------------------- |
| `instId` | string |   yes    | Например, `'BTC-USDT-SWAP'` |
| `before` | number |    no    | Pagination ts (ms)          |
| `after`  | number |    no    | Pagination ts (ms)          |
| `limit`  | number |    no    | 1..100                      |

## Response

```ts
type GetFundingRateHistoryResult = FundingRateHistoryItem[];

interface FundingRateHistoryItem {
  instType: 'SWAP';
  instId: string;
  fundingRate: string;
  realizedRate: string; // фактически списанное
  fundingTime: string; // ms
}
```

## Example

```ts
import { OkxPublicSwapMarket } from 'rock-clients';

const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
const history = await OkxPublicSwapMarket.getFundingRateHistory(
  {},
  {
    instId: 'BTC-USDT-SWAP',
    after: dayAgo,
  },
);
console.log(history.length);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
