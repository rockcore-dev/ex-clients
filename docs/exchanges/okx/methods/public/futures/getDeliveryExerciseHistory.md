[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicFuturesMarket.getDeliveryExerciseHistory`

> `GET /api/v5/public/delivery-exercise-history` (с `instType=FUTURES`) · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-delivery-exercise-history)

История поставок/исполнений за последние 3 месяца. Один из `uly` или `instFamily` обязателен.

## Signature

```ts
static getDeliveryExerciseHistory(
  ctx: OkxContext,
  params?: GetDeliveryExerciseHistoryParams,
): Promise<GetDeliveryExerciseHistoryResult>
```

## Parameters

| Field        | Type   | Required | Описание                                            |
| ------------ | ------ | :------: | --------------------------------------------------- |
| `uly`        | string |  one of  | Underlying. Обязателен, если `instFamily` не задан. |
| `instFamily` | string |  one of  | Альтернатива `uly`.                                 |
| `before`     | number |    no    | Pagination ts (ms)                                  |
| `after`      | number |    no    | Pagination ts (ms)                                  |
| `limit`      | number |    no    | 1..100                                              |

## Response

```ts
type GetDeliveryExerciseHistoryResult = DeliveryExerciseRecord[];

interface DeliveryExerciseRecord {
  ts: string;
  details: DeliveryExerciseDetail[];
}

interface DeliveryExerciseDetail {
  type: string; // 'delivery' | 'exercised' | 'expired_otm'
  insId: string;
  px: string;
}
```

## Example

```ts
import { OkxPublicFuturesMarket } from 'rock-clients';

const history = await OkxPublicFuturesMarket.getDeliveryExerciseHistory(
  {},
  {
    uly: 'BTC-USD',
    limit: 50,
  },
);
for (const record of history) {
  for (const d of record.details) {
    console.log(record.ts, d.type, d.insId, d.px);
  }
}
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
