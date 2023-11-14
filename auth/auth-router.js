import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Users from '../users/users-model.js';
import { jwtSecret } from '../api/secrets.js';

const router = Router();
router.post('/register', (req, res) => {
  let user = req.body;
  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);

  user.password = hash;
  Users.add(user)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        errorMessage: error.message,
      });
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  Users.findBy({
    username,
  })
    .first()
    .then((user) => {
      const token = generateToken(user);
      user && bcrypt.compareSync(password, user.password)
        ? res.status(200).json({
            message: 'You are logged in!',
            token,
            user,
          })
        : res.status(401).json({
            message: 'Please try logging in, first!',
          });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errorMessage: 'There was an error loggin in!',
      });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '24hr',
  };
  return jwt.sign(payload, jwtSecret, options);
}

export default router;
