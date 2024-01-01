// Configuration for the 'development' environment
export const development = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: process.env.DEV_DB_FILENAME,
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done);
    },
  },
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};

// Configuration for the 'staging' environment
export const staging = {
  client: 'postgresql',
  connection: {
    database: process.env.STAGING_DB_NAME,
    user: process.env.STAGING_DB_USER,
    password: process.env.STAGING_DB_PASS,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};

// Configuration for the 'production' environment
export const production = {
  production: {
    client: 'postgresql',
    connection: {
      database: process.env.PRODUCTION_DB_NAME,
      user: process.env.PRODUCTION_DB_USER,
      password: process.env.PRODUCTION_DB_PASS,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
