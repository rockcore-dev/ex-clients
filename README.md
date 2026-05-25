# rock-clients

> **Zero-dependency** TypeScript-клиенты для криптобирж. Статические классы, явный контекст, разделение `public/private` × `spot/futures`. ESM + CJS + типы.

Первая поддерживаемая биржа — **Bybit v5**. Архитектура спроектирована так, что добавление следующих бирж не меняет общий контракт.

## Принципы

- **Никаких runtime-зависимостей.** Только встроенные `fetch` (Node ≥ 18) и `node:crypto`. См. [supply-chain политику](docs/architecture.md#политика-зависимостей-supply-chain).
- **Статические классы без инстансов.** `new Bybit()` бросает ошибку. Конфигурация передаётся первым аргументом `ctx` в каждый вызов.
- **Каждый метод 1-в-1 с официальной документацией биржи.** Над методом — `@see` ссылка, описание полей, пример.
- **Многослойная документация.** [Хаб](docs/README.md) → [архитектура](docs/architecture.md) → [лендинг биржи](docs/exchanges/bybit/README.md) → [реестр покрытия](docs/exchanges/bybit/coverage.md) → детальные страницы методов.
- **LLM-friendly.** Корневой [`llms.txt`](llms.txt) — компактный гайд для агентов, использующих эту библиотеку.

## Установка

```bash
yarn add rock-clients
# или
npm install rock-clients
```

Node.js ≥ 18.

## Использование

```ts
import { Bybit, BybitPublicCommon } from 'rock-clients';

// Через фасад-неймспейс
const t1 = await Bybit.public.common.getServerTime({ env: 'testnet' });

// Или узким импортом (лучший tree-shaking)
const t2 = await BybitPublicCommon.getServerTime({ env: 'testnet' });

console.log(t1.timeSecond); // '1700000000'
```

Приватные методы получают `BybitAuthenticatedContext` (credentials обязательны на уровне типов):

```ts
import { Bybit } from 'rock-clients';

await Bybit.private.spot.trade.placeOrder(
  {
    env: 'testnet',
    credentials: {
      apiKey: process.env.BYBIT_TESTNET_API_KEY!,
      apiSecret: process.env.BYBIT_TESTNET_API_SECRET!,
    },
  },
  { symbol: 'BTCUSDT', side: 'Buy', orderType: 'Market', qty: '0.001' },
);
```

> Пример выше — иллюстрация будущего API. В текущей версии реализован только `BybitPublicCommon.getServerTime`. Полный статус — в [coverage.md](docs/exchanges/bybit/coverage.md).

CommonJS работает аналогично:

```js
const { Bybit } = require('rock-clients');
```

## Документация

- [`docs/`](docs/README.md) — хаб документации.
- [`docs/architecture.md`](docs/architecture.md) — слои, контекст, статические классы, supply-chain.
- [`docs/exchanges/bybit/README.md`](docs/exchanges/bybit/README.md) — лендинг Bybit (quickstart, аутентификация, ошибки).
- [`docs/exchanges/bybit/coverage.md`](docs/exchanges/bybit/coverage.md) — полный реестр ручек Bybit v5 со статусами `done` / `todo`.
- [`llms.txt`](llms.txt) — компактный гайд для LLM-агентов.

## Скрипты

| Команда                 | Назначение                                   |
| ----------------------- | -------------------------------------------- |
| `yarn dev`              | tsup в watch-режиме                          |
| `yarn build`            | production-сборка (ESM + CJS + `.d.ts`)      |
| `yarn typecheck`        | `tsc --noEmit`                               |
| `yarn lint`             | ESLint                                       |
| `yarn lint:fix`         | ESLint с автофиксом                          |
| `yarn format`           | Prettier --write                             |
| `yarn format:check`     | Prettier --check                             |
| `yarn test`             | Unit-тесты (vitest)                          |
| `yarn test:unit`        | Унит-тесты явно                              |
| `yarn test:integration` | Интеграционные тесты против Bybit testnet    |
| `yarn test:coverage`    | Тесты с покрытием (порог 80%)                |
| `yarn changeset`        | Создать запись changeset для будущего релиза |

## Интеграционные тесты

Запускаются отдельной командой и реально стучатся в `https://api-testnet.bybit.com`:

```bash
cp .env.example .env
# опционально заполнить BYBIT_TESTNET_API_KEY / BYBIT_TESTNET_API_SECRET для приватных тестов
yarn test:integration
```

Без ключей публичные тесты проходят; приватные тесты будут пропущены через `it.skipIf` (детали — в `tests/integration/setup.ts`).

## Релизы

Версионирование и публикация — через [Changesets](https://github.com/changesets/changesets).

1. `yarn changeset` — выбрать тип изменения и описать.
2. Закоммитить и открыть PR.
3. После мерджа в `main` workflow `Release` автоматически создаст PR с бампом версии или опубликует в npm.

## Лицензия

[MIT](./LICENSE)
