[← Bybit](README.md) · [← Документация](../../README.md)

# Bybit v5 — Coverage matrix

> **Status legend:**
>
> - `done` — реализовано, покрыто unit + integration тестами, есть L4-страница.
> - `partial` — реализовано, но часть параметров не поддержана или нет интеграционного теста.
> - `todo` — не реализовано (ссылка ведёт на офиц. доку Bybit).
>
> Source of truth: <https://bybit-exchange.github.io/docs/v5/intro>.
> Last sync with official docs: 2026-05-25.

## Summary

| Группа                              | done  | partial | todo    | total   |
| ----------------------------------- | ----- | ------- | ------- | ------- |
| Market (public)                     | 1     | 0       | 15      | 16      |
| Trade (private)                     | 0     | 0       | 11      | 11      |
| Position (private)                  | 0     | 0       | 14      | 14      |
| Account (private)                   | 0     | 0       | 19      | 19      |
| Asset (private)                     | 0     | 0       | 25      | 25      |
| User (private)                      | 0     | 0       | 11      | 11      |
| Spot Margin Trade UTA (private)     | 0     | 0       | 8       | 8       |
| Spot Margin Trade Classic (private) | 0     | 0       | 6       | 6       |
| Spot Leverage Token (private)       | 0     | 0       | 5       | 5       |
| Institutional Loan (private)        | 0     | 0       | 5       | 5       |
| Crypto Loan (private)               | 0     | 0       | 10      | 10      |
| Earn (private)                      | 0     | 0       | 4       | 4       |
| Broker (private)                    | 0     | 0       | 7       | 7       |
| C2C Lending (private)               | 0     | 0       | 5       | 5       |
| Pre-upgrade (private)               | 0     | 0       | 6       | 6       |
| WebSocket Streams                   | 0     | 0       | —       | —       |
| **Total REST**                      | **1** | **0**   | **151** | **152** |

---

## Market (public)

Caller: `Bybit.public.common.*` (category-agnostic) or `Bybit.public.spot.market.*` / `Bybit.public.futures.market.*` (category-specific).

| Status | Method | Endpoint                             | Class.method                      | Docs                                                                                                           |
| ------ | ------ | ------------------------------------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| done   | GET    | /v5/market/time                      | `BybitPublicCommon.getServerTime` | [page](methods/public/common/getServerTime.md) · [bybit](https://bybit-exchange.github.io/docs/v5/market/time) |
| todo   | GET    | /v5/market/kline                     | —                                 | [bybit](https://bybit-exchange.github.io/docs/v5/market/kline)                                                 |
| todo   | GET    | /v5/market/mark-price-kline          | —                                 | [bybit](https://bybit-exchange.github.io/docs/v5/market/mark-kline)                                            |
| todo   | GET    | /v5/market/index-price-kline         | —                                 | [bybit](https://bybit-exchange.github.io/docs/v5/market/index-kline)                                           |
| todo   | GET    | /v5/market/premium-index-price-kline | —                                 | [bybit](https://bybit-exchange.github.io/docs/v5/market/preimum-index-kline)                                   |
| todo   | GET    | /v5/market/instruments-info          | —                                 | [bybit](https://bybit-exchange.github.io/docs/v5/market/instrument)                                            |
| todo   | GET    | /v5/market/orderbook                 | —                                 | [bybit](https://bybit-exchange.github.io/docs/v5/market/orderbook)                                             |
| todo   | GET    | /v5/market/tickers                   | —                                 | [bybit](https://bybit-exchange.github.io/docs/v5/market/tickers)                                               |
| todo   | GET    | /v5/market/funding/history           | —                                 | [bybit](https://bybit-exchange.github.io/docs/v5/market/history-fund-rate)                                     |
| todo   | GET    | /v5/market/recent-trade              | —                                 | [bybit](https://bybit-exchange.github.io/docs/v5/market/recent-trade)                                          |
| todo   | GET    | /v5/market/open-interest             | —                                 | [bybit](https://bybit-exchange.github.io/docs/v5/market/open-interest)                                         |
| todo   | GET    | /v5/market/historical-volatility     | —                                 | [bybit](https://bybit-exchange.github.io/docs/v5/market/iv)                                                    |
| todo   | GET    | /v5/market/insurance                 | —                                 | [bybit](https://bybit-exchange.github.io/docs/v5/market/insurance)                                             |
| todo   | GET    | /v5/market/risk-limit                | —                                 | [bybit](https://bybit-exchange.github.io/docs/v5/market/risk-limit)                                            |
| todo   | GET    | /v5/market/delivery-price            | —                                 | [bybit](https://bybit-exchange.github.io/docs/v5/market/delivery-price)                                        |
| todo   | GET    | /v5/market/account-ratio             | —                                 | [bybit](https://bybit-exchange.github.io/docs/v5/market/long-short-ratio)                                      |

## Trade (private)

Caller: `Bybit.private.spot.trade.*` или `Bybit.private.futures.trade.*` — в зависимости от значения `category`.

| Status | Method | Endpoint                          | Class.method | Docs                                                                      |
| ------ | ------ | --------------------------------- | ------------ | ------------------------------------------------------------------------- |
| todo   | POST   | /v5/order/create                  | —            | [bybit](https://bybit-exchange.github.io/docs/v5/order/create-order)      |
| todo   | POST   | /v5/order/amend                   | —            | [bybit](https://bybit-exchange.github.io/docs/v5/order/amend-order)       |
| todo   | POST   | /v5/order/cancel                  | —            | [bybit](https://bybit-exchange.github.io/docs/v5/order/cancel-order)      |
| todo   | GET    | /v5/order/realtime                | —            | [bybit](https://bybit-exchange.github.io/docs/v5/order/open-order)        |
| todo   | GET    | /v5/order/history                 | —            | [bybit](https://bybit-exchange.github.io/docs/v5/order/order-list)        |
| todo   | POST   | /v5/order/cancel-all              | —            | [bybit](https://bybit-exchange.github.io/docs/v5/order/cancel-all)        |
| todo   | POST   | /v5/order/create-batch            | —            | [bybit](https://bybit-exchange.github.io/docs/v5/order/batch-place)       |
| todo   | POST   | /v5/order/amend-batch             | —            | [bybit](https://bybit-exchange.github.io/docs/v5/order/batch-amend)       |
| todo   | POST   | /v5/order/cancel-batch            | —            | [bybit](https://bybit-exchange.github.io/docs/v5/order/batch-cancel)      |
| todo   | GET    | /v5/order/spot-borrow-check       | —            | [bybit](https://bybit-exchange.github.io/docs/v5/order/spot-borrow-quota) |
| todo   | POST   | /v5/order/disconnected-cancel-all | —            | [bybit](https://bybit-exchange.github.io/docs/v5/order/dcp)               |

## Position (private)

Caller: `Bybit.private.futures.position.*` (spot не имеет понятия position в Bybit v5).

| Status | Method | Endpoint                         | Class.method | Docs                                                                             |
| ------ | ------ | -------------------------------- | ------------ | -------------------------------------------------------------------------------- |
| todo   | GET    | /v5/position/list                | —            | [bybit](https://bybit-exchange.github.io/docs/v5/position)                       |
| todo   | POST   | /v5/position/set-leverage        | —            | [bybit](https://bybit-exchange.github.io/docs/v5/position/leverage)              |
| todo   | POST   | /v5/position/switch-isolated     | —            | [bybit](https://bybit-exchange.github.io/docs/v5/position/cross-isolate)         |
| todo   | POST   | /v5/position/set-tpsl-mode       | —            | [bybit](https://bybit-exchange.github.io/docs/v5/position/tpsl-mode)             |
| todo   | POST   | /v5/position/switch-mode         | —            | [bybit](https://bybit-exchange.github.io/docs/v5/position/position-mode)         |
| todo   | POST   | /v5/position/set-risk-limit      | —            | [bybit](https://bybit-exchange.github.io/docs/v5/position/set-risk-limit)        |
| todo   | POST   | /v5/position/trading-stop        | —            | [bybit](https://bybit-exchange.github.io/docs/v5/position/trading-stop)          |
| todo   | POST   | /v5/position/set-auto-add-margin | —            | [bybit](https://bybit-exchange.github.io/docs/v5/position/auto-add-margin)       |
| todo   | POST   | /v5/position/add-margin          | —            | [bybit](https://bybit-exchange.github.io/docs/v5/position/manual-add-margin)     |
| todo   | GET    | /v5/position/closed-pnl          | —            | [bybit](https://bybit-exchange.github.io/docs/v5/position/close-pnl)             |
| todo   | POST   | /v5/position/move-positions      | —            | [bybit](https://bybit-exchange.github.io/docs/v5/position/move-position)         |
| todo   | GET    | /v5/position/move-history        | —            | [bybit](https://bybit-exchange.github.io/docs/v5/position/move-position-history) |
| todo   | GET    | /v5/execution/list               | —            | [bybit](https://bybit-exchange.github.io/docs/v5/position/execution)             |
| todo   | POST   | /v5/position/confirm-pending-mmr | —            | [bybit](https://bybit-exchange.github.io/docs/v5/position/confirm-mmr)           |

## Account (private)

Caller: `Bybit.private.spot.account.*` или `Bybit.private.futures.account.*` — большинство методов работают для UTA-аккаунта и общие.

| Status | Method | Endpoint                                | Class.method | Docs                                                                               |
| ------ | ------ | --------------------------------------- | ------------ | ---------------------------------------------------------------------------------- |
| todo   | GET    | /v5/account/wallet-balance              | —            | [bybit](https://bybit-exchange.github.io/docs/v5/account/wallet-balance)           |
| todo   | POST   | /v5/account/upgrade-to-uta              | —            | [bybit](https://bybit-exchange.github.io/docs/v5/account/upgrade-unified-account)  |
| todo   | GET    | /v5/account/borrow-history              | —            | [bybit](https://bybit-exchange.github.io/docs/v5/account/borrow-history)           |
| todo   | POST   | /v5/account/quick-repayment             | —            | [bybit](https://bybit-exchange.github.io/docs/v5/account/repay-liability)          |
| todo   | POST   | /v5/account/set-collateral-switch       | —            | [bybit](https://bybit-exchange.github.io/docs/v5/account/set-collateral)           |
| todo   | POST   | /v5/account/set-collateral-switch-batch | —            | [bybit](https://bybit-exchange.github.io/docs/v5/account/batch-set-collateral)     |
| todo   | GET    | /v5/account/collateral-info             | —            | [bybit](https://bybit-exchange.github.io/docs/v5/account/collateral-info)          |
| todo   | GET    | /v5/account/coin-greeks                 | —            | [bybit](https://bybit-exchange.github.io/docs/v5/account/coin-greeks)              |
| todo   | GET    | /v5/account/fee-rate                    | —            | [bybit](https://bybit-exchange.github.io/docs/v5/account/fee-rate)                 |
| todo   | GET    | /v5/account/info                        | —            | [bybit](https://bybit-exchange.github.io/docs/v5/account/account-info)             |
| todo   | GET    | /v5/account/transaction-log             | —            | [bybit](https://bybit-exchange.github.io/docs/v5/account/transaction-log)          |
| todo   | GET    | /v5/account/contract-transaction-log    | —            | [bybit](https://bybit-exchange.github.io/docs/v5/account/contract-transaction-log) |
| todo   | POST   | /v5/account/set-margin-mode             | —            | [bybit](https://bybit-exchange.github.io/docs/v5/account/set-margin-mode)          |
| todo   | POST   | /v5/account/set-hedging-mode            | —            | [bybit](https://bybit-exchange.github.io/docs/v5/account/set-spot-hedge)           |
| todo   | POST   | /v5/account/mmp-modify                  | —            | [bybit](https://bybit-exchange.github.io/docs/v5/account/set-mmp)                  |
| todo   | POST   | /v5/account/mmp-reset                   | —            | [bybit](https://bybit-exchange.github.io/docs/v5/account/reset-mmp)                |
| todo   | GET    | /v5/account/mmp-state                   | —            | [bybit](https://bybit-exchange.github.io/docs/v5/account/get-mmp-state)            |
| todo   | GET    | /v5/account/withdrawal                  | —            | [bybit](https://bybit-exchange.github.io/docs/v5/account/withdraw-amount)          |
| todo   | POST   | /v5/account/demo-apply-money            | —            | [bybit](https://bybit-exchange.github.io/docs/v5/account/demo-apply-funds)         |

## Asset (private)

Активы, переводы, депозиты, выводы.

| Status | Method | Endpoint                                         | Class.method | Docs                                                                              |
| ------ | ------ | ------------------------------------------------ | ------------ | --------------------------------------------------------------------------------- |
| todo   | GET    | /v5/asset/exchange/order-record                  | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/exchange)                  |
| todo   | GET    | /v5/asset/delivery-record                        | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/delivery)                  |
| todo   | GET    | /v5/asset/settlement-record                      | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/settlement)                |
| todo   | GET    | /v5/asset/transfer/query-asset-info              | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/asset-info)                |
| todo   | GET    | /v5/asset/transfer/query-account-coins-balance   | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/all-balance)               |
| todo   | GET    | /v5/asset/transfer/query-account-coin-balance    | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/account-coin-balance)      |
| todo   | GET    | /v5/asset/transfer/query-transfer-coin-list      | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/transferable-coin)         |
| todo   | POST   | /v5/asset/transfer/inter-transfer                | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/create-inter-transfer)     |
| todo   | GET    | /v5/asset/transfer/query-inter-transfer-list     | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/inter-transfer-list)       |
| todo   | GET    | /v5/asset/transfer/query-sub-member-list         | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/sub-uid-list)              |
| todo   | POST   | /v5/asset/transfer/save-transfer-sub-member      | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/enable-unitransfer-subuid) |
| todo   | POST   | /v5/asset/transfer/universal-transfer            | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/unitransfer)               |
| todo   | GET    | /v5/asset/transfer/query-universal-transfer-list | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/unitransfer-list)          |
| todo   | GET    | /v5/asset/deposit/query-allowed-list             | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/deposit-coin-spec)         |
| todo   | POST   | /v5/asset/deposit/deposit-to-account             | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/set-deposit-acct)          |
| todo   | GET    | /v5/asset/deposit/query-record                   | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/deposit-record)            |
| todo   | GET    | /v5/asset/deposit/query-sub-member-record        | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/sub-deposit-record)        |
| todo   | GET    | /v5/asset/deposit/query-internal-record          | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/internal-deposit-record)   |
| todo   | GET    | /v5/asset/deposit/query-address                  | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/master-deposit-addr)       |
| todo   | GET    | /v5/asset/deposit/query-sub-member-address       | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/sub-deposit-addr)          |
| todo   | GET    | /v5/asset/coin/query-info                        | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/coin-info)                 |
| todo   | GET    | /v5/asset/withdraw/query-record                  | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/withdraw-record)           |
| todo   | GET    | /v5/asset/withdraw/withdrawable-amount           | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/delay-amount)              |
| todo   | POST   | /v5/asset/withdraw/create                        | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/withdraw)                  |
| todo   | POST   | /v5/asset/withdraw/cancel                        | —            | [bybit](https://bybit-exchange.github.io/docs/v5/asset/cancel-withdraw)           |

## User (private)

API-ключи и саб-аккаунты.

| Status | Method | Endpoint                   | Class.method | Docs                                                                        |
| ------ | ------ | -------------------------- | ------------ | --------------------------------------------------------------------------- |
| todo   | POST   | /v5/user/create-sub-member | —            | [bybit](https://bybit-exchange.github.io/docs/v5/user/create-subuid)        |
| todo   | POST   | /v5/user/create-sub-api    | —            | [bybit](https://bybit-exchange.github.io/docs/v5/user/create-subuid-apikey) |
| todo   | POST   | /v5/user/frozen-sub-member | —            | [bybit](https://bybit-exchange.github.io/docs/v5/user/froz-subuid)          |
| todo   | GET    | /v5/user/query-sub-members | —            | [bybit](https://bybit-exchange.github.io/docs/v5/user/subuid-list)          |
| todo   | GET    | /v5/user/sub-apikeys       | —            | [bybit](https://bybit-exchange.github.io/docs/v5/user/list-sub-apikeys)     |
| todo   | POST   | /v5/user/update-api        | —            | [bybit](https://bybit-exchange.github.io/docs/v5/user/modify-master-apikey) |
| todo   | POST   | /v5/user/update-sub-api    | —            | [bybit](https://bybit-exchange.github.io/docs/v5/user/modify-sub-apikey)    |
| todo   | POST   | /v5/user/delete-api        | —            | [bybit](https://bybit-exchange.github.io/docs/v5/user/rm-master-apikey)     |
| todo   | POST   | /v5/user/delete-sub-api    | —            | [bybit](https://bybit-exchange.github.io/docs/v5/user/rm-sub-apikey)        |
| todo   | GET    | /v5/user/query-api         | —            | [bybit](https://bybit-exchange.github.io/docs/v5/user/apikey-info)          |
| todo   | GET    | /v5/user/aff-customer-info | —            | [bybit](https://bybit-exchange.github.io/docs/v5/user/affiliate-info)       |

## Spot Margin Trade UTA (private)

| Status | Method | Endpoint                            | Class.method | Docs                                                                             |
| ------ | ------ | ----------------------------------- | ------------ | -------------------------------------------------------------------------------- |
| todo   | POST   | /v5/spot-margin-trade/switch-mode   | —            | [bybit](https://bybit-exchange.github.io/docs/v5/spot-margin-uta/switch-mode)    |
| todo   | POST   | /v5/spot-margin-trade/set-leverage  | —            | [bybit](https://bybit-exchange.github.io/docs/v5/spot-margin-uta/set-leverage)   |
| todo   | GET    | /v5/spot-margin-trade/state         | —            | [bybit](https://bybit-exchange.github.io/docs/v5/spot-margin-uta/status)         |
| todo   | POST   | /v5/spot-margin-trade/loan          | —            | [bybit](https://bybit-exchange.github.io/docs/v5/spot-margin-uta/borrow)         |
| todo   | POST   | /v5/spot-margin-trade/repay         | —            | [bybit](https://bybit-exchange.github.io/docs/v5/spot-margin-uta/repay)          |
| todo   | GET    | /v5/spot-margin-trade/borrow-info   | —            | [bybit](https://bybit-exchange.github.io/docs/v5/spot-margin-uta/borrow-info)    |
| todo   | GET    | /v5/spot-margin-trade/loan-history  | —            | [bybit](https://bybit-exchange.github.io/docs/v5/spot-margin-uta/borrow-history) |
| todo   | GET    | /v5/spot-margin-trade/repay-history | —            | [bybit](https://bybit-exchange.github.io/docs/v5/spot-margin-uta/repay-history)  |

## Spot Margin Trade Classic (private)

Для классических (non-UTA) аккаунтов.

| Status | Method | Endpoint                              | Class.method | Docs                                                                              |
| ------ | ------ | ------------------------------------- | ------------ | --------------------------------------------------------------------------------- |
| todo   | POST   | /v5/spot-cross-margin-trade/loan      | —            | [bybit](https://bybit-exchange.github.io/docs/v5/spot-margin-normal/borrow)       |
| todo   | POST   | /v5/spot-cross-margin-trade/repay     | —            | [bybit](https://bybit-exchange.github.io/docs/v5/spot-margin-normal/repay)        |
| todo   | GET    | /v5/spot-cross-margin-trade/orders    | —            | [bybit](https://bybit-exchange.github.io/docs/v5/spot-margin-normal/orders)       |
| todo   | GET    | /v5/spot-cross-margin-trade/account   | —            | [bybit](https://bybit-exchange.github.io/docs/v5/spot-margin-normal/account-info) |
| todo   | GET    | /v5/spot-cross-margin-trade/loan-info | —            | [bybit](https://bybit-exchange.github.io/docs/v5/spot-margin-normal/margin-data)  |
| todo   | POST   | /v5/spot-cross-margin-trade/switch    | —            | [bybit](https://bybit-exchange.github.io/docs/v5/spot-margin-normal/switch-mode)  |

## Spot Leverage Token (private)

| Status | Method | Endpoint                          | Class.method | Docs                                                                     |
| ------ | ------ | --------------------------------- | ------------ | ------------------------------------------------------------------------ |
| todo   | GET    | /v5/spot-lever-token/info         | —            | [bybit](https://bybit-exchange.github.io/docs/v5/lt/leverage-token-info) |
| todo   | GET    | /v5/spot-lever-token/reference    | —            | [bybit](https://bybit-exchange.github.io/docs/v5/lt/market-data)         |
| todo   | POST   | /v5/spot-lever-token/purchase     | —            | [bybit](https://bybit-exchange.github.io/docs/v5/lt/purchase)            |
| todo   | POST   | /v5/spot-lever-token/redeem       | —            | [bybit](https://bybit-exchange.github.io/docs/v5/lt/redeem)              |
| todo   | GET    | /v5/spot-lever-token/order-record | —            | [bybit](https://bybit-exchange.github.io/docs/v5/lt/order-record)        |

## Institutional Loan (private)

| Status | Method | Endpoint                           | Class.method | Docs                                                                           |
| ------ | ------ | ---------------------------------- | ------------ | ------------------------------------------------------------------------------ |
| todo   | GET    | /v5/ins-loan/product-infos         | —            | [bybit](https://bybit-exchange.github.io/docs/v5/otc/margin-product-info)      |
| todo   | GET    | /v5/ins-loan/ensure-tokens-convert | —            | [bybit](https://bybit-exchange.github.io/docs/v5/otc/margin-coin-convert-info) |
| todo   | GET    | /v5/ins-loan/loan-order            | —            | [bybit](https://bybit-exchange.github.io/docs/v5/otc/loan-info)                |
| todo   | GET    | /v5/ins-loan/repaid-history        | —            | [bybit](https://bybit-exchange.github.io/docs/v5/otc/repay-info)               |
| todo   | GET    | /v5/ins-loan/ltv-convert           | —            | [bybit](https://bybit-exchange.github.io/docs/v5/otc/ltv-convert)              |

## Crypto Loan (private)

| Status | Method | Endpoint                                  | Class.method | Docs                                                                                       |
| ------ | ------ | ----------------------------------------- | ------------ | ------------------------------------------------------------------------------------------ |
| todo   | GET    | /v5/crypto-loan/collateral-data           | —            | [bybit](https://bybit-exchange.github.io/docs/v5/crypto-loan/acct-borrow-collateral-limit) |
| todo   | GET    | /v5/crypto-loan/loanable-data             | —            | [bybit](https://bybit-exchange.github.io/docs/v5/crypto-loan/loanable-coin)                |
| todo   | POST   | /v5/crypto-loan/borrow                    | —            | [bybit](https://bybit-exchange.github.io/docs/v5/crypto-loan/borrow)                       |
| todo   | POST   | /v5/crypto-loan/repay                     | —            | [bybit](https://bybit-exchange.github.io/docs/v5/crypto-loan/repay)                        |
| todo   | GET    | /v5/crypto-loan/ongoing-orders            | —            | [bybit](https://bybit-exchange.github.io/docs/v5/crypto-loan/unpaid-loan-order)            |
| todo   | GET    | /v5/crypto-loan/repayment-history         | —            | [bybit](https://bybit-exchange.github.io/docs/v5/crypto-loan/repay-transaction)            |
| todo   | GET    | /v5/crypto-loan/borrow-history            | —            | [bybit](https://bybit-exchange.github.io/docs/v5/crypto-loan/completed-loan-order)         |
| todo   | POST   | /v5/crypto-loan/adjust-ltv                | —            | [bybit](https://bybit-exchange.github.io/docs/v5/crypto-loan/adjust-collateral)            |
| todo   | GET    | /v5/crypto-loan/adjustment-history        | —            | [bybit](https://bybit-exchange.github.io/docs/v5/crypto-loan/ltv-adjust-history)           |
| todo   | GET    | /v5/crypto-loan/account-borrowable-amount | —            | [bybit](https://bybit-exchange.github.io/docs/v5/crypto-loan/max-borrow)                   |

## Earn (private)

| Status | Method | Endpoint             | Class.method | Docs                                                                |
| ------ | ------ | -------------------- | ------------ | ------------------------------------------------------------------- |
| todo   | GET    | /v5/earn/product     | —            | [bybit](https://bybit-exchange.github.io/docs/v5/earn/product-info) |
| todo   | POST   | /v5/earn/place-order | —            | [bybit](https://bybit-exchange.github.io/docs/v5/earn/place-order)  |
| todo   | GET    | /v5/earn/position    | —            | [bybit](https://bybit-exchange.github.io/docs/v5/earn/position)     |
| todo   | GET    | /v5/earn/order       | —            | [bybit](https://bybit-exchange.github.io/docs/v5/earn/order)        |

## Broker (private)

| Status | Method | Endpoint                                         | Class.method | Docs                                                                             |
| ------ | ------ | ------------------------------------------------ | ------------ | -------------------------------------------------------------------------------- |
| todo   | GET    | /v5/broker/earnings-info                         | —            | [bybit](https://bybit-exchange.github.io/docs/v5/broker/exchange-earning)        |
| todo   | GET    | /v5/broker/earning-record                        | —            | [bybit](https://bybit-exchange.github.io/docs/v5/broker/exchange-earning-record) |
| todo   | GET    | /v5/broker/account-info                          | —            | [bybit](https://bybit-exchange.github.io/docs/v5/broker/account-info)            |
| todo   | GET    | /v5/broker/asset/query-sub-member-deposit-record | —            | [bybit](https://bybit-exchange.github.io/docs/v5/broker/sub-deposit-record)      |
| todo   | POST   | /v5/broker/award/info                            | —            | [bybit](https://bybit-exchange.github.io/docs/v5/broker/voucher-spec)            |
| todo   | POST   | /v5/broker/award/distribute-award                | —            | [bybit](https://bybit-exchange.github.io/docs/v5/broker/issue-voucher)           |
| todo   | GET    | /v5/broker/award/distribution-record             | —            | [bybit](https://bybit-exchange.github.io/docs/v5/broker/get-issued-voucher)      |

## C2C Lending (private)

| Status | Method | Endpoint                  | Class.method | Docs                                                                    |
| ------ | ------ | ------------------------- | ------------ | ----------------------------------------------------------------------- |
| todo   | GET    | /v5/lending/info          | —            | [bybit](https://bybit-exchange.github.io/docs/v5/c2c-lend/product-info) |
| todo   | POST   | /v5/lending/purchase      | —            | [bybit](https://bybit-exchange.github.io/docs/v5/c2c-lend/deposit)      |
| todo   | POST   | /v5/lending/redeem        | —            | [bybit](https://bybit-exchange.github.io/docs/v5/c2c-lend/redeem)       |
| todo   | GET    | /v5/lending/history-order | —            | [bybit](https://bybit-exchange.github.io/docs/v5/c2c-lend/order-record) |
| todo   | GET    | /v5/lending/account       | —            | [bybit](https://bybit-exchange.github.io/docs/v5/c2c-lend/account-info) |

## Pre-upgrade (private)

Исторические данные за период до апгрейда на UTA. Read-only.

| Status | Method | Endpoint                                | Class.method | Docs                                                                          |
| ------ | ------ | --------------------------------------- | ------------ | ----------------------------------------------------------------------------- |
| todo   | GET    | /v5/pre-upgrade/order/history           | —            | [bybit](https://bybit-exchange.github.io/docs/v5/pre-upgrade/order-list)      |
| todo   | GET    | /v5/pre-upgrade/execution/list          | —            | [bybit](https://bybit-exchange.github.io/docs/v5/pre-upgrade/execution)       |
| todo   | GET    | /v5/pre-upgrade/position/closed-pnl     | —            | [bybit](https://bybit-exchange.github.io/docs/v5/pre-upgrade/close-pnl)       |
| todo   | GET    | /v5/pre-upgrade/account/transaction-log | —            | [bybit](https://bybit-exchange.github.io/docs/v5/pre-upgrade/transaction-log) |
| todo   | GET    | /v5/pre-upgrade/asset/delivery-record   | —            | [bybit](https://bybit-exchange.github.io/docs/v5/pre-upgrade/delivery)        |
| todo   | GET    | /v5/pre-upgrade/asset/settlement-record | —            | [bybit](https://bybit-exchange.github.io/docs/v5/pre-upgrade/settlement)      |

## WebSocket Streams

WS не реализован в фазе 1. Каркас и принципы — [src/lib/exchanges/bybit/ws/README.md](../../../src/lib/exchanges/bybit/ws/README.md).

Когда WS будет добавлен, в эту секцию попадут:

- Public streams (spot / linear / inverse / option): orderbook, trade, ticker, kline, liquidation.
- Private streams: position, execution, order, wallet, greeks.
- WebSocket Trade API: order.create / amend / cancel.

Официальная докум.: <https://bybit-exchange.github.io/docs/v5/ws/connect>.

---

[← Bybit](README.md) · [← Документация](../../README.md) · [Back to top](#bybit-v5--coverage-matrix)
