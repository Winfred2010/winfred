const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/auth');

/**
 * GET /api/protected/dashboard
 * Example protected route - any authenticated user
 */
router.get('/dashboard', authenticate, (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to your dashboard!',
    data: {
      user: req.user,
      stats: {
        loginTime: new Date().toISOString(),
        message: 'This is a protected resource only accessible with a valid JWT.',
      },
    },
  });
});

/**
 * GET /api/protected/profile
 * Get detailed profile (requires authentication)
 */
router.get('/profile', authenticate, (req, res) => {
  res.json({
    success: true,
    message: 'Profile data retrieved successfully.',
    data: {
      userId: req.user.userId,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
      permissions: ['read', 'write'],
    },
  });
});

/**
 * GET /api/protected/admin
 * Admin-only route - requires 'admin' role
 */
router.get('/admin', authenticate, requireRole('admin'), (req, res) => {
  res.json({
    success: true,
    message: 'Admin panel access granted.',
    data: {
      adminInfo: {
        user: req.user,
        accessLevel: 'full',
        timestamp: new Date().toISOString(),
      },
    },
  });
});

/**
 * GET /api/protected/moderator
 * Moderator or Admin route
 */
router.get('/moderator', authenticate, requireRole('admin', 'moderator'), (req, res) => {
  res.json({
    success: true,
    message: 'Moderator area access granted.',
    data: {
      user: req.user,
      allowedRoles: ['admin', 'moderator'],
    },
  });
});

/**
 * GET /api/protected/public-info
 * Public route that also shows user info if authenticated
 */
router.get('/public-info', (req, res) => {
  res.json({
    success: true,
    message: 'This is public information.',
    data: {
      info: 'Anyone can see this, but authenticated users get extra data.',
      authenticated: !!req.user,
      user: req.user || null,
    },
  });
});

module.exports = router;
