/* eslint-disable func-names */
exports.up = function(knex) {
  return knex.schema.table("Voters", table => {
    table.string("email");
  });
};

exports.down = function(knex) {
  return knex.schema.table("Voters", table => {
    table.dropColumn("email");
  });
};
/* eslint-enable func-names */
