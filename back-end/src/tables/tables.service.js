const knex = require("../db/connection");

function list() {
    return knex("tables")
    .select("*")
    .orderBy("table_name")
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

// seat a reservation_id at a table_id - sync with reservations
function seat(reservation_id, table_id) {
    return knex.transaction(async (trx) => {
        await knex("reservations")
    .where({ reservation_id })
    .update({ status: "seated" })
    .transacting(trx);
    
    return knex("tables")
        .where({ table_id })
        .update({ reservation_id: reservation_id }, "*")
        .transacting(trx)
        .then(createdRecords => createdRecords[0]);
        });
}

// finish a table - sync with reservations
function finish(reservation_id, table_id) {
    return knex.transaction(async (trx) => {
        await knex("reservations")
    .where({ reservation_id })
    .update({ status: "finished" })
    .transacting(trx);
    
    return knex("tables")
        .where({ table_id })
        .update({ reservation_id: null }, "*")
        .transacting(trx)
        .then(createdRecords => createdRecords[0]);
        });
}

function update(updatedTable) {
    return knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable);
}

module.exports = {
    list,
    create,
    read,
    seat,
    finish,
    update,
}