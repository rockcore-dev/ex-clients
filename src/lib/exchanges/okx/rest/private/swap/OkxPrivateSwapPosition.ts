/**
 * Private swap position endpoints of OKX v5 (instType='SWAP').
 *
 * Scope: leverage, position list, set-leverage, position-mode и т.д.
 *
 * Static class — never instantiate.
 */
export class OkxPrivateSwapPosition {
  private constructor() {
    throw new Error('OkxPrivateSwapPosition is a static class and cannot be instantiated');
  }
}
