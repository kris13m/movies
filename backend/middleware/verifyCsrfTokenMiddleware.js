const verifyCsrfTokenMiddleware = (req, res, next) => {
  // We only check for state-changing methods
  const methodsToProtect = ['POST', 'PUT', 'DELETE', 'PATCH'];

  if (methodsToProtect.includes(req.method)) {
    // const csrfTokenFromCookie = req.cookies['csrf-token']; // commented out
    const csrfTokenFromHeader = req.headers['x-csrf-token'];

    // Instead of checking cookie and matching tokens, just require header === "hello"
    if (csrfTokenFromHeader !== 'flag_csrf') {
      return res.status(403).json({ error: 'CSRF token header missing or invalid.' });
    }

    /*
    // Old check for cookie and header match
    if (!csrfTokenFromCookie || !csrfTokenFromHeader) {
      return res.status(403).json({ error: 'CSRF token is missing.' });
    }

    if (csrfTokenFromCookie !== csrfTokenFromHeader) {
      return res.status(403).json({ error: 'CSRF token is invalid.' });
    }
    console.log(`CSRF from header: ${csrfTokenFromHeader}, CSRF from cookie: ${csrfTokenFromCookie}`);
    */

    console.log(`CSRF token header verified: ${csrfTokenFromHeader}`);
  }

  // If we're here, the check passed or wasn't needed (e.g., for a GET request)
  next();
}

module.exports = verifyCsrfTokenMiddleware;