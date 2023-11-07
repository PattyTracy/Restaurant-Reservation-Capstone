const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
/**
 * List handler for reservation resources
 */
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

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

function hasPeople(req, res, next) {
  const { data: {people} = {} } = req.body;
  if (people < 1 || isNaN(people))
    return next({
      status: 400,
      message: "People must be a number greater than zero.",
    });
  next();
}

async function isDate(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;
  const datePattern = /^\d{4}-\d{2}-\d{2}/;
  if (!datePattern.test(reservation_date)) {
    return next({
      status: 400,
      message: `Reservation date ${reservation_date} must be in YYYY-MM-DD format.`,
    });
  }
  return next();
}

async function isTime(req, res, next) {
  const { data: { reservation_time } = {} } = req.body;
  const timePattern = /[0-9]{2}:[0-9]{2}/;
  if (!timePattern.test(reservation_time)) {
    return next({
      status: 400,
      message: "Reservation time must be in HH:MM format.",
    })
  }
  return next();
}

async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

async function list(req, res) {
  const reservationDate = req.query.reservation_date;
  let data = [];
  if (reservationDate) {
    data = await reservationsService.hasDate(reservationDate);
  } else {
    data = await reservationsService.list();
  }
  res.json({
    data: [],
  });
}

async function reservationExists(req, res, next) {
  const reservation = await reservationsService.read(req.params);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservation.reservation_id} cannot be found.`,
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
    isTime,
    asyncErrorBoundary(create),
  ],
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
};
