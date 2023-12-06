const reservationsService = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */

// middleware for create, update

// confirm no extraneous properties are input
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
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

// confirm status for "create" can only be "booked"
function statusIsBooked(req, res, next) {
  const {
    data: { status },
  } = req.body;
  if (status === "seated" || status === "finished") {
    return next({
      status: 400,
      message: "New reservation status cannot be 'seated' or 'finished'.",
    });
  }
  next();
}

// confirm number of people for "create" in reservation is a number >1
function hasPeople(req, res, next) {
  const { data: { people } = {} } = req.body;
  if (typeof people !== "number" || people < 1)
    return next({
      status: 400,
      message: "Input field people must be a number greater than zero.",
    });
  next();
}

// confirm date in "create" is in the correct format
const dateFormat = /^\d\d\d\d-\d\d-\d\d$/;

async function isDate(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;
  if (!dateFormat.test(reservation_date)) {
    return next({
      status: 400,
      message: "Field reservation_date must be in YYYY-MM-DD format.",
    });
  }
  next();
}

// confirm date in "create" is in the future
async function dateIsFuture(req, res, next) {
  const today = new Date();
  const { data: { reservation_date } = {} } = req.body;
  const requestedDate = new Date(reservation_date);
  if (today > requestedDate) {
    return next({
      status: 400,
      message: "The reservation_date must be in the future.",
    });
  }
  next();
}

// confirm date in "create" is not a Tuesday
async function dayIsValid(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;
  const formattedReservationDate = new Date(reservation_date);
  const reservationDay = formattedReservationDate.getUTCDay();
  if (reservationDay === 2) {
    return next({
      status: 400,
      message: "Periodic Tables is closed on Tuesdays.",
    });
  }
  next();
}

// confirm time in "create" is in the correct format
async function isTime(req, res, next) {
  const timeFormat = /^\d\d:\d\d$/;
  const { data: { reservation_time } = {} } = req.body;
  if (!timeFormat.test(reservation_time)) {
    return next({
      status: 400,
      message: "Field reservation_time must be in HH:MM format.",
    });
  }
  next();
}

// confirm time in "create" is between 10:30 am and 9:30 pm
async function timeIsValid(req, res, next) {
  const { data: { reservation_time } = {} } = req.body;
  const userTime = new Date(`2023-01-01 ${reservation_time}`);
  const minTime = new Date("2023-01-01 10:30");
  const maxTime = new Date("2023-01-01 21:30");

  if (userTime < minTime || userTime > maxTime) {
    return next({
      status: 400,
      message: "Reservation time must be between 10:30 am and 9:30 pm.",
    });
  }
  next();
}

// confirm a given reservation_id exists
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

// confirm current status is not "finished" prior to updating
function statusToUpdate(req, res, next) {
  if (res.locals.reservation.status === "finished") {
    return next({
      status: 400,
      message: "A reservation with status 'finished' cannot be updated.",
    });
  }
  next();
}

// status can only be changed to seated, finished, or cancelled
function newStatusIsValid(req, res, next) {
  const { data: { status } } = req.body;
  const validStatus = ["booked", "seated", "finished", "cancelled"];
  if (validStatus.includes(status)) {
    return next();
  }
  next({
    status: 400,
    message: `Current reservation status cannot be "${status}".`,
  });
}

// update an existing reservation's status
async function updateStatus(req, res) {
  const { data: { status } } = req.body;
  await reservationsService.updateStatus(res.locals.reservation.reservation_id, status);
  const data = await reservationsService.read(res.locals.reservation.reservation_id);
  res.status(200).json({ data });
}

// update an existing reservation
async function update(req, res) {
    const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
    await reservationsService.update(updatedReservation);
    const data = await reservationsService.read(updatedReservation.reservation_id)
    res.status(200).json({ data })
  };

// create a new reservation with status "booked"
async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

async function list(req, res) {
  const date = req.query.date;
  const mobile_number = req.query.mobile_number;
  if (date) {
    data = await reservationsService.list(date);
  }
  if (mobile_number) {
    data = await reservationsService.search(mobile_number);
  }
  res.json({ data });
}

function read(req, res, next) {
  const data = res.locals.reservation;
  res.json({ data });
}

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    statusIsBooked,
    hasPeople,
    isDate,
    dateIsFuture,
    dayIsValid,
    isTime,
    timeIsValid,
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  updateStatus: [
    reservationExists,
    statusToUpdate,
    newStatusIsValid,
    asyncErrorBoundary(updateStatus),
  ],
  update: [
    reservationExists,
    hasRequiredProperties,
    hasPeople,
    isDate,
    dateIsFuture,
    dayIsValid,
    isTime,
    timeIsValid,
    statusIsBooked,
    asyncErrorBoundary(update),
  ]
};
