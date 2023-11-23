import db from '../dbConfig.js';

// Object containing user-related database operations
const Users = {
  add, // Function to add a new user to the database
  find, // Function to retrieve all users from the database
  findBy, // Function to find users by a specific filter
  findById, // Function to find a user by ID
  update, // Function to update user information
  remove, // Function to remove a user from the database
};

// Retrieve all users from the 'users' table
function find() {
  return db('users').select(
    'id',
    'first_name',
    'last_name',
    'username',
    'password',
    'phone'
  );
}

// Find users based on a given filter
function findBy(filter) {
  return db('users').where(filter);
}

// Add a new user to the 'users' table
async function add(user) {
  const [id] = await db('users').insert(user); // Insert user and get the new ID
  return findById(id); // Return the newly added user by their ID
}

// Find a user by their ID in the 'users' table
function findById(id) {
  return db('users')
    .where({
      id,
    })
    .first();
}

// Update user information in the 'users' table by their ID
function update(id, changes) {
  return db('users').where({ id }).update(changes);
}

// Remove a user from the 'users' table by their ID
function remove(id) {
  return db('users').where({ id }).del(); // Ensure to pass an object { id } for consistency
}

export default Users; // Export the Users object containing all user-related database operations

// function remove(id) {
//   return db('users').where(id).del();
// }
