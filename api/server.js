// Load environment variables from .env file
import 'dotenv/config';

// Importing necessary modules for the Express server
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Middleware and route handlers for authentication, users, and plants
import authenticate from '../auth/authenticate-middleware.js';
import usersRouter from '../users/users-router.js';
import plantsRouter from '../plants/plants-router.js';
import authRouter from '../auth/auth-router.js';

// Creating an Express server instance
export const server = express();

// Applying middleware to enhance server security and functionality
server.use(express.json()); // Parsing incoming request bodies in JSON format.
server.use(helmet()); // Helmet helps secure the Express app by setting various HTTP headers.
server.use(cors()); // Cors enables Cross-Origin Resource Sharing for the server.

// Handling the root endpoint '/'
server.get('/', (req, res) => {
  res.status(200).json({ message: `api up` }); // Sending a JSON response for the root endpoint.
});

// Defining routes for different functionalities
server.use('/api/auth', authRouter); // Endpoint for authentication-related routes
server.use('/api/plants', authenticate, plantsRouter); // Endpoint for plant-related routes, authenticated
server.use('/api/users', authenticate, usersRouter); // Endpoint for user-related routes, authenticated
