[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicFuturesMarket.getRecentTrades`

> `GET /v5/market/recent-trade?category=linear|inverse` · Public · No auth.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/recent-trade)

## Signature

```ts
static getRecentTrades(
  ctx: BybitContext,
  params: GetFuturesRecentTradesParams,
): Promise<GetFuturesRecentTradesResult>
```

## Parameters

| Поле         | Тип                     | Обяз. | Описание                                                        |
| ------------ | ----------------------- | ----- | --------------------------------------------------------------- |
| `category`   | `'linear' \| 'inverse'` | Да    | Тип фьючерса.                                                   |
| `symbol`     | `string`                | Да    | Тикер.                                                          |
| `limit`      | `number`                | Нет   | linear/inverse: 1..1000, default 500.                           |
| `optionType` | `'Call' \| 'Put'`       | Нет   | Игнорируется для futures, оставлено для совместимости с option. |
| `baseCoin`   | `string`                | Нет   | Игнорируется для futures (нужно только для `category=option`).  |

## Response

```ts
interface GetFuturesRecentTradesResult {
  category: 'linear' | 'inverse';
  list: FuturesPublicTrade[];
}

interface FuturesPublicTrade {
  execId: string;
  symbol: string;
  price: string;
  size: string;
  side: 'Buy' | 'Sell';
  time: string; // ms, string-encoded integer
  isBlockTrade: boolean;
}
```

## Example

```ts
import { BybitPublicFuturesMarket } from 'rock-clients';

const { list } = await BybitPublicFuturesMarket.getRecentTrades(
  {},
  { category: 'linear', symbol: 'BTCUSDT', limit: 100 },
);
console.log(list[0]);
```

## Errors

| Класс ошибки        | Когда                                                      |
| ------------------- | ---------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0`                               |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope |

## Related

- Spot-аналог: [`BybitPublicSpotMarket.getRecentTrades`](../spot/getRecentTrades.md).

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpublicfuturesmarketgetrecenttrades)
