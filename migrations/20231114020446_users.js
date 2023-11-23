export const up = async function (knex) {
  // Create 'users' table
  await knex.schema.createTable('users', (users) => {
    // Define columns for the 'users' table
    users.increments(); // Auto-incrementing primary key 'id'
    users.string('first_name'); // Column for first name
    users.string('last_name'); // Column for last name
    users.string('username', 128).notNullable().unique(); // Username column with constraints
    users.string('password', 128).notNullable(); // Password column with constraints
    users.string('phone', 15).notNullable(); // Phone column with constraints
  });

  // Create 'plants' table
  await knex.schema.createTable('plants', (plants) => {
    // Define columns for the 'plants' table
    plants.increments(); // Auto-incrementing primary key 'id'
    plants.string('name', 128).notNullable(); // Column for plant name
    plants.string('species', 128).notNullable(); // Column for plant species
    plants.string('water_freq', 128).notNullable(); // Column for water frequency
    plants.string('light_conditions', 128).notNullable(); // Column for light conditions
    plants.string('leaf_type', 128); // Column for leaf type
    plants
      .integer('user_id') // Column for referencing user_id from 'users' table
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE'); // Establish foreign key relationship and set onDelete behavior
  });
};

export const down = async function (knex) {
  // Drop 'plants' table first
  await knex.schema.dropTableIfExists('plants');

  // Drop 'users' table next
  await knex.schema.dropTableIfExists('users');
};
