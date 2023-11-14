import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import authenticate from '../auth/authenticate-middleware.js';
import usersRouter from '../users/users-router.js';
import plantsRouter from '../plants/plants-router.js';
import authRouter from '../auth/auth-router.js';

export const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: `api up` });
});

server.use('/api/auth', authRouter);
server.use('/api/plants', authenticate, plantsRouter);
server.use('/api/users', authenticate, usersRouter);
