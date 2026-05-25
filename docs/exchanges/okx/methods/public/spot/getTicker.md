[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSpotMarket.getTicker`

> `GET /api/v5/market/ticker` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-ticker)

## Signature

```ts
static getTicker(
  ctx: OkxContext,
  params: GetSpotTickerParams,
): Promise<GetSpotTickerResult>
```

## Parameters

| Field    | Type   | Required | Описание               |
| -------- | ------ | :------: | ---------------------- |
| `instId` | string |   yes    | Например, `'BTC-USDT'` |

## Response

```ts
type GetSpotTickerResult = SpotTicker[]; // массив длиной 1
```

Поля идентичны `getTickers` (см. соответствующую страницу).

## Example

```ts
import { OkxPublicSpotMarket } from 'rock-clients';

const [t] = await OkxPublicSpotMarket.getTicker({}, { instId: 'BTC-USDT' });
console.log(t?.last, t?.bidPx, t?.askPx);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
