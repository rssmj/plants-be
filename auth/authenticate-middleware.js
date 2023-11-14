import jwt from 'jsonwebtoken';
import { jwtSecret } from '../api/secrets.js';

export default (req, res, next) => {
  const token = req.headers.authorization;
  const secret = jwtSecret;
  token
    ? jwt.verify(token, secret, (error, decodedToken) => {
        error
          ? res.status(401).json({
              you: 'you shall not pass',
            })
          : ((req.decodedToken = decodedToken), next());
      })
    : res.status(400).json({
        message: 'please provide credentials',
      });
};
