const knex = require("../db/connection");

function asDateString(date) {
    return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
      .toString(10)
      .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
  }

function today() {
    return asDateString(new Date());
  }

function create(reservation) {
    return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function list(date = today()) {
    return knex("reservations").select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_time", "asc")
}

function read(reservation_id) {
    return knex("reservations").select("*")
    .where({ reservation_id }).first();
}

module.exports = {
    create,
    list,
    read
};