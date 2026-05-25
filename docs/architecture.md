[← Документация](README.md)

# Архитектура `rock-clients`

## Дизайн в одну строку

Многослойная zero-dependency TypeScript-библиотека для криптобирж. Все клиенты — **классы со static-методами без инстансов**. Все вызовы принимают первым аргументом контекст `ctx`, в котором передаются окружение и (опционально) credentials.

## Слои

```
+----------------------------------------------------------+
| L3. REST endpoint groups                                  |
|     BybitPublicCommon, BybitPublicSpotMarket, ...         |
|     BybitPrivateSpotTrade, BybitPrivateFuturesPosition... |
+----------------------------------------------------------+
| L2. Auth / Signing                                        |
|     BybitSigner.sign(...) — HMAC-SHA256 для v5            |
+----------------------------------------------------------+
| L1. Transport                                             |
|     BybitHttp.request(ctx, opts)                          |
|     - parsing the {retCode, retMsg, result} envelope      |
|     - BybitApiError / BybitNetworkError                   |
+----------------------------------------------------------+
| L0. Built-ins                                             |
|     globalThis.fetch, node:crypto, URLSearchParams        |
+----------------------------------------------------------+
```

Композиция: класс-неймспейс `Bybit` со static-property `Bybit.public.*` и `Bybit.private.*`, указывающими на соответствующие классы L3.

## Дименсии разбиения для каждой биржи

`{public | private} × {spot | futures}` — четыре поверхности клиента. Дополнительно у Bybit есть `common` для категориально-нейтральных public-эндпоинтов (например, server time).

| Класс                         | Тип данных | Тип рынка                  |
| ----------------------------- | ---------- | -------------------------- |
| `BybitPublicCommon`           | public     | —                          |
| `BybitPublicSpotMarket`       | public     | spot                       |
| `BybitPublicFuturesMarket`    | public     | futures (linear / inverse) |
| `BybitPrivateSpotTrade`       | private    | spot                       |
| `BybitPrivateSpotAccount`     | private    | spot                       |
| `BybitPrivateFuturesTrade`    | private    | futures                    |
| `BybitPrivateFuturesPosition` | private    | futures                    |
| `BybitPrivateFuturesAccount`  | private    | futures                    |

## Почему static, а не инстансы

- **Нет скрытого состояния.** Один процесс может работать с разными аккаунтами и средами одновременно без риска race-conditions через общий клиент.
- **Tree-shaking.** Импорт `BybitPublicCommon.getServerTime` тащит в bundle только то, что нужно.
- **Простота для LLM-агентов.** Меньше понятий — нет необходимости помнить, какой инстанс какой config держит. Контекст всегда явно виден в коде вызова.
- **Тестируемость.** `ctx.fetch` можно подменить в каждом вызове независимо, без моков на уровне модуля.

Защита: каждый класс имеет `private constructor()` с `throw new Error(...)` внутри. На уровне типов `new` запрещён, на уровне рантайма — тоже.

## Контекст

```ts
export interface BybitContext {
  env?: 'mainnet' | 'testnet';
  baseUrl?: string;
  credentials?: { apiKey: string; apiSecret: string };
  recvWindow?: number;
  fetch?: typeof fetch;
}

export type BybitAuthenticatedContext = BybitContext & {
  credentials: { apiKey: string; apiSecret: string };
};
```

- Публичные методы принимают `BybitContext` (credentials опциональны и игнорируются).
- Приватные методы принимают `BybitAuthenticatedContext` — пропуск credentials становится ошибкой компиляции.

## Политика зависимостей (supply chain)

Подробности — в `AGENTS.md`, секциях 2 и 10. Краткий список запретов:

- Сторонние HTTP-клиенты: `axios`, `got`, `node-fetch`, `ofetch`, `undici`, `request`, `superagent`, `phin`, `needle`.
- Сторонние крипто-обёртки: `crypto-js`, `js-sha256`, `hmac-sha256`. Всё подписывается через `node:crypto`.
- Любые «удобные мега-пакеты» с большим transitive-surface (`lodash` целиком и т.п.).

`dependencies` в `package.json` намеренно остаётся **пустым**. Любая dev-зависимость требует обоснования и проверки `npm audit` перед добавлением.

## Слои документации

| Слой | Аудитория             | Файлы                                                             |
| ---- | --------------------- | ----------------------------------------------------------------- |
| L0   | Витрина / описание    | [`README.md`](../README.md)                                       |
| L1   | LLM-агенты downstream | [`llms.txt`](../llms.txt)                                         |
| L2   | Хаб документации      | [`docs/README.md`](README.md)                                     |
| L2   | Контрибьюторы         | [`docs/architecture.md`](architecture.md) (этот файл)             |
| L3   | Пользователи Bybit    | [`docs/exchanges/bybit/README.md`](exchanges/bybit/README.md)     |
| L3   | Реестр покрытия       | [`docs/exchanges/bybit/coverage.md`](exchanges/bybit/coverage.md) |
| L4   | Пользователи метода   | `docs/exchanges/bybit/methods/<scope>/<group>/<name>.md`          |
| L4   | Сценарии              | `docs/exchanges/bybit/examples/*.md`                              |

## Definition of done для нового метода

1. Добавить TS-типы запроса/ответа.
2. Добавить `static`-метод в нужный класс по JSDoc-шаблону (см. `BybitPublicCommon.getServerTime`).
3. Unit-тест (мок `fetch`) + интеграционный тест против testnet.
4. Обновить [`coverage.md`](exchanges/bybit/coverage.md): `todo` → `done`, проставить ссылку на L4-страницу.
5. Создать L4-страницу `docs/exchanges/bybit/methods/<scope>/<group>/<name>.md` по шаблону `methods/public/common/getServerTime.md`.
6. Обновить «Available methods» в [`llms.txt`](../llms.txt).
7. `yarn changeset`.
