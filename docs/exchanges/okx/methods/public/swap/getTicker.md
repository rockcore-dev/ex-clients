[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSwapMarket.getTicker`

> `GET /api/v5/market/ticker` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-ticker)

## Signature

```ts
static getTicker(
  ctx: OkxContext,
  params: GetSwapTickerParams,
): Promise<GetSwapTickerResult>
```

## Parameters

| Field    | Type   | Required | Описание                    |
| -------- | ------ | :------: | --------------------------- |
| `instId` | string |   yes    | Например, `'BTC-USDT-SWAP'` |

## Response

`GetSwapTickerResult = SwapTicker[]` — массив длиной 1.

## Example

```ts
import { OkxPublicSwapMarket } from 'rock-clients';

const [t] = await OkxPublicSwapMarket.getTicker({}, { instId: 'BTC-USDT-SWAP' });
console.log(t?.last, t?.bidPx, t?.askPx);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
