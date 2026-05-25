[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicFuturesMarket.getIndexPriceKline`

> `GET /v5/market/index-price-kline?category=linear|inverse` · Public · No auth.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/index-kline)

## Signature

```ts
static getIndexPriceKline(
  ctx: BybitContext,
  params: GetIndexPriceKlineParams,
): Promise<GetIndexPriceKlineResult>
```

## Parameters

| Поле       | Тип                     | Обяз. | Описание                   |
| ---------- | ----------------------- | ----- | -------------------------- |
| `category` | `'linear' \| 'inverse'` | Да    | Тип фьючерса.              |
| `symbol`   | `string`                | Да    | Тикер.                     |
| `interval` | `KlineInterval`         | Да    | Интервал свечей.           |
| `start`    | `number`                | Нет   | Начало, ms.                |
| `end`      | `number`                | Нет   | Конец, ms.                 |
| `limit`    | `number`                | Нет   | 1..1000. По умолчанию 200. |

## Response

```ts
interface GetIndexPriceKlineResult {
  category: 'linear' | 'inverse';
  symbol: string;
  list: PriceKline[];
}
```

`PriceKline` — 5-полевой tuple `[startTime, open, high, low, close]`.

## Example

```ts
import { BybitPublicFuturesMarket } from 'rock-clients';

const { list } = await BybitPublicFuturesMarket.getIndexPriceKline(
  {},
  { category: 'linear', symbol: 'BTCUSDT', interval: 'D' },
);
console.log(list[0]);
```

## Errors

| Класс ошибки        | Когда                                                      |
| ------------------- | ---------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0`                               |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope |

## Related

- Соседние: [`getKline`](getKline.md), [`getMarkPriceKline`](getMarkPriceKline.md), [`getPremiumIndexPriceKline`](getPremiumIndexPriceKline.md).

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpublicfuturesmarketgetindexpricekline)
