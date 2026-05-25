[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicFuturesMarket.getKline`

> `GET /v5/market/kline?category=linear|inverse` · Public · No auth.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/kline)

## Signature

```ts
static getKline(
  ctx: BybitContext,
  params: GetFuturesKlineParams,
): Promise<GetFuturesKlineResult>
```

## Parameters

| Поле       | Тип                     | Обяз. | Описание                                    |
| ---------- | ----------------------- | ----- | ------------------------------------------- |
| `category` | `'linear' \| 'inverse'` | Да    | Тип фьючерса.                               |
| `symbol`   | `string`                | Да    | Тикер, например `'BTCUSDT'` или `'BTCUSD'`. |
| `interval` | `KlineInterval`         | Да    | См. [shared types](../../../coverage.md).   |
| `start`    | `number`                | Нет   | Начало диапазона, ms.                       |
| `end`      | `number`                | Нет   | Конец диапазона, ms.                        |
| `limit`    | `number`                | Нет   | 1..1000. По умолчанию 200.                  |

## Response

```ts
interface GetFuturesKlineResult {
  category: 'linear' | 'inverse';
  symbol: string;
  list: Kline[];
}

type Kline = readonly [
  startTime: string,
  openPrice: string,
  highPrice: string,
  lowPrice: string,
  closePrice: string,
  volume: string,
  turnover: string,
];
```

Каждая свеча — массив из 7 строк фиксированного порядка.

## Example

```ts
import { BybitPublicFuturesMarket } from 'rock-clients';

const { list } = await BybitPublicFuturesMarket.getKline(
  { env: 'testnet' },
  { category: 'linear', symbol: 'BTCUSDT', interval: '60', limit: 5 },
);
console.log(list);
```

## Errors

| Класс ошибки        | Когда                                                      |
| ------------------- | ---------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0`                               |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope |

## Related

- Spot-аналог: [`BybitPublicSpotMarket.getKline`](../spot/getKline.md).
- См. также: [`getMarkPriceKline`](getMarkPriceKline.md), [`getIndexPriceKline`](getIndexPriceKline.md).

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpublicfuturesmarketgetkline)
