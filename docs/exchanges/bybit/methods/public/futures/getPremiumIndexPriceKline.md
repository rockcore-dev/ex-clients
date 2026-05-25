[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicFuturesMarket.getPremiumIndexPriceKline`

> `GET /v5/market/premium-index-price-kline?category=linear` · Public · No auth.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/preimum-index-kline)

## Signature

```ts
static getPremiumIndexPriceKline(
  ctx: BybitContext,
  params: GetPremiumIndexPriceKlineParams,
): Promise<GetPremiumIndexPriceKlineResult>
```

> **Внимание.** Bybit поддерживает premium-index-price-kline только для `category=linear` (USDT perpetuals). Тип `category` сужен до `'linear'` — `inverse` отсечён на этапе компиляции.

## Parameters

| Поле       | Тип             | Обяз. | Описание                   |
| ---------- | --------------- | ----- | -------------------------- |
| `category` | `'linear'`      | Да    | Только linear.             |
| `symbol`   | `string`        | Да    | Тикер.                     |
| `interval` | `KlineInterval` | Да    | Интервал свечей.           |
| `start`    | `number`        | Нет   | Начало, ms.                |
| `end`      | `number`        | Нет   | Конец, ms.                 |
| `limit`    | `number`        | Нет   | 1..1000. По умолчанию 200. |

## Response

```ts
interface GetPremiumIndexPriceKlineResult {
  category: 'linear';
  symbol: string;
  list: PriceKline[];
}
```

## Example

```ts
import { BybitPublicFuturesMarket } from 'rock-clients';

const { list } = await BybitPublicFuturesMarket.getPremiumIndexPriceKline(
  {},
  { category: 'linear', symbol: 'BTCUSDT', interval: '15' },
);
console.log(list[0]);
```

## Errors

| Класс ошибки        | Когда                                                      |
| ------------------- | ---------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0`                               |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope |

## Related

- Соседние: [`getKline`](getKline.md), [`getMarkPriceKline`](getMarkPriceKline.md), [`getIndexPriceKline`](getIndexPriceKline.md).

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpublicfuturesmarketgetpremiumindexpricekline)
