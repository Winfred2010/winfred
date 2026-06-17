/**
 * Token Revocation List
 * In production, use Redis or a database table for this.
 */
class RevokedTokenStore {
  constructor() {
    this.revokedRefreshTokens = new Set();
    this.revokedAccessTokens = new Set();
  }

  revokeRefreshToken(token) {
    this.revokedRefreshTokens.add(token);
  }

  revokeAccessToken(token) {
    this.revokedAccessTokens.add(token);
  }

  isRefreshTokenRevoked(token) {
    return this.revokedRefreshTokens.has(token);
  }

  isAccessTokenRevoked(token) {
    return this.revokedAccessTokens.has(token);
  }

  // Cleanup expired tokens (simplified - in production use TTL)
  cleanup() {
    // This would check expiration dates in a real implementation
    console.log('Token cleanup executed (placeholder)');
  }
}

module.exports = new RevokedTokenStore();
