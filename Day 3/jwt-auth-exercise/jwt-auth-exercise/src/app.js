const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('./config');
const { apiLimiter } = require('./middleware/rateLimiter');

// Route imports
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();

// Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiting for all API routes
app.use('/api', apiLimiter);

// Request logging (development only)
if (config.nodeEnv === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// Root route with API documentation
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'JWT Authentication Exercise API',
    version: '1.0.0',
    documentation: {
      authentication: {
        register: { method: 'POST', path: '/api/auth/register', description: 'Register new user' },
        login: { method: 'POST', path: '/api/auth/login', description: 'Login and receive tokens' },
        refresh: { method: 'POST', path: '/api/auth/refresh', description: 'Refresh access token' },
        logout: { method: 'POST', path: '/api/auth/logout', description: 'Logout and revoke tokens' },
        me: { method: 'GET', path: '/api/auth/me', description: 'Get current user profile' },
        updateMe: { method: 'PUT', path: '/api/auth/me', description: 'Update user profile' },
      },
      protected: {
        dashboard: { method: 'GET', path: '/api/protected/dashboard', description: 'User dashboard (auth required)' },
        profile: { method: 'GET', path: '/api/protected/profile', description: 'Detailed profile (auth required)' },
        admin: { method: 'GET', path: '/api/protected/admin', description: 'Admin only (admin role required)' },
        moderator: { method: 'GET', path: '/api/protected/moderator', description: 'Moderator area (admin/moderator role required)' },
      },
    },
    features: [
      'JWT Access & Refresh Tokens',
      'HTTP-only Cookie Storage',
      'Bcrypt Password Hashing',
      'Input Validation',
      'Rate Limiting (Brute Force Protection)',
      'Token Revocation',
      'Role-based Access Control',
      'Persistent JSON Storage',
    ],
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found.',
    path: req.path,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error.',
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`\n╔══════════════════════════════════════════════════╗`);
  console.log(`║   JWT Authentication Exercise Server              ║`);
  console.log(`╠══════════════════════════════════════════════════╣`);
  console.log(`║   Environment: ${config.nodeEnv.padEnd(37)}║`);
  console.log(`║   Port: ${String(config.port).padEnd(44)}║`);
  console.log(`║   API URL: http://localhost:${config.port}${''.padEnd(23)}║`);
  console.log(`╚══════════════════════════════════════════════════╝\n`);
  console.log('Available endpoints:');
  console.log('  POST /api/auth/register    - Register new user');
  console.log('  POST /api/auth/login       - Login');
  console.log('  POST /api/auth/refresh     - Refresh token');
  console.log('  POST /api/auth/logout      - Logout');
  console.log('  GET  /api/auth/me          - Get profile');
  console.log('  PUT  /api/auth/me          - Update profile');
  console.log('  GET  /api/protected/dashboard - Protected route');
  console.log('  GET  /api/protected/admin     - Admin only');
  console.log('\nPress Ctrl+C to stop.\n');
});

module.exports = app;
