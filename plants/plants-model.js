import db from '../dbConfig.js';

export const Plants = {
  add, // Function to add a new plant
  addPlantToUser, // Alternative function to add a plant directly associated with a user
  find, // Function to find and retrieve all plants
  findByUser, // Function to find plants belonging to a specific user
  findById, // Function to find a plant by its ID
  update, // Function to update a plant's information
  remove, // Function to remove/delete a plant
};

// Find and retrieve all plants with specific columns
function find() {
  return db('plants').select(
    'id',
    'name',
    'species',
    'water_freq',
    'light_conditions',
    'leaf_type',
    'user_id'
  );
}

// Find plants belonging to a specific user based on user_id
function findByUser(userid) {
  return db('plants').where('user_id', userid);
}

// Add a new plant to the database, associating it with a specific user
async function add(plant, userId) {
  // Add the user_id to the plant object
  plant.user_id = userId;

  // Insert the plant into the database
  const [id] = await db('plants').insert(plant);

  // Return the newly inserted plant by its ID
  return findById(id);
}

// Alternative method to directly add a plant associated with a user
function addPlantToUser(newPlant, userId) {
  return db('plants').insert({ ...newPlant, user_id: userId });
}

// Find a plant by its ID
function findById(id) {
  return db('plants')
    .where({
      id,
    })
    .first();
}

// Update a plant's information based on its ID
function update(id, changes) {
  return db('plants').where({ id }).update(changes);
}

// Remove/delete a plant from the table using its ID
function remove(id) {
  return db('plants')
    .where(id)
    .del()
    .then((rowsDeleted) => {
      if (rowsDeleted === 0) {
        throw new Error(`No plant found for deletion with ID: ${id}`);
      }
      return rowsDeleted;
    })
    .catch((error) => {
      console.error('Error while deleting plant:', error);
      throw new Error(`Cannot remove plant by ID: ${id}`);
    });
}

// function remove(id) {
//   return db('plants').where(id).del();
// }

// async function add(plant) {
//   const [id] = await db('plants').insert(plant);
//   return findById(id);
// }

// function remove(id) {
//   return db('plants').where({ id }).del(); // ensure to pass an object { id } for consistency
// }
