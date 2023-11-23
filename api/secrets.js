// This sets the JWT secret for authentication.
// It checks if there's an environment variable named JWT_SECRET.
// If not found, it uses the default string 'keep it secret. keep it safe'.
export const jwtSecret =
  process.env.JWT_SECRET || 'keep it secret. keep it safe';
