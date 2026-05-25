# Changesets

Эта папка управляется [Changesets](https://github.com/changesets/changesets) — инструмент для версионирования и публикации.

## Как пользоваться

1. Сделайте изменения и закоммитьте.
2. Запустите `yarn changeset` — выберите тип бампа (patch / minor / major) и опишите изменение.
3. Закоммитьте созданный markdown-файл из этой папки.
4. Когда PR попадает в `main`, релизный workflow выполнит `changeset version` (бампит версии и обновляет `CHANGELOG.md`) и `changeset publish` (публикует в npm).

> Не редактируйте `config.json` без необходимости.
