const knex = require("../db/connection");

function list() {
    return knex("tables")
    .select("*")
    .orderBy("table_name", "asc");
}

function create(table) {
    return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

// Seat a reservation_id at a table_id
// function update(updated)

module.exports = {
    list,
    create,
}