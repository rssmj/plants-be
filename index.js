// Importing the 'server' object from the 'server.js' file in the './api' directory
import { server } from './api/server.js';

// Setting the port for the server to listen on.
// If the PORT environment variable is not set, it defaults to port 3000.
const port = process.env.PORT || 3000;

// Starting the server to listen on the specified port
server.listen(port, () => {
  // Logging a message indicating that the server is up and running
  console.log(`\n Server is up on port ${port} \n`);
});
