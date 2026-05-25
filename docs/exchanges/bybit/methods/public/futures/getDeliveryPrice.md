[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicFuturesMarket.getDeliveryPrice`

> `GET /v5/market/delivery-price?category=linear|inverse` · Public · No auth.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/delivery-price)

## Signature

```ts
static getDeliveryPrice(
  ctx: BybitContext,
  params: GetDeliveryPriceParams,
): Promise<GetDeliveryPriceResult>
```

## Parameters

| Поле       | Тип                     | Обяз. | Описание                     |
| ---------- | ----------------------- | ----- | ---------------------------- |
| `category` | `'linear' \| 'inverse'` | Да    | Тип фьючерса.                |
| `symbol`   | `string`                | Нет   | Конкретный символ.           |
| `baseCoin` | `string`                | Нет   | Базовая монета.              |
| `limit`    | `number`                | Нет   | 1..200. По умолчанию 50.     |
| `cursor`   | `string`                | Нет   | Курсор постраничной выборки. |

## Response

```ts
interface GetDeliveryPriceResult {
  category: 'linear' | 'inverse';
  list: DeliveryPriceItem[];
  nextPageCursor?: string;
}

interface DeliveryPriceItem {
  symbol: string;
  deliveryPrice: string;
  deliveryTime: string; // ms, string-encoded integer
}
```

> Эндпоинт имеет смысл только для контрактов с поставкой (futures, не perpetual). Для perpetual он вернёт пустой `list`.

## Example

```ts
import { BybitPublicFuturesMarket } from 'rock-clients';

const { list } = await BybitPublicFuturesMarket.getDeliveryPrice(
  {},
  { category: 'linear', baseCoin: 'BTC', limit: 100 },
);
for (const d of list) {
  console.log(d.symbol, new Date(Number(d.deliveryTime)).toISOString(), d.deliveryPrice);
}
```

## Errors

| Класс ошибки        | Когда                                                      |
| ------------------- | ---------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0`                               |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope |

## Related

- Группа [Market (public)](../../../coverage.md#market-public).

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpublicfuturesmarketgetdeliveryprice)
