[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSwapMarket.getInstruments`

> `GET /api/v5/public/instruments` (с `instType=SWAP`) · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-instruments)

## Signature

```ts
static getInstruments(
  ctx: OkxContext,
  params?: GetSwapInstrumentsParams,
): Promise<GetSwapInstrumentsResult>
```

## Parameters

| Field        | Type   | Required | Описание                                        |
| ------------ | ------ | :------: | ----------------------------------------------- |
| `uly`        | string |    no    | Underlying, например `'BTC-USDT'`               |
| `instFamily` | string |    no    | Альтернатива `uly`                              |
| `instId`     | string |    no    | Конкретный контракт, например `'BTC-USDT-SWAP'` |

`instType=SWAP` подставляется автоматически.

## Response

```ts
type GetSwapInstrumentsResult = SwapInstrument[];
```

`SwapInstrument` содержит `ctVal`, `ctMult`, `ctValCcy`, `ctType` (`linear`/`inverse`), `lever`, `lotSz`, `tickSz`, `state`, `listTime` и проч. Полный тип см. в [`swap/types.ts`](../../../../../../src/lib/exchanges/okx/rest/public/swap/types.ts).

## Example

```ts
import { OkxPublicSwapMarket } from 'rock-clients';

const linearUSDT = await OkxPublicSwapMarket.getInstruments({}, { uly: 'BTC-USDT' });
console.log(linearUSDT[0]?.ctVal, linearUSDT[0]?.ctType);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
