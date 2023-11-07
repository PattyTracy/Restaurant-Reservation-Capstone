const knex = require("../db/connection");
const today = new Date();

function create(reservation) {
    return knex("reservations")
    .insert(reservation)
    .returning("*")
    .where({ date: reservation_date })
    .then((createdRecords) => createdRecords[0]);
}

function hasDate() {
return knex("reservations").select("*")
.where({ reservation_date: reservationDate });
}

function list() {
    return knex("reservations").select("*")
    .where({ reservation_date: today })
    .orderBy("reservation_time")
}

function read(reservation_id) {
    return knex("reservations").select("*")
    .where({ reservation_id }).first;
}

module.exports = {
    create,
    hasDate,
    list,
    read
};