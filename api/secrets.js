// This function immediately executes and sets the jwtSecret.
export const jwtSecret = (() => {
  // Check if the application is running in production environment
  if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
    // If in production and JWT_SECRET is not set, throw an error.
    // This prevents the application from running with a default or insecure secret in production.
    throw new Error('JWT_SECRET is required in production');
  }
  // If the environment is not production or JWT_SECRET is set, return JWT_SECRET.
  // The '||' operator means that if JWT_SECRET is not set, the default string will be used.
  // This default is typically only for development or testing environments.
  return process.env.JWT_SECRET || 'keep it secret. keep it safe';
})();

// This sets the JWT secret for authentication.
// It checks if there's an environment variable named JWT_SECRET.
// If not found, it uses the default string 'keep it secret. keep it safe'.
// export const jwtSecret =
//   process.env.JWT_SECRET || 'keep it secret. keep it safe';
