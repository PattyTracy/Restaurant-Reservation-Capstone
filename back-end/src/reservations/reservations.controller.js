const reservationsService = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
);
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */

// middleware for create, update

// function asDateString(date) {
//   return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
//     .toString(10)
//     .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
// }

// function today() {
//   return asDateString(new Date());
// }

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  next();
}

// number of people in reservation is a number >1
function hasPeople(req, res, next) {
  const { data: { people } = {} } = req.body;
  if (typeof people !== "number" || people < 1)
    return next({
      status: 400,
      message: "Input field people must be a number greater than zero.",
    });
  next();
}

// date is in the correct format
const dateFormat = /^\d\d\d\d-\d\d-\d\d$/;

async function isDate(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;
  if (!dateFormat.test(reservation_date)) {
    return next({
      status: 400,
      message: "Field reservation_date must be in YYYY-MM-DD format.",
    });
  }
  return next();
}

// Date is in the future
// async function dateIsFuture(req, res, next) {
//   const todaysDate = today();
//   const { data: reservation_date = {} } = req.body;
//   console.log("THIS IS THE DATE: ", reservation_date);
//   if (todaysDate < reservation_date) {
//     return next({
//       status: 400,
//       message: "The reservation_date must be in the future.",
//     })
//   };
//   return next();
// }

// Date is not a Tuesday
// async function dayIsValid(req, res, next) {
//   const { data: reservation_date = {} } = req.body;
//   const weekday = new Date(reservation_date);
//   console.log("IS IT TUESDAY?", weekday);
//   if (weekday === 2) {
//     return next({
//       status: 400,
//       message: "Periodic Tables is closed on Tuesdays.",
//     })
//   };
//   next();
// }

// time is in the correct format
const timeFormat = /^\d\d:\d\d$/;
async function isTime(req, res, next) {
  const { data: { reservation_time } = {} } = req.body;
  if (!timeFormat.test(reservation_time)) {
    return next({
      status: 400,
      message: "Field reservation_time must be in HH:MM format.",
    });
  }
  return next();
}

async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

async function list(req, res) {
  const date = req.query.date;
  data = await reservationsService.list(date);
  res.json({ data });
}

async function reservationExists(req, res, next) {
  const reservation = await reservationsService.read(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation with id ${req.params.reservation_id} cannot be found.`,
  });
}

function read(req, res, next) {
  const data = res.locals.reservation;
  res.json({ data });
}

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasPeople,
    isDate,
    // dateIsFuture,
    // dayIsValid,
    isTime,
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
};
