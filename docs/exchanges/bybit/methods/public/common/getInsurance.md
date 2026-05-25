[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md)

# `BybitPublicCommon.getInsurance`

> `GET /v5/market/insurance` · Public · No auth · No category.

[Bybit official docs ↗](https://bybit-exchange.github.io/docs/v5/market/insurance)

## Signature

```ts
static getInsurance(
  ctx?: BybitContext,
  params?: GetInsuranceParams,
): Promise<GetInsuranceResult>
```

## Parameters

| Поле   | Тип      | Обяз. | Описание                                                |
| ------ | -------- | ----- | ------------------------------------------------------- |
| `coin` | `string` | Нет   | Фильтр по монете, например `'BTC'`. По умолчанию — все. |

`ctx` — стандартный `BybitContext` (см. [README](../../../README.md)). Подпись не требуется.

## Response

```ts
interface GetInsuranceResult {
  updatedTime: string;
  list: InsurancePoolItem[];
}

interface InsurancePoolItem {
  coin: string;
  balance: string;
  value: string;
}
```

| Поле              | Тип    | Описание                                          |
| ----------------- | ------ | ------------------------------------------------- |
| `updatedTime`     | string | Время обновления, ms. String-encoded integer.     |
| `list[i].coin`    | string | Тикер монеты (например, `'BTC'`).                 |
| `list[i].balance` | string | Баланс пула в этой монете. String-encoded number. |
| `list[i].value`   | string | Стоимость пула в USD. String-encoded number.      |

## Example — все монеты

```ts
import { BybitPublicCommon } from 'rock-clients';

const pool = await BybitPublicCommon.getInsurance({ env: 'testnet' });
for (const item of pool.list) {
  console.log(`${item.coin}: ${item.balance} (~$${item.value})`);
}
```

## Example — одна монета

```ts
import { Bybit } from 'rock-clients';

const btc = await Bybit.public.common.getInsurance({}, { coin: 'BTC' });
console.log(btc.list[0]?.balance);
```

## Errors

| Класс ошибки        | Когда                                                      |
| ------------------- | ---------------------------------------------------------- |
| `BybitApiError`     | Bybit вернул `retCode !== 0`                               |
| `BybitNetworkError` | Сетевой сбой, не-2xx HTTP, не-JSON тело, неверный envelope |

## Related

- Группа [Market (public)](../../../coverage.md#market-public).
- Соседний метод: [`getServerTime`](getServerTime.md).

---

[← Bybit](../../../README.md) · [← Coverage](../../../coverage.md) · [Back to top](#bybitpubliccommongetinsurance)
