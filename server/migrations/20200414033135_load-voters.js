/* eslint-disable func-names */
exports.up = function(knex) {
  return knex.schema.createTable("Voters", table => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("address").notNullable();
    table.integer("times_contacted");
    table.string("party").notNullable();
    table.boolean("regstration_status").notNullable();
    table.string("age_range").notNullable();
    table.string("race").notNullable();
    table.string("socioeconomic_status").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Voters");
};
/* eslint-enable func-names */
