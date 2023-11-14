export const up = async function (knex) {
  await knex.schema.createTable('users', (users) => {
    users.increments();
    users.string('first_name');
    users.string('last_name');
    users.string('username', 128).notNullable().unique();
    users.string('password', 128).notNullable();
    users.integer('phone', 15).notNullable();
  });

  await knex.schema.createTable('plants', (plants) => {
    plants.increments();
    plants.string('name', 128).notNullable();
    plants.string('species', 128).notNullable();
    plants.string('water_freq', 128).notNullable();
    plants.string('light_conditions', 128).notNullable();
    plants
      .integer('user_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
};

export const down = async function (knex) {
  await knex.schema.dropTableIfExists('plants');
  await knex.schema.dropTableIfExists('users');
};
