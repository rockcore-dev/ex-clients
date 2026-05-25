---
'rock-clients': minor
---

Initial Bybit v5 REST client scaffold.

- Zero-runtime-dependency architecture: only built-in `fetch` and `node:crypto` are used. Third-party HTTP / crypto packages (`axios`, `got`, `node-fetch`, `crypto-js`, etc.) are deliberately not used for supply-chain safety.
- Static classes only: `BybitHttp`, `BybitSigner`, `Bybit` facade and all REST sub-clients (`BybitPublicCommon`, `BybitPublicSpotMarket`, `BybitPublicFuturesMarket`, `BybitPrivateSpotTrade`, `BybitPrivateSpotAccount`, `BybitPrivateFuturesTrade`, `BybitPrivateFuturesPosition`, `BybitPrivateFuturesAccount`). Instantiation throws.
- Per-call context (`BybitContext` / `BybitAuthenticatedContext`) instead of instance state, with explicit `env`, `baseUrl`, `credentials`, `recvWindow`, `fetch` fields.
- First implemented method: `BybitPublicCommon.getServerTime` (`GET /v5/market/time`).
- Unit tests (22) for signer / HTTP / endpoint / facade.
- Integration tests against `https://api-testnet.bybit.com` (separate `yarn test:integration` command).
- Multi-layer documentation under `docs/`: hub, architecture, Bybit landing, full coverage matrix for all Bybit v5 endpoints with `done` / `todo` statuses, per-method detailed pages.
- Root `llms.txt` for LLM consumers.
