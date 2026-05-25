[← Документация](../../README.md) · [← OKX](README.md)

# OKX v5 — реестр покрытия

Снимок состояния реализации REST-эндпоинтов OKX v5 в `rock-clients`. Источник истины: [официальная документация OKX](https://www.okx.com/docs-v5/en/).

## Легенда

| Символ | Значение                                     |
| ------ | -------------------------------------------- |
| ✅     | реализовано, покрыто unit-тестами            |
| 🟡     | в работе                                     |
| ⏳     | в планах                                     |
| 🚫     | вне scope (например, Options) — без обещаний |

## Сводка

| Группа                    | total | done | wip | todo | oos |
| ------------------------- | ----: | ---: | --: | ---: | --: |
| Public · Common           |     1 |    1 |   0 |    0 |   0 |
| Public · Market (Spot)    |     8 |    8 |   0 |    0 |   0 |
| Public · Market (Swap)    |    16 |   16 |   0 |    0 |   0 |
| Public · Market (Futures) |    16 |   16 |   0 |    0 |   0 |
| Private · Spot            |     — |    — |   — |    — |   — |
| Private · Swap            |     — |    — |   — |    — |   — |
| Private · Futures         |     — |    — |   — |    — |   — |

## Public · Common

| Метод           | Endpoint                  | Status | Page                                                       |
| --------------- | ------------------------- | :----: | ---------------------------------------------------------- |
| `getSystemTime` | `GET /api/v5/public/time` |   ✅   | [getSystemTime.md](methods/public/common/getSystemTime.md) |

## Public · Market (Spot, `instType='SPOT'`)

| Метод              | Endpoint                             | Status | Page                                                           |
| ------------------ | ------------------------------------ | :----: | -------------------------------------------------------------- |
| `getInstruments`   | `GET /api/v5/public/instruments`     |   ✅   | [getInstruments.md](methods/public/spot/getInstruments.md)     |
| `getTickers`       | `GET /api/v5/market/tickers`         |   ✅   | [getTickers.md](methods/public/spot/getTickers.md)             |
| `getTicker`        | `GET /api/v5/market/ticker`          |   ✅   | [getTicker.md](methods/public/spot/getTicker.md)               |
| `getOrderbook`     | `GET /api/v5/market/books`           |   ✅   | [getOrderbook.md](methods/public/spot/getOrderbook.md)         |
| `getKline`         | `GET /api/v5/market/candles`         |   ✅   | [getKline.md](methods/public/spot/getKline.md)                 |
| `getHistoryKline`  | `GET /api/v5/market/history-candles` |   ✅   | [getHistoryKline.md](methods/public/spot/getHistoryKline.md)   |
| `getRecentTrades`  | `GET /api/v5/market/trades`          |   ✅   | [getRecentTrades.md](methods/public/spot/getRecentTrades.md)   |
| `getHistoryTrades` | `GET /api/v5/market/history-trades`  |   ✅   | [getHistoryTrades.md](methods/public/spot/getHistoryTrades.md) |

## Public · Market (Swap, `instType='SWAP'`)

| Метод                   | Endpoint                                  | Status | Page                                                                     |
| ----------------------- | ----------------------------------------- | :----: | ------------------------------------------------------------------------ |
| `getInstruments`        | `GET /api/v5/public/instruments`          |   ✅   | [getInstruments.md](methods/public/swap/getInstruments.md)               |
| `getTickers`            | `GET /api/v5/market/tickers`              |   ✅   | [getTickers.md](methods/public/swap/getTickers.md)                       |
| `getTicker`             | `GET /api/v5/market/ticker`               |   ✅   | [getTicker.md](methods/public/swap/getTicker.md)                         |
| `getOrderbook`          | `GET /api/v5/market/books`                |   ✅   | [getOrderbook.md](methods/public/swap/getOrderbook.md)                   |
| `getKline`              | `GET /api/v5/market/candles`              |   ✅   | [getKline.md](methods/public/swap/getKline.md)                           |
| `getHistoryKline`       | `GET /api/v5/market/history-candles`      |   ✅   | [getHistoryKline.md](methods/public/swap/getHistoryKline.md)             |
| `getIndexKline`         | `GET /api/v5/market/index-candles`        |   ✅   | [getIndexKline.md](methods/public/swap/getIndexKline.md)                 |
| `getMarkPriceKline`     | `GET /api/v5/market/mark-price-candles`   |   ✅   | [getMarkPriceKline.md](methods/public/swap/getMarkPriceKline.md)         |
| `getRecentTrades`       | `GET /api/v5/market/trades`               |   ✅   | [getRecentTrades.md](methods/public/swap/getRecentTrades.md)             |
| `getHistoryTrades`      | `GET /api/v5/market/history-trades`       |   ✅   | [getHistoryTrades.md](methods/public/swap/getHistoryTrades.md)           |
| `getFundingRate`        | `GET /api/v5/public/funding-rate`         |   ✅   | [getFundingRate.md](methods/public/swap/getFundingRate.md)               |
| `getFundingRateHistory` | `GET /api/v5/public/funding-rate-history` |   ✅   | [getFundingRateHistory.md](methods/public/swap/getFundingRateHistory.md) |
| `getOpenInterest`       | `GET /api/v5/public/open-interest`        |   ✅   | [getOpenInterest.md](methods/public/swap/getOpenInterest.md)             |
| `getMarkPrice`          | `GET /api/v5/public/mark-price`           |   ✅   | [getMarkPrice.md](methods/public/swap/getMarkPrice.md)                   |
| `getPriceLimit`         | `GET /api/v5/public/price-limit`          |   ✅   | [getPriceLimit.md](methods/public/swap/getPriceLimit.md)                 |
| `getInsuranceFund`      | `GET /api/v5/public/insurance-fund`       |   ✅   | [getInsuranceFund.md](methods/public/swap/getInsuranceFund.md)           |

## Public · Market (Futures, `instType='FUTURES'`)

| Метод                        | Endpoint                                       | Status | Page                                                                                  |
| ---------------------------- | ---------------------------------------------- | :----: | ------------------------------------------------------------------------------------- |
| `getInstruments`             | `GET /api/v5/public/instruments`               |   ✅   | [getInstruments.md](methods/public/futures/getInstruments.md)                         |
| `getTickers`                 | `GET /api/v5/market/tickers`                   |   ✅   | [getTickers.md](methods/public/futures/getTickers.md)                                 |
| `getTicker`                  | `GET /api/v5/market/ticker`                    |   ✅   | [getTicker.md](methods/public/futures/getTicker.md)                                   |
| `getOrderbook`               | `GET /api/v5/market/books`                     |   ✅   | [getOrderbook.md](methods/public/futures/getOrderbook.md)                             |
| `getKline`                   | `GET /api/v5/market/candles`                   |   ✅   | [getKline.md](methods/public/futures/getKline.md)                                     |
| `getHistoryKline`            | `GET /api/v5/market/history-candles`           |   ✅   | [getHistoryKline.md](methods/public/futures/getHistoryKline.md)                       |
| `getIndexKline`              | `GET /api/v5/market/index-candles`             |   ✅   | [getIndexKline.md](methods/public/futures/getIndexKline.md)                           |
| `getMarkPriceKline`          | `GET /api/v5/market/mark-price-candles`        |   ✅   | [getMarkPriceKline.md](methods/public/futures/getMarkPriceKline.md)                   |
| `getRecentTrades`            | `GET /api/v5/market/trades`                    |   ✅   | [getRecentTrades.md](methods/public/futures/getRecentTrades.md)                       |
| `getHistoryTrades`           | `GET /api/v5/market/history-trades`            |   ✅   | [getHistoryTrades.md](methods/public/futures/getHistoryTrades.md)                     |
| `getOpenInterest`            | `GET /api/v5/public/open-interest`             |   ✅   | [getOpenInterest.md](methods/public/futures/getOpenInterest.md)                       |
| `getMarkPrice`               | `GET /api/v5/public/mark-price`                |   ✅   | [getMarkPrice.md](methods/public/futures/getMarkPrice.md)                             |
| `getPriceLimit`              | `GET /api/v5/public/price-limit`               |   ✅   | [getPriceLimit.md](methods/public/futures/getPriceLimit.md)                           |
| `getInsuranceFund`           | `GET /api/v5/public/insurance-fund`            |   ✅   | [getInsuranceFund.md](methods/public/futures/getInsuranceFund.md)                     |
| `getEstimatedPrice`          | `GET /api/v5/public/estimated-price`           |   ✅   | [getEstimatedPrice.md](methods/public/futures/getEstimatedPrice.md)                   |
| `getDeliveryExerciseHistory` | `GET /api/v5/public/delivery-exercise-history` |   ✅   | [getDeliveryExerciseHistory.md](methods/public/futures/getDeliveryExerciseHistory.md) |

## Private · что осталось

Приватные эндпоинты OKX (trade, account, position) пока представлены пустыми классами-stubs (`OkxPrivateSpotTrade`, `OkxPrivateSpotAccount`, `OkxPrivateSwapTrade`, `OkxPrivateSwapPosition`, `OkxPrivateSwapAccount`, `OkxPrivateFuturesTrade`, `OkxPrivateFuturesPosition`, `OkxPrivateFuturesAccount`). Они нужны для согласованной формы facade `Okx.private.*` и будут наполняться итеративно.

Транспорт уже умеет подписывать запросы (см. [`OkxSigner`](../../../src/lib/exchanges/okx/http/signer.ts) и `OkxHttp.request({ ..., auth: true })`), а тип `OkxAuthenticatedContext` гарантирует, что забыть credentials — ошибка компиляции.

## Out of scope (`option`)

OKX `instType='OPTION'` не покрыт — методы на опционы (`/api/v5/public/opt-summary`, `/api/v5/market/option/*` и т.п.) выходят за рамки текущей итерации.
