[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicFuturesMarket.getLongShortRatio`

> `GET /v5/market/account-ratio?category=linear|inverse` · Public · No auth.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/long-short-ratio)

## Signature

```ts
static getLongShortRatio(
  ctx: BybitContext,
  params: GetLongShortRatioParams,
): Promise<GetLongShortRatioResult>
```

## Parameters

| Поле       | Тип                                                    | Обяз. | Описание                 |
| ---------- | ------------------------------------------------------ | ----- | ------------------------ |
| `category` | `'linear' \| 'inverse'`                                | Да    | Тип фьючерса.            |
| `symbol`   | `string`                                               | Да    | Тикер.                   |
| `period`   | `'5min' \| '15min' \| '30min' \| '1h' \| '4h' \| '4d'` | Да    | Период агрегации.        |
| `limit`    | `number`                                               | Нет   | 1..500. По умолчанию 50. |

## Response

```ts
interface GetLongShortRatioResult {
  list: LongShortRatioItem[];
}

interface LongShortRatioItem {
  symbol: string;
  buyRatio: string; // например, '0.55' = 55%
  sellRatio: string; // например, '0.45' = 45%
  timestamp: string; // ms, string-encoded integer
}
```

`buyRatio + sellRatio` суммируется в `1.0` (с округлением).

## Example

```ts
import { BybitPublicFuturesMarket } from 'rock-clients';

const { list } = await BybitPublicFuturesMarket.getLongShortRatio(
  {},
  { category: 'linear', symbol: 'BTCUSDT', period: '1h', limit: 24 },
);
for (const item of list) {
  console.log(
    new Date(Number(item.timestamp)).toISOString(),
    `long ${(Number(item.buyRatio) * 100).toFixed(1)}%`,
    `short ${(Number(item.sellRatio) * 100).toFixed(1)}%`,
  );
}
```

## Errors

| Класс ошибки        | Когда                                                      |
| ------------------- | ---------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0`                               |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope |

## Related

- [`getOpenInterest`](getOpenInterest.md) — динамика открытого интереса.

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpublicfuturesmarketgetlongshortratio)
