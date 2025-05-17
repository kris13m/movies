const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.SECURE === 'true',
  sameSite: process.env.SAMESITE || 'lax',
  maxAge: 60 * 60 * 1000,
  path: '/',
});

module.exports = { getCookieOptions };