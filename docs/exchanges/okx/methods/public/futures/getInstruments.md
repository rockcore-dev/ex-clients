[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicFuturesMarket.getInstruments`

> `GET /api/v5/public/instruments` (с `instType=FUTURES`) · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-instruments)

## Signature

```ts
static getInstruments(
  ctx: OkxContext,
  params?: GetFuturesInstrumentsParams,
): Promise<GetFuturesInstrumentsResult>
```

## Parameters

| Field        | Type   | Required | Описание                              |
| ------------ | ------ | :------: | ------------------------------------- |
| `uly`        | string |    no    | Underlying, например `'BTC-USD'`      |
| `instFamily` | string |    no    | Альтернатива `uly`                    |
| `instId`     | string |    no    | Контракт, например `'BTC-USD-241227'` |

`instType=FUTURES` подставляется автоматически.

## Response

```ts
type GetFuturesInstrumentsResult = FuturesInstrument[];
```

`FuturesInstrument` имеет дополнительно `expTime`, `listTime`, `alias` (`'this_week'`, `'quarter'`, ...) и поля контракта (`ctVal`, `ctMult`, `ctType`, `lever`).

## Example

```ts
import { OkxPublicFuturesMarket } from 'rock-clients';

const all = await OkxPublicFuturesMarket.getInstruments({}, { uly: 'BTC-USD' });
const quarterly = all.filter((i) => i.alias === 'quarter');
console.log(quarterly.map((i) => i.instId));
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
