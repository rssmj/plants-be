// Importing necessary modules
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Users from '../users/users-model.js'; // Presumably interacts with the database for user-related operations
import { jwtSecret } from '../api/secrets.js'; // Secret key for JWT token signing

const router = Router();

// Route for user registration
router.post('/register', (req, res) => {
  let user = req.body;
  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);

  user.password = hash;
  Users.add(user)
    .then((user) => {
      res.status(201).json(user); // Return the created user in JSON format
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        errorMessage: error.message,
      });
    });
});

// Route for user login
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
        errorMessage: 'There was an error logging in!',
      });
    });
});

// Function to generate a JWT token
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
