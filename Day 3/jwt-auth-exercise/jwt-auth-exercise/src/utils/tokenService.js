const jwt = require('jsonwebtoken');
const config = require('../config');

class TokenService {
  generateAccessToken(payload) {
    return jwt.sign(payload, config.jwt.accessSecret, {
      expiresIn: config.jwt.accessExpiration,
    });
  }

  generateRefreshToken(payload) {
    return jwt.sign(payload, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiration,
    });
  }

  verifyAccessToken(token) {
    try {
      return jwt.verify(token, config.jwt.accessSecret);
    } catch (error) {
      return null;
    }
  }

  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, config.jwt.refreshSecret);
    } catch (error) {
      return null;
    }
  }

  generateTokenPair(user) {
    const payload = {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken({ userId: user.id });

    return { accessToken, refreshToken };
  }

  decodeToken(token) {
    try {
      return jwt.decode(token);
    } catch {
      return null;
    }
  }
}

module.exports = new TokenService();
