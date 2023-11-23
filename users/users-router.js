import { Router } from 'express';
import bcrypt from 'bcryptjs';
import Users from './users-model.js';
import Auth from '../auth/authenticate-middleware.js';

const router = Router();

// Get all users route
router.get('/', (req, res) => {
  console.log('token', req.decodedToken); // Logging decoded token
  Users.find()
    .then((users) => {
      res.status(200).json(users); // Responding with retrieved users
    })
    .catch((err) => res.send(err)); // Handling errors
});

// Get a specific user by ID route
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then((user) => {
      res.status(200).json(user); // Responding with the found user
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message }); // Handling errors
    });
});

// Update user by ID route (with authentication middleware)
router.put('/:id', Auth, (req, res) => {
  let user = req.body;
  const { id } = req.params;
  const changes = req.body;
  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);

  user.password = hash; // Hashing the user's password
  Users.findById(id)
    .then((user) => {
      user
        ? Users.update(id, changes).then((updateUser) => {
            res.status(200).json({
              message: `successfully updated user ID: ${id}`,
              updateUser,
            }); // Responding with a success message and updated user
          })
        : res.status(404).json({ message: 'no user found' }); // Handling if user is not found
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message }); // Handling errors
    });
});

// Delete user by ID route (with authentication middleware)
router.delete('/:id', Auth, (req, res) => {
  const { id } = req.params;
  Users.remove({ id })
    .then((deleted) => {
      res.status(200).json({ message: 'user deleted', deleted }); // Responding with success message and deleted user data
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message }); // Handling errors
    });
});

export default router;
