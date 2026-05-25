[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicSpotMarket.getInstrumentsInfo`

> `GET /v5/market/instruments-info?category=spot` · Public · No auth.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/instrument)

## Signature

```ts
static getInstrumentsInfo(
  ctx: BybitContext,
  params?: GetSpotInstrumentsInfoParams,
): Promise<GetSpotInstrumentsInfoResult>
```

`category` фиксирован как `'spot'`.

## Parameters

| Поле       | Тип                     | Обяз. | Описание                     |
| ---------- | ----------------------- | ----- | ---------------------------- |
| `symbol`   | `string`                | Нет   | Конкретный символ.           |
| `status`   | `'Trading' \| 'Closed'` | Нет   | Фильтр по статусу.           |
| `baseCoin` | `string`                | Нет   | Например, `'BTC'`.           |
| `limit`    | `number`                | Нет   | 1..1000. По умолчанию 500.   |
| `cursor`   | `string`                | Нет   | Курсор постраничной выборки. |

## Response

```ts
interface GetSpotInstrumentsInfoResult {
  category: 'spot';
  list: SpotInstrument[];
}

interface SpotInstrument {
  symbol: string;
  baseCoin: string;
  quoteCoin: string;
  innovation: string;
  status: string;
  marginTrading: string;
  stTag?: string;
  lotSizeFilter: {
    basePrecision: string;
    quotePrecision: string;
    minOrderQty: string;
    maxOrderQty: string;
    minOrderAmt: string;
    maxOrderAmt: string;
  };
  priceFilter: { tickSize: string };
  riskParameters?: { priceLimitRatioX: string; priceLimitRatioY: string };
}
```

## Example

```ts
import { BybitPublicSpotMarket } from 'rock-clients';

const { list } = await BybitPublicSpotMarket.getInstrumentsInfo({}, { symbol: 'BTCUSDT' });
console.log(list[0]?.priceFilter.tickSize);
```

## Errors

| Класс ошибки        | Когда                                                      |
| ------------------- | ---------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0`                               |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope |

## Related

- Группа [Market (public)](../../../coverage.md#market-public).
- Futures-аналог: [`BybitPublicFuturesMarket.getInstrumentsInfo`](../futures/getInstrumentsInfo.md).

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpublicspotmarketgetinstrumentsinfo)
