const knex = require("../db/connection");

function list() {
    return knex("tables")
    .select("*")
    .orderBy("table_name", "asc");
}

// Add a new table
function create(table) {
    return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

// find a table by table_id
function read(table_id) {
    return knex("tables").select("*").where({ table_id}).first();
}

// Seat a reservation_id at a table_id
function update(updatedTable) {
    return knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable)
}

module.exports = {
    list,
    create,
    read,
    update,
}