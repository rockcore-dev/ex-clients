[← Документация](../../README.md)

# Bybit v5 — клиент

REST-клиент Bybit v5. Все методы — `static`, без инстансов. Конфиг передаётся первым аргументом `ctx`. Состояние реализации фиксируется в [coverage.md](coverage.md).

- Official API docs: <https://bybit-exchange.github.io/docs/v5/intro>
- Base URLs:
  - mainnet — `https://api.bybit.com`
  - testnet — `https://api-testnet.bybit.com`

## Содержание

- [Quickstart](#quickstart)
- [Контекст и окружение](#контекст-и-окружение)
- [Аутентификация (для приватных методов)](#аутентификация-для-приватных-методов)
- [Ошибки](#ошибки)
- [Реестр покрытия](coverage.md)
- [Детальные страницы методов](#детальные-страницы-методов)

## Quickstart

```ts
import { Bybit, BybitPublicCommon } from 'rock-clients';

const t1 = await Bybit.public.common.getServerTime({ env: 'testnet' });
console.log(t1.timeSecond); // '1700000000'

const t2 = await BybitPublicCommon.getServerTime({ env: 'testnet' });
console.log(t2.timeSecond);
```

Узкий импорт (через прямые имена классов) предпочтительнее при бандлинге фронтенда — он даёт лучший tree-shaking.

## Контекст и окружение

```ts
import type { BybitContext } from 'rock-clients';

const ctx: BybitContext = {
  env: 'testnet',
  recvWindow: 5000,
  // baseUrl: 'https://my-proxy.example/bybit',
  // fetch: customFetch,
};
```

| Поле          | Тип                      | По умолчанию         | Описание                                               |
| ------------- | ------------------------ | -------------------- | ------------------------------------------------------ |
| `env`         | `'mainnet' \| 'testnet'` | `'mainnet'`          | Пресет базового URL                                    |
| `baseUrl`     | `string`                 | вычисляется из `env` | Прямое переопределение базового URL (например, прокси) |
| `credentials` | `{ apiKey, apiSecret }`  | —                    | Обязательно для приватных методов                      |
| `recvWindow`  | `number`                 | `5000`               | recv_window для подписанных запросов (ms)              |
| `fetch`       | `typeof fetch`           | `globalThis.fetch`   | Подмена fetch (используется в тестах)                  |

## Аутентификация (для приватных методов)

Bybit v5 использует HMAC-SHA256 поверх строки `timestamp + apiKey + recvWindow + payload`. Это реализовано в [`BybitSigner`](../../../src/lib/exchanges/bybit/http/signer.ts) и автоматически применяется в `BybitHttp.request`, когда `opts.auth === true`.

Сигнал к подписи на уровне типов — приватные методы принимают `BybitAuthenticatedContext`, где `credentials` обязательны:

```ts
import type { BybitAuthenticatedContext } from 'rock-clients';

const ctx: BybitAuthenticatedContext = {
  env: 'testnet',
  credentials: {
    apiKey: process.env.BYBIT_TESTNET_API_KEY!,
    apiSecret: process.env.BYBIT_TESTNET_API_SECRET!,
  },
};
```

Тестовые ключи можно получить на <https://testnet.bybit.com> (Login → API Management). См. также `.env.example` в корне репозитория.

## Ошибки

```ts
import { BybitApiError, BybitNetworkError } from 'rock-clients';

try {
  await BybitPublicCommon.getServerTime({ env: 'testnet' });
} catch (err) {
  if (err instanceof BybitApiError) {
    console.error('Bybit rejected:', err.retCode, err.retMsg);
  } else if (err instanceof BybitNetworkError) {
    console.error('Transport problem:', err.message, err.cause);
  } else {
    throw err;
  }
}
```

| Класс ошибки        | Когда                                                                                          |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0` (доменная ошибка биржи)                                           |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope, нет credentials для signed-запроса |

## Layout классов

- `Bybit.public.common` — категориально-нейтральные публичные эндпоинты (server time, ...).
- `Bybit.public.spot.market` — публичные данные spot-рынка.
- `Bybit.public.futures.market` — публичные данные linear / inverse фьючерсов.
- `Bybit.private.spot.trade` — приватные torговые операции spot.
- `Bybit.private.spot.account` — приватные операции аккаунта spot.
- `Bybit.private.futures.trade` — приватные торговые операции linear / inverse.
- `Bybit.private.futures.position` — позиции, плечо, режимы маржи, trading stops.
- `Bybit.private.futures.account` — кошельки, исполнения, transaction log.

## Детальные страницы методов

### Public · Common

- [`BybitPublicCommon.getServerTime`](methods/public/common/getServerTime.md) — `GET /v5/market/time`
- [`BybitPublicCommon.getInsurance`](methods/public/common/getInsurance.md) — `GET /v5/market/insurance`

### Public · Spot Market

- [`BybitPublicSpotMarket.getKline`](methods/public/spot/getKline.md) — `GET /v5/market/kline?category=spot`
- [`BybitPublicSpotMarket.getInstrumentsInfo`](methods/public/spot/getInstrumentsInfo.md) — `GET /v5/market/instruments-info?category=spot`
- [`BybitPublicSpotMarket.getOrderbook`](methods/public/spot/getOrderbook.md) — `GET /v5/market/orderbook?category=spot`
- [`BybitPublicSpotMarket.getTickers`](methods/public/spot/getTickers.md) — `GET /v5/market/tickers?category=spot`
- [`BybitPublicSpotMarket.getRecentTrades`](methods/public/spot/getRecentTrades.md) — `GET /v5/market/recent-trade?category=spot`

### Public · Futures Market

- [`BybitPublicFuturesMarket.getKline`](methods/public/futures/getKline.md) — `GET /v5/market/kline?category=linear|inverse`
- [`BybitPublicFuturesMarket.getMarkPriceKline`](methods/public/futures/getMarkPriceKline.md) — `GET /v5/market/mark-price-kline`
- [`BybitPublicFuturesMarket.getIndexPriceKline`](methods/public/futures/getIndexPriceKline.md) — `GET /v5/market/index-price-kline`
- [`BybitPublicFuturesMarket.getPremiumIndexPriceKline`](methods/public/futures/getPremiumIndexPriceKline.md) — `GET /v5/market/premium-index-price-kline` (linear only)
- [`BybitPublicFuturesMarket.getInstrumentsInfo`](methods/public/futures/getInstrumentsInfo.md) — `GET /v5/market/instruments-info?category=linear|inverse`
- [`BybitPublicFuturesMarket.getOrderbook`](methods/public/futures/getOrderbook.md) — `GET /v5/market/orderbook?category=linear|inverse`
- [`BybitPublicFuturesMarket.getTickers`](methods/public/futures/getTickers.md) — `GET /v5/market/tickers?category=linear|inverse`
- [`BybitPublicFuturesMarket.getFundingRateHistory`](methods/public/futures/getFundingRateHistory.md) — `GET /v5/market/funding/history`
- [`BybitPublicFuturesMarket.getRecentTrades`](methods/public/futures/getRecentTrades.md) — `GET /v5/market/recent-trade?category=linear|inverse`
- [`BybitPublicFuturesMarket.getOpenInterest`](methods/public/futures/getOpenInterest.md) — `GET /v5/market/open-interest`
- [`BybitPublicFuturesMarket.getRiskLimit`](methods/public/futures/getRiskLimit.md) — `GET /v5/market/risk-limit`
- [`BybitPublicFuturesMarket.getDeliveryPrice`](methods/public/futures/getDeliveryPrice.md) — `GET /v5/market/delivery-price`
- [`BybitPublicFuturesMarket.getLongShortRatio`](methods/public/futures/getLongShortRatio.md) — `GET /v5/market/account-ratio`

### Прочие группы

Прогресс — в [coverage.md](coverage.md).

## Сценарии (examples)

Сквозные примеры будут появляться по мере накопления методов. См. каталог `examples/`.
