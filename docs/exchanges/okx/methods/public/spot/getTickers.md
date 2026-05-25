[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)

# `OkxPublicSpotMarket.getTickers`

> `GET /api/v5/market/tickers` (с `instType=SPOT`) · Public · No auth.

[OKX official docs ↗](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-rest-api-get-tickers)

## Signature

```ts
static getTickers(
  ctx: OkxContext,
  params?: GetSpotTickersParams,
): Promise<GetSpotTickersResult>
```

## Parameters

| Field        | Type   | Required | Описание                                            |
| ------------ | ------ | :------: | --------------------------------------------------- |
| `uly`        | string |    no    | Не используется для SPOT, оставлено как passthrough |
| `instFamily` | string |    no    | Не используется для SPOT, оставлено как passthrough |

`instType=SPOT` подставляется автоматически.

## Response

```ts
type GetSpotTickersResult = SpotTicker[]; // OkxTickerCommonFields<'SPOT'>[]
```

Поля тикера: `instType`, `instId`, `last`, `lastSz`, `askPx`, `askSz`, `bidPx`, `bidSz`, `open24h`, `high24h`, `low24h`, `vol24h`, `volCcy24h`, `ts`, `sodUtc0`, `sodUtc8`. Все числа — строки.

## Example

```ts
import { OkxPublicSpotMarket } from 'rock-clients';

const tickers = await OkxPublicSpotMarket.getTickers({});
const btc = tickers.find((t) => t.instId === 'BTC-USDT');
console.log(btc?.last);
```

## Errors

См. [«Ошибки» в `OKX/README.md`](../../../README.md#ошибки).

---

[← OKX](../../../README.md) · [← Coverage](../../../coverage.md)
