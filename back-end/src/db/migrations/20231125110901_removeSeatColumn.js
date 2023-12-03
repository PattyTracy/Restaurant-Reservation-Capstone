
exports.up = function(knex) {
  return knex.schema.alterTable("tables", (table) => {
table.dropColumn("seat")
  })
};

exports.down = function(knex) {
    return knex.schema.alterTable("tables", (table) => {
        table.boolean("seat")
    })
  
};
