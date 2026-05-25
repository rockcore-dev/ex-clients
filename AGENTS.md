# AGENTS.md — правила для AI-агентов в проекте `rock-clients`

> Этот файл — авторитетный источник правил для любых агентов (Cursor, Claude Code, Codex, GitHub Copilot Workspace и пр.), работающих в репозитории. Соблюдай его в первую очередь, а уже затем общие соглашения.

## 1. Назначение и архитектура

- Это **TypeScript-библиотека для npm**. Всё, что не относится к публичному API, не должно попадать в `dist`.
- Точка входа — `src/index.ts`. Только из неё реэкспортируется публичный API.
- Внутренняя реализация лежит в `src/lib/**`. Не экспортируй внутренности из `index.ts`, если это не часть публичного контракта.
- Целевой рантайм — **Node.js >= 18**. Не используй браузерные API (`window`, `document`, `fetch` без полифилла) без явного запроса.

## 2. Менеджер пакетов

- Используем **yarn** (Yarn 1.x classic). Не запускай `npm install` / `pnpm install`.
- Для добавления зависимостей: `yarn add <pkg>` (runtime) или `yarn add -D <pkg>` (dev).
- Не редактируй `yarn.lock` руками. Не коммить локфайл, сгенерированный другим менеджером.

## 3. Сборка

- Бандлер: **tsup** (`tsup.config.ts`). Форматы: `esm` (`dist/index.js`) + `cjs` (`dist/index.cjs`) + типы (`dist/index.d.ts`).
- Сборка должна оставаться dual-format. Не убирай ESM или CJS без явного запроса.
- Изменения в `package.json#exports`, `main`, `module`, `types`, `files` должны быть согласованы между собой.
- Команда сборки: `yarn build`. Артефакты — только в `dist/`.

## 4. TypeScript

- Конфиги:
  - `tsconfig.json` — для редактора, тестов и `tsc --noEmit`.
  - `tsconfig.build.json` — для tsup; включает только `src` и исключает тесты.
- Включён `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`. **Не ослабляй** без обоснования.
- Импорты внутри `src/` — с расширением `.js` (ESM-стиль), даже для `.ts` файлов: `import { x } from './lib/x.js';`. Это требование ESM-резолвинга.
- Не используй `any`. Если действительно нужно — `unknown` + сужение типа.

## 5. Тесты

- Фреймворк: **vitest**. Файлы — `tests/**/*.test.ts` или рядом с кодом как `*.test.ts`.
- Любая новая публичная функция/класс **обязана** иметь тесты.
- Запуск: `yarn test`. Покрытие: `yarn test:coverage` (порог — 80% lines/functions/statements).

## 6. Линтинг и форматирование

- ESLint flat config (`eslint.config.js`) + `typescript-eslint` (typed rules) + Prettier.
- Перед коммитом проходит `lint-staged` через Husky pre-commit hook. Не отключай хуки (`--no-verify`) без явного запроса пользователя.
- Запуск вручную: `yarn lint`, `yarn lint:fix`, `yarn format`, `yarn format:check`.

## 7. Версионирование и релизы

- Используем **Changesets**. Не правь версии в `package.json` руками.
- Алгоритм:
  1. Сделать изменения.
  2. `yarn changeset` — выбрать `patch` / `minor` / `major`, описать понятным языком.
  3. Закоммитить созданный markdown-файл из `.changeset/`.
  4. После мерджа в `main` GitHub Actions либо создаст PR с бампом версии, либо опубликует в npm.
- Не запускай `npm publish` / `yarn publish` локально.

## 8. CI

- `.github/workflows/ci.yml` — lint + format check + typecheck + tests + build на Node 18/20/22.
- `.github/workflows/release.yml` — релизный пайплайн через `changesets/action`.
- Если меняешь скрипты в `package.json`, синхронизируй их с CI.

## 9. Стиль коммитов и PR

- Краткое описание в императиве: «add X», «fix Y», «refactor Z». Можно следовать Conventional Commits, но это не обязательно.
- Перед коммитом: `yarn typecheck && yarn lint && yarn test && yarn build` должны проходить.
- Не коммить `dist/`, `coverage/`, `node_modules/`.

## 10. Что агентам нельзя

- Не публикуй пакет (`npm publish` / `yarn publish`).
- Не меняй `name` пакета и `publishConfig.access` без запроса.
- Не добавляй runtime-зависимости в `dependencies`, если они не используются в `src/`. Сборочные / тестовые — только в `devDependencies`.
- Не отключай TypeScript-strict-флаги.
- Не отключай Husky-хуки.
- Не модифицируй `.changeset/config.json`, `tsconfig.build.json` и `tsup.config.ts` без явной задачи.

## 11. Полезные команды

```bash
yarn install           # установка зависимостей
yarn dev               # сборка в watch
yarn build             # production-сборка
yarn typecheck         # tsc --noEmit
yarn lint              # ESLint
yarn test              # vitest run
yarn changeset         # запись изменения для релиза
```
