import { Router } from 'express';
import bcrypt from 'bcryptjs';
import Users from './users-model.js';
import Auth from '../auth/authenticate-middleware.js';

const router = Router();

router.get('/', (req, res) => {
  console.log('token', req.decodedToken);
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.send(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.put('/:id', Auth, (req, res) => {
  let user = req.body;
  const { id } = req.params;
  const changes = req.body;
  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);

  user.password = hash;
  Users.findById(id)
    .then((user) => {
      user
        ? Users.update(id, changes).then((updateUser) => {
            res.status(200).json({
              message: `successfully updated user ID: ${id}`,
              updateUser,
            });
          })
        : res.status(404).json({ message: 'no user found' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.delete('/:id', Auth, (req, res) => {
  const { id } = req.params;
  Users.remove({ id })
    .then((deleted) => {
      res.status(200).json({ message: 'user deleted', deleted });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

export default router;
