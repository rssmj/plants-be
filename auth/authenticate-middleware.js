import jwt from 'jsonwebtoken';
import { jwtSecret } from '../api/secrets.js';

// Middleware function for authentication
export default (req, res, next) => {
  const token = req.headers.authorization; // Extracts the token from the request headers
  const secret = jwtSecret;

  token
    ? jwt.verify(token, secret, (error, decodedToken) => {
        error
          ? res.status(401).json({
              you: 'you shall not pass', // Responds with an error if the token verification fails
            })
          : ((req.decodedToken = decodedToken), next()); // Passes the decoded token to the request object and proceeds to the next middleware
      })
    : res.status(400).json({
        message: 'please provide credentials', // Responds with an error if no token is provided in the headers
      });
};
