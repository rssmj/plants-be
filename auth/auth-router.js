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

  Users.findBy({ username })
    .first()
    .then((user) => {
      // Check if user exists and the password is correct
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // Generate token for the user
        res.status(200).json({
          message: 'You are logged in!',
          token,
          // It's a good practice to omit sensitive data like password in the response
          userData: {
            id: user.id,
            username: user.username,
            // ... other user data you want to include
          },
        });
      } else {
        res.status(401).json({
          message: 'Invalid credentials',
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        errorMessage: 'There was an error logging in!',
      });
    });
});

// router.post('/login', (req, res) => {
//   let { username, password } = req.body;
//   Users.findBy({
//     username,
//   })
//     .first()
//     .then((user) => {
//       const token = generateToken(user);
//       user && bcrypt.compareSync(password, user.password)
//         ? res.status(200).json({
//             message: 'You are logged in!',
//             token,
//             user,
//           })
//         : res.status(401).json({
//             message: 'Please try logging in, first!',
//           });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         errorMessage: 'There was an error logging in!',
//       });
//     });
// });

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
