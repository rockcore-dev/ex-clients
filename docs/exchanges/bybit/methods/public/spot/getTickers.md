[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicSpotMarket.getTickers`

> `GET /v5/market/tickers?category=spot` · Public · No auth.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/tickers)

## Signature

```ts
static getTickers(
  ctx: BybitContext,
  params?: GetSpotTickersParams,
): Promise<GetSpotTickersResult>
```

## Parameters

| Поле     | Тип      | Обяз. | Описание                                               |
| -------- | -------- | ----- | ------------------------------------------------------ |
| `symbol` | `string` | Нет   | Конкретный символ. Без фильтра — тикеры по всем парам. |

## Response

```ts
interface GetSpotTickersResult {
  category: 'spot';
  list: SpotTicker[];
}

interface SpotTicker {
  symbol: string;
  bid1Price: string;
  bid1Size: string;
  ask1Price: string;
  ask1Size: string;
  lastPrice: string;
  prevPrice24h: string;
  price24hPcnt: string;
  highPrice24h: string;
  lowPrice24h: string;
  turnover24h: string;
  volume24h: string;
  usdIndexPrice?: string;
}
```

`price24hPcnt` — десятичная доля изменения за 24ч (`'0.0125'` = +1.25%).

## Example

```ts
import { BybitPublicSpotMarket } from 'rock-clients';

const { list } = await BybitPublicSpotMarket.getTickers({}, { symbol: 'BTCUSDT' });
console.log(list[0]?.lastPrice);
```

## Errors

| Класс ошибки        | Когда                                                      |
| ------------------- | ---------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0`                               |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope |

## Related

- Группа [Market (public)](../../../coverage.md#market-public).
- Futures-аналог: [`BybitPublicFuturesMarket.getTickers`](../futures/getTickers.md).

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpublicspotmarketgettickers)
