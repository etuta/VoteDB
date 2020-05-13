// Update with your config settings.

module.exports = {
  test: {
    client: "sqlite3",
    connection: {
      filename: "./voters-test.db"
    },
    useNullAsDefault: true,
    seeds: {
      directory: "./seeds/test"
    }
  },
  development: {
    client: "sqlite3",
    connection: {
      filename: "./voters.db"
    },
    useNullAsDefault: true
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    ssl: true
  }
};
