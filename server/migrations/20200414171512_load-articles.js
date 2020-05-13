/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('Article', (table) => {
    table.increments('id').primary();
    table.string('title').unique().notNullable();
    table.text('extract');
    table.string('edited').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Article');
};
