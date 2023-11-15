import db from '../dbConfig.js';

export const Plants = {
  add,
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

async function add(plant) {
  const [id] = await db('plants').insert(plant);
  return findById(id);
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

function remove(id) {
  return db('plants').where(id).del();
}
