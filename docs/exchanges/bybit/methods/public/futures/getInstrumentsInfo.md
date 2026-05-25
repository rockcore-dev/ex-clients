[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicFuturesMarket.getInstrumentsInfo`

> `GET /v5/market/instruments-info?category=linear|inverse` · Public · No auth.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/instrument)

## Signature

```ts
static getInstrumentsInfo(
  ctx: BybitContext,
  params: GetFuturesInstrumentsInfoParams,
): Promise<GetFuturesInstrumentsInfoResult>
```

## Parameters

| Поле       | Тип                     | Обяз. | Описание                            |
| ---------- | ----------------------- | ----- | ----------------------------------- |
| `category` | `'linear' \| 'inverse'` | Да    | Тип фьючерса.                       |
| `symbol`   | `string`                | Нет   | Конкретный символ.                  |
| `status`   | `'Trading' \| 'Closed'` | Нет   | Фильтр по статусу.                  |
| `baseCoin` | `string`                | Нет   | Базовая монета (например, `'BTC'`). |
| `limit`    | `number`                | Нет   | 1..1000. По умолчанию 500.          |
| `cursor`   | `string`                | Нет   | Курсор постраничной выборки.        |

## Response

```ts
interface GetFuturesInstrumentsInfoResult {
  category: 'linear' | 'inverse';
  list: FuturesInstrument[];
  nextPageCursor?: string;
}

interface FuturesInstrument {
  symbol: string;
  contractType: ContractType; // 'LinearPerpetual' | 'InversePerpetual' | 'LinearFutures' | 'InverseFutures'
  status: string;
  baseCoin: string;
  quoteCoin: string;
  launchTime: string; // ms, string-encoded integer
  deliveryTime: string; // '0' для бессрочного контракта
  deliveryFeeRate: string;
  priceScale: string;
  leverageFilter: { minLeverage: string; maxLeverage: string; leverageStep: string };
  priceFilter: { minPrice: string; maxPrice: string; tickSize: string };
  lotSizeFilter: {
    minOrderQty: string;
    maxOrderQty: string;
    qtyStep: string;
    postOnlyMaxOrderQty?: string;
    minNotionalValue?: string;
    maxMktOrderQty?: string;
  };
  unifiedMarginTrade: boolean;
  fundingInterval: number; // в минутах
  settleCoin: string;
  copyTrading?: string;
  upperFundingRate?: string;
  lowerFundingRate?: string;
}
```

## Example

```ts
import { BybitPublicFuturesMarket } from 'rock-clients';

const { list } = await BybitPublicFuturesMarket.getInstrumentsInfo(
  {},
  { category: 'linear', symbol: 'BTCUSDT' },
);
console.log(list[0]?.contractType, list[0]?.fundingInterval);
```

## Errors

| Класс ошибки        | Когда                                                      |
| ------------------- | ---------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0`                               |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope |

## Related

- Spot-аналог: [`BybitPublicSpotMarket.getInstrumentsInfo`](../spot/getInstrumentsInfo.md).

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpublicfuturesmarketgetinstrumentsinfo)
