const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const hasRequiredProperties = hasProperties("table_name", "capacity");

// middleware for create, update

// confirm no extraneous data is in req.body
const VALID_PROPERTIES = ["table_name", "capacity"];

function hasOnlyValidProperties(req, res, next) {
  const { data } = req.body;
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

// confirm table_name has at least 2 characters
function tableNameIsValid(req, res, next) {
  const { data: { table_name } = {} } = req.body;
  if (table_name.length < 2)
    return next({
      status: 400,
      message: "Input field table_name must have at least 2 characters.",
    });
  next();
}

// confirm table has capacity of a number > 0

function tableCapacityIsValid(req, res, next) {
  const { data: { capacity } = {} } = req.body;
  if (typeof capacity !== "number" || capacity < 1)
    return next({
      status: 400,
      message: "Input field capacity must be a number greater than zero.",
    });
  next();
}

// confirm table_id exists
async function tableExists(req, res, next) {
  const table = await tablesService.read(req.params.table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `Table with id ${req.params.table_id} cannot be found.`,
  });
}

// confirm req.body has data
function hasData(req, res, next) {
  const { data } = req.body;
  if (!data) {
    return next({
      status: 400,
      message: "A resevation_id is required.",
    });
  }
  next();
}

//confirm req.body has reservation_id
async function hasReservationId(req, res, next) {
  const {
    data: { reservation_id },
  } = req.body;
  if (!reservation_id) {
    return next({
      status: 400,
      message: "A reservation_id is required.",
    });
  }
  next();
}

// confirm reservation_id is valid
async function reservationIdExists(req, res, next) {
  const {
    data: { reservation_id },
  } = req.body;
  const reservation = await reservationsService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation with id ${reservation_id} cannot be found.`,
  });
}

// confirm table has capacity for the new reservation
async function hasCapacity(req, res, next) {
  const {
    data: { reservation_id },
  } = req.body;
  const targetReservation = await reservationsService.read(reservation_id);
  const table = await tablesService.read(req.params.table_id);
  console.log("table in hasCapacity: ", table);
  if (table.capacity < targetReservation.people) {
    return next({
      status: 400,
      message: `Table ${req.params.table_id} does not have capacity for reservation ${reservation_id}.`,
    });
  }
  next();
}

// confirm table is free before seating a reservation_id
async function tableIsFree(req, res, next) {
  const table = await tablesService.read(req.params.table_id);
  console.log("Table within tableIsFree: ", table);
  if (table.reservation_id) {
    return next({
      status: 400,
      message: `Table with table_id ${req.params.table_id} is occupied.`,
    });
  }
  next();
}

async function list(req, res) {
  const data = await tablesService.list();
  res.json({ data });
}

async function create(req, res) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  const table = await tablesServices.read(req.params.table_id);
  console.log("Found the table: ", table);
  const updatedTable = {
    ...table,
    reservation_id: req.body.reservation_id,
  };
  await tablesService.update(updatedTable);
  res.status(200);
}

function read(req, res, next) {
  const data = res.locals.table;
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredProperties,
    hasOnlyValidProperties,
    tableNameIsValid,
    tableCapacityIsValid,
    asyncErrorBoundary(create),
  ],
  update: [
    hasData,
    hasReservationId,
    reservationIdExists,
    hasCapacity,
    tableIsFree,
    asyncErrorBoundary(update),
  ],
  read: [tableExists, asyncErrorBoundary(read)],
};
