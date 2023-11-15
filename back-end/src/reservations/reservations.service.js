const knex = require("../db/connection");
// const dateToday = new Date();
// const year = dateToday.getFullYear();
// const month = String(dateToday.getMonth() + 1).padStart(2, "0");
// const day = String(dateToday.getDate()).padStart(2, "0");
// const today = `${year}-${month}-${day}`;
// const hours = dateToday.getHours().toString().padStart(2, "0");
// const minutes = dateToday.getMinutes().toString().padStart(2, "0");
// const seconds = dateToday.getSeconds().toString().padStart(2, "0");
// const time = `${hours}:${minutes}:${seconds}`;

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
    .where({ reservation_date: reservation_date })
    .then((createdRecords) => createdRecords[0]);
}

// function hasDate(reservationDate) {
//     date = asDateString(reservationDate);
// return knex("reservations").select("*")
// .where({ "reservation_date": reservationDate })
// .orderBy("reservation_time", "asc");
// }

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
    // hasDate,
    list,
    read
};