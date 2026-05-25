[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSpotMarket.getInstruments`

> `GET /api/v5/public/instruments` (с `instType=SPOT`) · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-instruments)

## Signature

```ts
static getInstruments(
  ctx: OkxContext,
  params?: GetSpotInstrumentsParams,
): Promise<GetSpotInstrumentsResult>
```

## Parameters

| Field    | Type   | Required | Описание                                 |
| -------- | ------ | :------: | ---------------------------------------- |
| `instId` | string |    no    | Конкретный символ, например `'BTC-USDT'` |

`instType=SPOT` подставляется автоматически.

## Response

```ts
type GetSpotInstrumentsResult = SpotInstrument[];
```

Каждый элемент содержит `instId`, `baseCcy`, `quoteCcy`, `lotSz`, `minSz`, `tickSz`, `state`. См. полный тип в [`spot/types.ts`](../../../../../../src/lib/exchanges/okx/rest/public/spot/types.ts).

## Example

```ts
import { OkxPublicSpotMarket } from 'rock-clients';

const all = await OkxPublicSpotMarket.getInstruments({});
const single = await OkxPublicSpotMarket.getInstruments({}, { instId: 'BTC-USDT' });
console.log(single[0]?.tickSz);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
