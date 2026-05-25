[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicFuturesMarket.getRiskLimit`

> `GET /v5/market/risk-limit?category=linear|inverse` · Public · No auth.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/risk-limit)

## Signature

```ts
static getRiskLimit(
  ctx: BybitContext,
  params: GetRiskLimitParams,
): Promise<GetRiskLimitResult>
```

## Parameters

| Поле       | Тип                     | Обяз. | Описание                     |
| ---------- | ----------------------- | ----- | ---------------------------- |
| `category` | `'linear' \| 'inverse'` | Да    | Тип фьючерса.                |
| `symbol`   | `string`                | Нет   | Конкретный символ.           |
| `cursor`   | `string`                | Нет   | Курсор постраничной выборки. |

## Response

```ts
interface GetRiskLimitResult {
  category: 'linear' | 'inverse';
  list: RiskLimitItem[];
  nextPageCursor?: string;
}

interface RiskLimitItem {
  id: number;
  symbol: string;
  riskLimitValue: string;
  maintenanceMargin: string;
  initialMargin: string;
  isLowestRisk: 0 | 1;
  maxLeverage: string;
  mmDeduction: string;
  section?: string[];
}
```

`isLowestRisk = 1` помечает базовый уровень риска (стартовый).

## Example

```ts
import { BybitPublicFuturesMarket } from 'rock-clients';

const { list } = await BybitPublicFuturesMarket.getRiskLimit(
  {},
  { category: 'linear', symbol: 'BTCUSDT' },
);
for (const tier of list) {
  console.log(tier.id, tier.maxLeverage, tier.riskLimitValue);
}
```

## Errors

| Класс ошибки        | Когда                                                      |
| ------------------- | ---------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0`                               |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope |

## Related

- Группа [Market (public)](../../../coverage.md#market-public).

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpublicfuturesmarketgetrisklimit)
