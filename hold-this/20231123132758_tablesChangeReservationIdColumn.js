
exports.up = function(knex) {
  return knex.schema.alterTable("tables", (table) => {
    table.integer("reservation_id").alter().unsigned().nullable().defaultTo(null);
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable("tables", (table) => {
    table.integer("reservation_id").unsigned().notNullable().alter();
  })
};
