[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSpotMarket.getHistoryTrades`

> `GET /api/v5/market/history-trades` · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-trades-history)

Старее, чем окно `getRecentTrades`. Поддерживает pagination.

## Signature

```ts
static getHistoryTrades(
  ctx: OkxContext,
  params: GetSpotHistoryTradesParams,
): Promise<GetSpotHistoryTradesResult>
```

## Parameters

| Field    | Type         | Required | Описание                                                       |
| -------- | ------------ | :------: | -------------------------------------------------------------- |
| `instId` | string       |   yes    | Например, `'BTC-USDT'`                                         |
| `type`   | `'1' \| '2'` |    no    | `1` — pagination по `tradeId`, `2` — по `ts`. По умолчанию `1` |
| `before` | string       |    no    | Курсор; до этой записи                                         |
| `after`  | string       |    no    | Курсор; после этой записи                                      |
| `limit`  | number       |    no    | 1..100, по умолчанию 100                                       |

## Response

`GetSpotHistoryTradesResult = SpotPublicTrade[]` — формат идентичен [`getRecentTrades`](getRecentTrades.md).

## Example

```ts
import { OkxPublicSpotMarket } from 'rock-clients';

const page1 = await OkxPublicSpotMarket.getHistoryTrades({}, { instId: 'BTC-USDT', limit: 100 });
const oldestId = page1.at(-1)?.tradeId;

if (oldestId !== undefined) {
  const page2 = await OkxPublicSpotMarket.getHistoryTrades(
    {},
    {
      instId: 'BTC-USDT',
      type: '1',
      after: oldestId,
      limit: 100,
    },
  );
  console.log(page2.length);
}
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
