[← Документация](../../README.md)

# OKX v5 — клиент

REST-клиент OKX v5. Все методы — `static`, без инстансов. Конфиг передаётся первым аргументом `ctx`. Состояние реализации фиксируется в [coverage.md](coverage.md).

- Official API docs: <https://www.okx.com/docs-v5/en/>
- Base URL: `https://www.okx.com` (для AWS-регионов также доступен `https://aws.okx.com` — задаётся через `ctx.baseUrl`)
- Demo trading: тот же домен, но запросы с заголовком `x-simulated-trading: 1` (включается через `ctx.env = 'demo'`)

## Содержание

- [Quickstart](#quickstart)
- [Контекст и окружение](#контекст-и-окружение)
- [Аутентификация (для приватных методов)](#аутентификация-для-приватных-методов)
- [Ошибки](#ошибки)
- [Реестр покрытия](coverage.md)
- [Детальные страницы методов](#детальные-страницы-методов)

## Quickstart

```ts
import { Okx, OkxPublicCommon } from 'rock-clients';

const [{ ts }] = await Okx.public.common.getSystemTime();
console.log(new Date(Number(ts)).toISOString());

const [{ ts: ts2 }] = await OkxPublicCommon.getSystemTime();
console.log(ts2);
```

Узкий импорт через прямые имена классов предпочтительнее при бандлинге фронтенда — лучше tree-shaking.

## Контекст и окружение

```ts
import type { OkxContext } from 'rock-clients';

const ctx: OkxContext = {
  env: 'demo',
  // baseUrl: 'https://aws.okx.com',
  // fetch: customFetch,
};
```

| Поле          | Тип                                 | По умолчанию          | Описание                                                      |
| ------------- | ----------------------------------- | --------------------- | ------------------------------------------------------------- |
| `env`         | `'live' \| 'demo'`                  | `'live'`              | Демо-режим включает заголовок `x-simulated-trading: 1`        |
| `baseUrl`     | `string`                            | `https://www.okx.com` | Прямое переопределение базового URL (например, `aws.okx.com`) |
| `credentials` | `{ apiKey, apiSecret, passphrase }` | —                     | Обязательно для приватных методов                             |
| `fetch`       | `typeof fetch`                      | `globalThis.fetch`    | Подмена `fetch` (используется в тестах)                       |

> У OKX **нет** отдельного testnet-домена. Демо-торговля работает через тот же `https://www.okx.com`, отличается только заголовком `x-simulated-trading: 1`.

## Аутентификация (для приватных методов)

OKX v5 использует HMAC-SHA256 поверх строки `timestamp + method + requestPath + body`, результат кодируется в base64. Это реализовано в [`OkxSigner`](../../../src/lib/exchanges/okx/http/signer.ts) и автоматически применяется в `OkxHttp.request`, когда `opts.auth === true`.

Сигнал к подписи на уровне типов — приватные методы принимают `OkxAuthenticatedContext`, где `credentials` (включая `passphrase`) обязательны:

```ts
import type { OkxAuthenticatedContext } from 'rock-clients';

const ctx: OkxAuthenticatedContext = {
  env: 'demo',
  credentials: {
    apiKey: process.env.OKX_API_KEY!,
    apiSecret: process.env.OKX_API_SECRET!,
    passphrase: process.env.OKX_PASSPHRASE!,
  },
};
```

Подписанный запрос ставит четыре заголовка: `OK-ACCESS-KEY`, `OK-ACCESS-SIGN`, `OK-ACCESS-TIMESTAMP`, `OK-ACCESS-PASSPHRASE`.

## Ошибки

```ts
import { OkxApiError, OkxNetworkError } from 'rock-clients';

try {
  await OkxPublicCommon.getSystemTime();
} catch (err) {
  if (err instanceof OkxApiError) {
    console.error('OKX rejected:', err.code, err.msg);
  } else if (err instanceof OkxNetworkError) {
    console.error('Transport problem:', err.message, err.cause);
  } else {
    throw err;
  }
}
```

| Класс ошибки      | Когда                                                                                          |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| `OkxApiError`     | OKX вернул `code !== '0'` (доменная ошибка биржи). `code` — **строка**, в отличие от Bybit     |
| `OkxNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope, нет credentials для signed-запроса |

## Layout классов

- `Okx.public.common` — категориально-нейтральные публичные эндпоинты (system time).
- `Okx.public.spot.market` — публичные данные spot-рынка (`instType='SPOT'`).
- `Okx.public.swap.market` — публичные данные perpetual swap (`instType='SWAP'`).
- `Okx.public.futures.market` — публичные данные delivery-futures (`instType='FUTURES'`).
- `Okx.private.spot.{trade, account}` — приватные ручки SPOT (stubs).
- `Okx.private.swap.{trade, position, account}` — приватные ручки SWAP (stubs).
- `Okx.private.futures.{trade, position, account}` — приватные ручки FUTURES (stubs).

## Детальные страницы методов

### Public · Common

- [`OkxPublicCommon.getSystemTime`](methods/public/common/getSystemTime.md) — `GET /api/v5/public/time`

### Public · Spot Market (`instType='SPOT'`)

- [`OkxPublicSpotMarket.getInstruments`](methods/public/spot/getInstruments.md) — `GET /api/v5/public/instruments`
- [`OkxPublicSpotMarket.getTickers`](methods/public/spot/getTickers.md) — `GET /api/v5/market/tickers`
- [`OkxPublicSpotMarket.getTicker`](methods/public/spot/getTicker.md) — `GET /api/v5/market/ticker`
- [`OkxPublicSpotMarket.getOrderbook`](methods/public/spot/getOrderbook.md) — `GET /api/v5/market/books`
- [`OkxPublicSpotMarket.getKline`](methods/public/spot/getKline.md) — `GET /api/v5/market/candles`
- [`OkxPublicSpotMarket.getHistoryKline`](methods/public/spot/getHistoryKline.md) — `GET /api/v5/market/history-candles`
- [`OkxPublicSpotMarket.getRecentTrades`](methods/public/spot/getRecentTrades.md) — `GET /api/v5/market/trades`
- [`OkxPublicSpotMarket.getHistoryTrades`](methods/public/spot/getHistoryTrades.md) — `GET /api/v5/market/history-trades`

### Public · Swap Market (`instType='SWAP'`)

- [`OkxPublicSwapMarket.getInstruments`](methods/public/swap/getInstruments.md) — `GET /api/v5/public/instruments`
- [`OkxPublicSwapMarket.getTickers`](methods/public/swap/getTickers.md) — `GET /api/v5/market/tickers`
- [`OkxPublicSwapMarket.getTicker`](methods/public/swap/getTicker.md) — `GET /api/v5/market/ticker`
- [`OkxPublicSwapMarket.getOrderbook`](methods/public/swap/getOrderbook.md) — `GET /api/v5/market/books`
- [`OkxPublicSwapMarket.getKline`](methods/public/swap/getKline.md) — `GET /api/v5/market/candles`
- [`OkxPublicSwapMarket.getHistoryKline`](methods/public/swap/getHistoryKline.md) — `GET /api/v5/market/history-candles`
- [`OkxPublicSwapMarket.getIndexKline`](methods/public/swap/getIndexKline.md) — `GET /api/v5/market/index-candles`
- [`OkxPublicSwapMarket.getMarkPriceKline`](methods/public/swap/getMarkPriceKline.md) — `GET /api/v5/market/mark-price-candles`
- [`OkxPublicSwapMarket.getRecentTrades`](methods/public/swap/getRecentTrades.md) — `GET /api/v5/market/trades`
- [`OkxPublicSwapMarket.getHistoryTrades`](methods/public/swap/getHistoryTrades.md) — `GET /api/v5/market/history-trades`
- [`OkxPublicSwapMarket.getFundingRate`](methods/public/swap/getFundingRate.md) — `GET /api/v5/public/funding-rate`
- [`OkxPublicSwapMarket.getFundingRateHistory`](methods/public/swap/getFundingRateHistory.md) — `GET /api/v5/public/funding-rate-history`
- [`OkxPublicSwapMarket.getOpenInterest`](methods/public/swap/getOpenInterest.md) — `GET /api/v5/public/open-interest`
- [`OkxPublicSwapMarket.getMarkPrice`](methods/public/swap/getMarkPrice.md) — `GET /api/v5/public/mark-price`
- [`OkxPublicSwapMarket.getPriceLimit`](methods/public/swap/getPriceLimit.md) — `GET /api/v5/public/price-limit`
- [`OkxPublicSwapMarket.getInsuranceFund`](methods/public/swap/getInsuranceFund.md) — `GET /api/v5/public/insurance-fund`

### Public · Futures Market (`instType='FUTURES'`)

- [`OkxPublicFuturesMarket.getInstruments`](methods/public/futures/getInstruments.md) — `GET /api/v5/public/instruments`
- [`OkxPublicFuturesMarket.getTickers`](methods/public/futures/getTickers.md) — `GET /api/v5/market/tickers`
- [`OkxPublicFuturesMarket.getTicker`](methods/public/futures/getTicker.md) — `GET /api/v5/market/ticker`
- [`OkxPublicFuturesMarket.getOrderbook`](methods/public/futures/getOrderbook.md) — `GET /api/v5/market/books`
- [`OkxPublicFuturesMarket.getKline`](methods/public/futures/getKline.md) — `GET /api/v5/market/candles`
- [`OkxPublicFuturesMarket.getHistoryKline`](methods/public/futures/getHistoryKline.md) — `GET /api/v5/market/history-candles`
- [`OkxPublicFuturesMarket.getIndexKline`](methods/public/futures/getIndexKline.md) — `GET /api/v5/market/index-candles`
- [`OkxPublicFuturesMarket.getMarkPriceKline`](methods/public/futures/getMarkPriceKline.md) — `GET /api/v5/market/mark-price-candles`
- [`OkxPublicFuturesMarket.getRecentTrades`](methods/public/futures/getRecentTrades.md) — `GET /api/v5/market/trades`
- [`OkxPublicFuturesMarket.getHistoryTrades`](methods/public/futures/getHistoryTrades.md) — `GET /api/v5/market/history-trades`
- [`OkxPublicFuturesMarket.getOpenInterest`](methods/public/futures/getOpenInterest.md) — `GET /api/v5/public/open-interest`
- [`OkxPublicFuturesMarket.getMarkPrice`](methods/public/futures/getMarkPrice.md) — `GET /api/v5/public/mark-price`
- [`OkxPublicFuturesMarket.getPriceLimit`](methods/public/futures/getPriceLimit.md) — `GET /api/v5/public/price-limit`
- [`OkxPublicFuturesMarket.getInsuranceFund`](methods/public/futures/getInsuranceFund.md) — `GET /api/v5/public/insurance-fund`
- [`OkxPublicFuturesMarket.getEstimatedPrice`](methods/public/futures/getEstimatedPrice.md) — `GET /api/v5/public/estimated-price`
- [`OkxPublicFuturesMarket.getDeliveryExerciseHistory`](methods/public/futures/getDeliveryExerciseHistory.md) — `GET /api/v5/public/delivery-exercise-history`

### Прочие группы

Прогресс — в [coverage.md](coverage.md).

## Сценарии (examples)

Сквозные примеры будут появляться по мере накопления методов. См. каталог `examples/` (создаётся вместе с реальными сценариями).
