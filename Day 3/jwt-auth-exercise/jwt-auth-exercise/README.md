# JWT Authentication Exercise

A complete step-by-step implementation of JWT Authentication in Node.js with Express.

## Project Structure

```
src/
├── app.js                    # Main Express application entry point
├── config.js                 # Configuration and environment variables
├── routes/
│   ├── auth.js              # Authentication routes (register, login, refresh, logout)
│   └── protected.js         # Protected routes requiring JWT verification
├── middleware/
│   ├── auth.js              # JWT verification middleware
│   ├── validation.js        # Input validation middleware
│   └── rateLimiter.js       # Rate limiting configuration
├── utils/
│   ├── tokenService.js      # JWT generation and verification helpers
│   ├── userStore.js         # In-memory user data storage
│   └── revokedTokens.js     # Token revocation list
└── data/
    └── users.json           # Persistent user storage (JSON file)
```

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your secret keys.

3. **Start the server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive tokens |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Logout and clear cookies |
| GET | `/api/auth/me` | Get current user profile |
| PUT | `/api/auth/me` | Update user profile |

### Protected Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/protected/dashboard` | Example protected route |
| GET | `/api/protected/admin` | Admin-only route |

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","email":"john@example.com","password":"SecurePass123!"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"SecurePass123!"}' \
  -c cookies.txt
```

### Access Protected Route
```bash
curl http://localhost:3000/api/protected/dashboard \
  -b cookies.txt
```

### Refresh Token
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -b cookies.txt \
  -c cookies.txt
```

### Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -b cookies.txt \
  -c cookies.txt
```

## Security Features Implemented

- ✅ Password hashing with bcrypt
- ✅ JWT access & refresh tokens
- ✅ HTTP-only cookies for token storage
- ✅ Input validation with express-validator
- ✅ Rate limiting on auth endpoints
- ✅ Token revocation list for logout
- ✅ Protected route middleware
- ✅ Role-based access control (user/admin)
- ✅ Secure token expiration handling
