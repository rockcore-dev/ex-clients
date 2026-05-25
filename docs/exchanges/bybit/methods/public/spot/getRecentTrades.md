[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicSpotMarket.getRecentTrades`

> `GET /v5/market/recent-trade?category=spot` · Public · No auth.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/recent-trade)

## Signature

```ts
static getRecentTrades(
  ctx: BybitContext,
  params: GetSpotRecentTradesParams,
): Promise<GetSpotRecentTradesResult>
```

## Parameters

| Поле     | Тип      | Обяз. | Описание                      |
| -------- | -------- | ----- | ----------------------------- |
| `symbol` | `string` | Да    | Тикер, например `'BTCUSDT'`.  |
| `limit`  | `number` | Нет   | spot: 1..60. По умолчанию 60. |

## Response

```ts
interface GetSpotRecentTradesResult {
  category: 'spot';
  list: SpotPublicTrade[];
}

interface SpotPublicTrade {
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
import { BybitPublicSpotMarket } from 'rock-clients';

const { list } = await BybitPublicSpotMarket.getRecentTrades({}, { symbol: 'BTCUSDT', limit: 20 });
for (const t of list) {
  console.log(t.side, t.price, t.size);
}
```

## Errors

| Класс ошибки        | Когда                                                      |
| ------------------- | ---------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0`                               |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope |

## Related

- Группа [Market (public)](../../../coverage.md#market-public).
- Futures-аналог: [`BybitPublicFuturesMarket.getRecentTrades`](../futures/getRecentTrades.md).

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpublicspotmarketgetrecenttrades)
