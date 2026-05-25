[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicFuturesMarket.getOpenInterest`

> `GET /v5/market/open-interest?category=linear|inverse` · Public · No auth.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/open-interest)

## Signature

```ts
static getOpenInterest(
  ctx: BybitContext,
  params: GetOpenInterestParams,
): Promise<GetOpenInterestResult>
```

## Parameters

| Поле           | Тип                                                    | Обяз. | Описание                     |
| -------------- | ------------------------------------------------------ | ----- | ---------------------------- |
| `category`     | `'linear' \| 'inverse'`                                | Да    | Тип фьючерса.                |
| `symbol`       | `string`                                               | Да    | Тикер.                       |
| `intervalTime` | `'5min' \| '15min' \| '30min' \| '1h' \| '4h' \| '1d'` | Да    | Интервал агрегации.          |
| `startTime`    | `number`                                               | Нет   | ms.                          |
| `endTime`      | `number`                                               | Нет   | ms.                          |
| `limit`        | `number`                                               | Нет   | 1..200. По умолчанию 50.     |
| `cursor`       | `string`                                               | Нет   | Курсор постраничной выборки. |

## Response

```ts
interface GetOpenInterestResult {
  category: 'linear' | 'inverse';
  symbol: string;
  list: OpenInterestItem[];
  nextPageCursor?: string;
}

interface OpenInterestItem {
  openInterest: string;
  timestamp: string; // ms, string-encoded integer
}
```

## Example

```ts
import { BybitPublicFuturesMarket } from 'rock-clients';

const { list } = await BybitPublicFuturesMarket.getOpenInterest(
  {},
  { category: 'linear', symbol: 'BTCUSDT', intervalTime: '1h', limit: 50 },
);
for (const item of list) {
  console.log(new Date(Number(item.timestamp)).toISOString(), item.openInterest);
}
```

## Errors

| Класс ошибки        | Когда                                                      |
| ------------------- | ---------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0`                               |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope |

## Related

- Соседние: [`getTickers`](getTickers.md) (поля `openInterest`, `openInterestValue`).
- [`getLongShortRatio`](getLongShortRatio.md) — соотношение лонгов и шортов.

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpublicfuturesmarketgetopeninterest)
