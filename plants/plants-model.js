import db from '../dbConfig.js';

export const Plants = {
  add,
  addPlantToUser,
  find,
  findByUser,
  findById,
  update,
  remove,
};

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

function findByUser(userid) {
  return db('plants').where('user_id', userid);
}

async function add(plant, userId) {
  // Add the user_id to the plant object
  plant.user_id = userId;

  // Insert the plant into the database
  const [id] = await db('plants').insert(plant);

  // Return the newly inserted plant by its ID
  return findById(id);
}

// async function add(plant) {
//   const [id] = await db('plants').insert(plant);
//   return findById(id);
// }

function addPlantToUser(newPlant, userId) {
  return db('plants').insert({ ...newPlant, user_id: userId });
}

function findById(id) {
  return db('plants')
    .where({
      id,
    })
    .first();
}

function update(id, changes) {
  return db('plants').where({ id }).update(changes);
}

// function remove(id) {
//   return db('plants').where({ id }).del(); // ensure to pass an object { id } for consistency
// }

function remove(id) {
  return db('plants').where(id).del();
}
