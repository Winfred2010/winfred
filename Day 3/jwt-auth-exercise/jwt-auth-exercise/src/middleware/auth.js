const tokenService = require('../utils/tokenService');
const userStore = require('../utils/userStore');
const revokedTokens = require('../utils/revokedTokens');

/**
 * JWT Authentication Middleware
 * Verifies the access token from cookies or Authorization header
 */
const authenticate = (req, res, next) => {
  try {
    // Check cookie first, then Authorization header
    let token = req.cookies?.accessToken;

    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
      });
    }

    // Check if token has been revoked
    if (revokedTokens.isAccessTokenRevoked(token)) {
      return res.status(401).json({
        success: false,
        message: 'Token has been revoked. Please login again.',
      });
    }

    // Verify the token
    const decoded = tokenService.verifyAccessToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token.',
      });
    }

    // Attach user info to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.',
    });
  }
};

/**
 * Role-based access control middleware
 */
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.',
      });
    }

    next();
  };
};

/**
 * Optional authentication middleware
 * Attaches user if token exists, but doesn't require it
 */
const optionalAuth = (req, res, next) => {
  try {
    let token = req.cookies?.accessToken;

    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (token && !revokedTokens.isAccessTokenRevoked(token)) {
      const decoded = tokenService.verifyAccessToken(token);
      if (decoded) {
        req.user = decoded;
      }
    }

    next();
  } catch {
    next();
  }
};

module.exports = {
  authenticate,
  requireRole,
  optionalAuth,
};
