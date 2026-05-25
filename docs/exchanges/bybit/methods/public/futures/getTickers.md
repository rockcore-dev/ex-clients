[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicFuturesMarket.getTickers`

> `GET /v5/market/tickers?category=linear|inverse` · Public · No auth.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/tickers)

## Signature

```ts
static getTickers(
  ctx: BybitContext,
  params: GetFuturesTickersParams,
): Promise<GetFuturesTickersResult>
```

## Parameters

| Поле       | Тип                     | Обяз. | Описание                                                 |
| ---------- | ----------------------- | ----- | -------------------------------------------------------- |
| `category` | `'linear' \| 'inverse'` | Да    | Тип фьючерса.                                            |
| `symbol`   | `string`                | Нет   | Конкретный символ.                                       |
| `baseCoin` | `string`                | Нет   | Например, `'BTC'`.                                       |
| `expDate`  | `string`                | Нет   | Дата экспирации в формате Bybit (например, `'15DEC23'`). |

## Response

```ts
interface GetFuturesTickersResult {
  category: 'linear' | 'inverse';
  list: FuturesTicker[];
}

interface FuturesTicker {
  symbol: string;
  lastPrice: string;
  indexPrice: string;
  markPrice: string;
  prevPrice24h: string;
  price24hPcnt: string;
  highPrice24h: string;
  lowPrice24h: string;
  prevPrice1h: string;
  openInterest: string;
  openInterestValue: string;
  turnover24h: string;
  volume24h: string;
  fundingRate: string;
  nextFundingTime: string; // ms, string-encoded integer
  predictedDeliveryPrice?: string;
  basisRate?: string;
  deliveryFeeRate?: string;
  deliveryTime?: string;
  ask1Size: string;
  bid1Size: string;
  ask1Price: string;
  bid1Price: string;
  basis?: string;
  preOpenPrice?: string;
  preQty?: string;
  curPreListingPhase?: string;
}
```

## Example

```ts
import { BybitPublicFuturesMarket } from 'rock-clients';

const { list } = await BybitPublicFuturesMarket.getTickers(
  {},
  { category: 'linear', symbol: 'BTCUSDT' },
);
console.log(list[0]?.markPrice, list[0]?.fundingRate);
```

## Errors

| Класс ошибки        | Когда                                                      |
| ------------------- | ---------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0`                               |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope |

## Related

- Spot-аналог: [`BybitPublicSpotMarket.getTickers`](../spot/getTickers.md).

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpublicfuturesmarketgettickers)
