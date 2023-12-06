const knex = require("../db/connection");

function asDateString(date) {
    return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
      .toString(10)
      .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
  }

function today() {
    return asDateString(new Date());
  }

// change the status of a reservation
function update(reservation_id, status) {
    return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update({ status: status })
    .then((createdRecords) => createdRecords[0]);
}

function edit(updatedReservation) {
    return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedRecords) => updatedRecords[0]);
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

// search for a reservation by mobile number
function search(mobile_number) {
    return knex("reservations")
    .whereRaw(
    "translate(mobile_number, '() -', '') like ?",
    `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
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
    search,
    read,
    edit
};