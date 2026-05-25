[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicFuturesMarket.getFundingRateHistory`

> `GET /v5/market/funding/history?category=linear|inverse` · Public · No auth.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/history-fund-rate)

## Signature

```ts
static getFundingRateHistory(
  ctx: BybitContext,
  params: GetFundingRateHistoryParams,
): Promise<GetFundingRateHistoryResult>
```

## Parameters

| Поле        | Тип                     | Обяз. | Описание             |
| ----------- | ----------------------- | ----- | -------------------- |
| `category`  | `'linear' \| 'inverse'` | Да    | Тип фьючерса.        |
| `symbol`    | `string`                | Да    | Тикер.               |
| `startTime` | `number`                | Нет   | ms.                  |
| `endTime`   | `number`                | Нет   | ms.                  |
| `limit`     | `number`                | Нет   | 1..200, default 200. |

## Response

```ts
interface GetFundingRateHistoryResult {
  category: 'linear' | 'inverse';
  list: FundingRateHistoryItem[];
}

interface FundingRateHistoryItem {
  symbol: string;
  fundingRate: string;
  fundingRateTimestamp: string; // ms, string-encoded integer
}
```

## Example

```ts
import { BybitPublicFuturesMarket } from 'rock-clients';

const { list } = await BybitPublicFuturesMarket.getFundingRateHistory(
  {},
  { category: 'linear', symbol: 'BTCUSDT', limit: 50 },
);
for (const item of list) {
  console.log(new Date(Number(item.fundingRateTimestamp)).toISOString(), item.fundingRate);
}
```

## Errors

| Класс ошибки        | Когда                                                      |
| ------------------- | ---------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0`                               |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope |

## Related

- Соседние: [`getTickers`](getTickers.md) (поле `fundingRate`).

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpublicfuturesmarketgetfundingratehistory)
