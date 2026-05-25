[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicFuturesMarket.getMarkPriceKline`

> `GET /v5/market/mark-price-kline?category=linear|inverse` · Public · No auth.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/mark-kline)

## Signature

```ts
static getMarkPriceKline(
  ctx: BybitContext,
  params: GetMarkPriceKlineParams,
): Promise<GetMarkPriceKlineResult>
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
interface GetMarkPriceKlineResult {
  category: 'linear' | 'inverse';
  symbol: string;
  list: PriceKline[];
}

type PriceKline = readonly [
  startTime: string,
  openPrice: string,
  highPrice: string,
  lowPrice: string,
  closePrice: string,
];
```

5 полей: нет `volume` и `turnover` — это особенность mark/index/premium kline.

## Example

```ts
import { BybitPublicFuturesMarket } from 'rock-clients';

const { list } = await BybitPublicFuturesMarket.getMarkPriceKline(
  {},
  { category: 'linear', symbol: 'BTCUSDT', interval: '60' },
);
console.log(list[0]);
```

## Errors

| Класс ошибки        | Когда                                                      |
| ------------------- | ---------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0`                               |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope |

## Related

- Соседние: [`getKline`](getKline.md), [`getIndexPriceKline`](getIndexPriceKline.md), [`getPremiumIndexPriceKline`](getPremiumIndexPriceKline.md).

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpublicfuturesmarketgetmarkpricekline)
