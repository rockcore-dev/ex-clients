# Bybit WebSocket layer — placeholder

Этот каталог зарезервирован под WS-клиенты Bybit v5 (публичные и приватные стримы). В фазе 1 REST-клиента WS намеренно не реализуется.

Когда WS будет добавлен, он повторит тот же дизайн, что и REST:

- статические классы без инстансов;
- разбиение `public/private` × `spot/futures`;
- контекст (`BybitContext`) передаётся в каждый подписочный вызов;
- только встроенный `WebSocket` из Node.js (Node ≥ 22) либо обоснованная разовая dev-зависимость;
- каждое сообщение/стрим документируется со ссылкой на официальную доку Bybit и шаблоном JSDoc, как в REST.

Текущий статус: not implemented. Прогресс — в [`docs/exchanges/bybit/coverage.md`](../../../../../docs/exchanges/bybit/coverage.md) (раздел WebSocket).
