const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
);

/**
 * List handler for reservation resources
 */

// middleware for create, update

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
  const { data: {people} = {} } = req.body;
  if (typeof(people) !== "number" || people < 1)
    return next({
      status: 400,
      message: "Input field people must be a number greater than zero.",
    });
  next();
}

// date is in the correct format, in the future, and not a Tuesday
async function isDate(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;
  const datePattern = /^\d{4}-\d{2}-\d{2}/;
  if (!datePattern.test(reservation_date)) {
    return next({
      status: 400,
      message: "Field reservation_date must be in YYYY-MM-DD format.",
    });
  }
  const date = new Date(req.body.date); 

  if (!date || date < new Date() || date.getDay() === 2) {
    return res.status(400).json({ error: 'Invalid date' });
  }
  return next();
}

// time is in the correct format
async function isTime(req, res, next) {
  const { data: { reservation_time } = {} } = req.body;
  const timePattern = /[0-9]{2}:[0-9]{2}/;
  if (!timePattern.test(reservation_time)) {
    return next({
      status: 400,
      message: "Field reservation_time must be in HH:MM format.",
    })
  }
  return next();
}



async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

async function list(req, res) {
  // check to see whether date = yyyy-mm-dd
  const date = req.query.date;

  // let data = [];
  // // if so return only the reservations for that day
  // if (reservationDate) {
  //   data = await reservationsService.hasDate(reservationDate);
  // // otherwise return the reservations for today
  // } else {
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
    isDate,
    isTime,
    hasPeople,
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
};
