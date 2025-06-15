

const verifyCsrfTokenMiddleware = (req, res, next) => {
  // We only check for state-changing methods
  const methodsToProtect = ['POST', 'PUT', 'DELETE', 'PATCH'];

  if (methodsToProtect.includes(req.method)) {
    const csrfTokenFromCookie = req.cookies['csrf-token'];
    const csrfTokenFromHeader = req.headers['x-csrf-token'];

    // 1. Check if both the cookie and header token exist
    if (!csrfTokenFromCookie || !csrfTokenFromHeader) {
      return res.status(403).json({ error: 'CSRF token is missing.' });
    }

    // 2. Check if they match
    if (csrfTokenFromCookie !== csrfTokenFromHeader) {
      return res.status(403).json({ error: 'CSRF token is invalid.' });
    }
  }

  // If we're here, the check passed or wasn't needed (e.g., for a GET request)
  next();
}

module.exports = verifyCsrfTokenMiddleware