# Документация `rock-clients`

Это хаб документации проекта. Здесь собраны:

- [Архитектура](architecture.md) — слои, контекст, политика статических классов, supply-chain.
- [`llms.txt`](../llms.txt) — компактный гайд для LLM-агентов, использующих эту библиотеку.

## Поддерживаемые биржи

| Биржа | Каталог                    | Лендинг                                                | Реестр покрытия                                            |
| ----- | -------------------------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| Bybit | `src/lib/exchanges/bybit/` | [exchanges/bybit/README.md](exchanges/bybit/README.md) | [exchanges/bybit/coverage.md](exchanges/bybit/coverage.md) |
| OKX   | `src/lib/exchanges/okx/`   | [exchanges/okx/README.md](exchanges/okx/README.md)     | [exchanges/okx/coverage.md](exchanges/okx/coverage.md)     |

## Навигация по документации

```
docs/
├── README.md             ← вы здесь (L2: хаб)
├── architecture.md       ← L2: для контрибьюторов
└── exchanges/
    ├── bybit/
    │   ├── README.md     ← L3: лендинг биржи
    │   ├── coverage.md   ← L3: полный реестр ручек Bybit v5 со статусами
    │   ├── methods/      ← L4: детальные страницы методов
    │   │   ├── public/
    │   │   │   ├── common/
    │   │   │   ├── spot/
    │   │   │   └── futures/
    │   │   └── private/
    │   │       ├── spot/
    │   │       └── futures/
    │   └── examples/     ← L4: сквозные сценарии
    └── okx/
        ├── README.md     ← L3: лендинг биржи
        ├── coverage.md   ← L3: полный реестр ручек OKX v5
        └── methods/      ← L4: детальные страницы методов
            ├── public/
            │   ├── common/
            │   ├── spot/
            │   ├── swap/
            │   └── futures/
            └── private/  ← пока stubs (см. coverage)
                ├── spot/
                ├── swap/
                └── futures/
```

Все ссылки между документами относительные — рендерятся одинаково на GitHub и в IDE.
