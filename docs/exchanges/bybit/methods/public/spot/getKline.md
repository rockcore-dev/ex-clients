[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicSpotMarket.getKline`

> `GET /v5/market/kline?category=spot` · Public · No auth.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/kline)

## Signature

```ts
static getKline(
  ctx: BybitContext,
  params: GetSpotKlineParams,
): Promise<GetSpotKlineResult>
```

`category` фиксирован как `'spot'` — в параметрах не передаётся.

## Parameters

| Поле       | Тип             | Обяз. | Описание                                                                                             |
| ---------- | --------------- | ----- | ---------------------------------------------------------------------------------------------------- |
| `symbol`   | `string`        | Да    | Тикер инструмента, например `'BTCUSDT'`.                                                             |
| `interval` | `KlineInterval` | Да    | `'1' \| '3' \| '5' \| '15' \| '30' \| '60' \| '120' \| '240' \| '360' \| '720' \| 'D' \| 'W' \| 'M'` |
| `start`    | `number`        | Нет   | Начало диапазона, ms.                                                                                |
| `end`      | `number`        | Нет   | Конец диапазона, ms.                                                                                 |
| `limit`    | `number`        | Нет   | 1..1000. По умолчанию 200.                                                                           |

## Response

```ts
interface GetSpotKlineResult {
  category: 'spot';
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

Каждая свеча — массив из 7 строк фиксированного порядка. Сохраняется формат Bybit (числа не парсятся в `number`, чтобы не терять точность).

## Example

```ts
import { BybitPublicSpotMarket } from 'rock-clients';

const { list } = await BybitPublicSpotMarket.getKline(
  { env: 'testnet' },
  { symbol: 'BTCUSDT', interval: '60', limit: 5 },
);

for (const [start, open, high, low, close, volume, turnover] of list) {
  console.log(new Date(Number(start)).toISOString(), { open, high, low, close, volume, turnover });
}
```

## Errors

| Класс ошибки        | Когда                                                      |
| ------------------- | ---------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0` (например, неверный `symbol`) |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope |

## Related

- Группа [Market (public)](../../../coverage.md#market-public).
- Futures-аналог: [`BybitPublicFuturesMarket.getKline`](../futures/getKline.md).

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpublicspotmarketgetkline)
