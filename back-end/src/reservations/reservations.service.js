const knex = require("../db/connection");

function asDateString(date) {
    return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
      .toString(10)
      .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
  }

function today() {
    return asDateString(new Date());
  }

// use transactions to sync tables & reservations
// no join
// interact with what's coming in

function seat(reservation_id, table_id) {
    knex.transaction(async (trx) => {
        await knex("reservations")
        .where("reservation_id", reservation_id)
        .update({ status: "seated" })
        .transacting(trx)

        return knex("tables")
        .where({ table_id: "table_id" })
        .update({ reservation_id }, "*")
        .transacting(trx)
        .then(record => record[0])
        })
}

// change the status of a reservation
function update(updatedReservation) {
    return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation);
}

// create a new reservation
function create(reservation) {
    return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

// get a list of all the reservations for a given
// date - defaults to "today"
function list(date = today()) {
    return knex("reservations").select("*")
    .where({ reservation_date: date })
    .whereNot("status", "finished")
    .orderBy("reservation_time", "asc")
}

// get a reservation with a given reservation_id
function read(reservation_id) {
    return knex("reservations").select("*")
    .where({ reservation_id }).first();
}

module.exports = {
    update,
    create,
    list,
    read,
    // seat
};