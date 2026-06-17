/**
 * JWT Authentication Exercise - Test Script
 * Run with: node src/test.js
 * Make sure the server is running first: npm run dev
 */

const http = require('http');

const BASE_URL = 'localhost';
const PORT = 3000;

// Helper to make HTTP requests
function request(path, method = 'GET', data = null, cookies = '') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: BASE_URL,
      port: PORT,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (cookies) {
      options.headers['Cookie'] = cookies;
    }

    const req = http.request(options, (res) => {
      let body = '';
      const responseCookies = res.headers['set-cookie'] || [];

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            cookies: responseCookies,
            data: JSON.parse(body),
          });
        } catch {
          resolve({ status: res.statusCode, cookies: responseCookies, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

function extractCookie(cookies, name) {
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  return cookie ? cookie.split(';')[0] : '';
}

async function runTests() {
  console.log('\n🧪 JWT Authentication Exercise - Test Suite\n');
  console.log('Make sure the server is running on port 3000!\n');

  let cookies = '';
  let userId = null;

  // Test 1: Health Check
  console.log('1️⃣  Testing Health Endpoint...');
  const health = await request('/health');
  console.log(`   Status: ${health.status === 200 ? '✅' : '❌'} ${health.status}`);
  console.log(`   Response: ${health.data.message}\n`);

  // Test 2: Register
  console.log('2️⃣  Testing User Registration...');
  const register = await request('/api/auth/register', 'POST', {
    username: 'test_user',
    email: 'test@example.com',
    password: 'SecurePass123!',
  });
  console.log(`   Status: ${register.status === 201 ? '✅' : '❌'} ${register.status}`);
  console.log(`   Message: ${register.data.message}`);
  if (register.data.data?.user) {
    userId = register.data.data.user.id;
    console.log(`   User ID: ${userId}`);
    cookies = extractCookie(register.cookies, 'accessToken');
    if (cookies) cookies += '; ' + extractCookie(register.cookies, 'refreshToken');
  }
  console.log();

  // Test 3: Duplicate Registration
  console.log('3️⃣  Testing Duplicate Registration...');
  const dupRegister = await request('/api/auth/register', 'POST', {
    username: 'test_user',
    email: 'test@example.com',
    password: 'SecurePass123!',
  });
  console.log(`   Status: ${dupRegister.status === 409 ? '✅' : '❌'} ${dupRegister.status} (Expected: 409)`);
  console.log(`   Message: ${dupRegister.data.message}\n`);

  // Test 4: Login
  console.log('4️⃣  Testing Login...');
  const login = await request('/api/auth/login', 'POST', {
    email: 'test@example.com',
    password: 'SecurePass123!',
  });
  console.log(`   Status: ${login.status === 200 ? '✅' : '❌'} ${login.status}`);
  console.log(`   Message: ${login.data.message}`);
  if (login.cookies.length > 0) {
    cookies = extractCookie(login.cookies, 'accessToken');
    cookies += '; ' + extractCookie(login.cookies, 'refreshToken');
    console.log(`   Cookies received: ✅`);
  }
  console.log();

  // Test 5: Access Protected Route
  console.log('5️⃣  Testing Protected Route (Dashboard)...');
  const dashboard = await request('/api/protected/dashboard', 'GET', null, cookies);
  console.log(`   Status: ${dashboard.status === 200 ? '✅' : '❌'} ${dashboard.status}`);
  console.log(`   Message: ${dashboard.data.message || dashboard.data.message}\n`);

  // Test 6: Access Protected Route Without Auth
  console.log('6️⃣  Testing Protected Route Without Auth...');
  const noAuth = await request('/api/protected/dashboard');
  console.log(`   Status: ${noAuth.status === 401 ? '✅' : '❌'} ${noAuth.status} (Expected: 401)`);
  console.log(`   Message: ${noAuth.data.message}\n`);

  // Test 7: Get Profile
  console.log('7️⃣  Testing Get Profile...');
  const profile = await request('/api/auth/me', 'GET', null, cookies);
  console.log(`   Status: ${profile.status === 200 ? '✅' : '❌'} ${profile.status}`);
  console.log(`   User: ${profile.data.data?.user?.username || 'N/A'}\n`);

  // Test 8: Update Profile
  console.log('8️⃣  Testing Update Profile...');
  const update = await request('/api/auth/me', 'PUT', {
    profile: { fullName: 'Test User Updated', bio: 'Hello from test!' },
  }, cookies);
  console.log(`   Status: ${update.status === 200 ? '✅' : '❌'} ${update.status}`);
  console.log(`   Message: ${update.data.message}`);
  console.log(`   Full Name: ${update.data.data?.user?.profile?.fullName}\n`);

  // Test 9: Admin Route (should fail for regular user)
  console.log('9️⃣  Testing Admin Route (Role-based access)...');
  const admin = await request('/api/protected/admin', 'GET', null, cookies);
  console.log(`   Status: ${admin.status === 403 ? '✅' : '❌'} ${admin.status} (Expected: 403)`);
  console.log(`   Message: ${admin.data.message}\n`);

  // Test 10: Refresh Token
  console.log('🔟 Testing Token Refresh...');
  const refresh = await request('/api/auth/refresh', 'POST', null, cookies);
  console.log(`   Status: ${refresh.status === 200 ? '✅' : '❌'} ${refresh.status}`);
  console.log(`   Message: ${refresh.data.message}`);
  if (refresh.cookies.length > 0) {
    cookies = extractCookie(refresh.cookies, 'accessToken');
    cookies += '; ' + extractCookie(refresh.cookies, 'refreshToken');
    console.log(`   New cookies received: ✅`);
  }
  console.log();

  // Test 11: Logout
  console.log('1️⃣1️⃣ Testing Logout...');
  const logout = await request('/api/auth/logout', 'POST', null, cookies);
  console.log(`   Status: ${logout.status === 200 ? '✅' : '❌'} ${logout.status}`);
  console.log(`   Message: ${logout.data.message}\n`);

  // Test 12: Access After Logout (should fail)
  console.log('1️⃣2️⃣ Testing Access After Logout...');
  const afterLogout = await request('/api/protected/dashboard', 'GET', null, cookies);
  console.log(`   Status: ${afterLogout.status === 401 ? '✅' : '❌'} ${afterLogout.status} (Expected: 401)`);
  console.log(`   Message: ${afterLogout.data.message}\n`);

  // Test 13: Validation Test
  console.log('1️⃣3️⃣ Testing Input Validation...');
  const invalid = await request('/api/auth/register', 'POST', {
    username: 'ab', // Too short
    email: 'not-an-email',
    password: '123', // Too weak
  });
  console.log(`   Status: ${invalid.status === 400 ? '✅' : '❌'} ${invalid.status} (Expected: 400)`);
  console.log(`   Validation errors: ${invalid.data.errors?.length || 0} fields\n`);

  console.log('═══════════════════════════════════════════');
  console.log('✅ Test suite completed!');
  console.log('═══════════════════════════════════════════\n');
}

runTests().catch((err) => {
  console.error('\n❌ Test suite failed:', err.message);
  console.log('Make sure the server is running: npm run dev\n');
});
