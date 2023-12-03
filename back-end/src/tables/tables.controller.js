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
  if (res.locals.table.reservation_id) {
    return next({
      status: 400,
      message: "The selected table is occupied.",
    });
  }
  next();
}

// confirm a table is occupied before deleting the reservation_id
// and freeing up a table
async function tableIsOccupied(req, res, next) {
 const { table_id } = req.params;
 const table = await tablesService.read(table_id);
  if (table.reservation_id === null) {
    return next({
      status: 400,
      message: "Table is not occupied.",
    });
  }
  next();
}
// confirm reservation.status isn't "seated" before updating
function reservationNotSeated(req, res, next) {
  if (res.locals.reservation.status === "seated") {
    return next({
      status:400,
      message: "Reservation is already seated."
    })
  };
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

// seat a reservation_id at a table_id
async function update(req, res) {
  const table = await tablesService.read(req.params.table_id);
  const {
    data: { reservation_id },
  } = req.body;
  const updatedTable = {
    ...table,
    reservation_id: reservation_id,
  };
  await tablesService.seat(reservation_id, updatedTable.table_id);
  data = await tablesService.read(updatedTable.table_id);
  res.json({ data });
}

function read(req, res, next) {
  const data = res.locals.table;
  res.json({ data });
}
  
  
// delete a reservation (free up the table)
async function destroy(req, res) {
  const table = await tablesService.read(req.params.table_id);
  const {
    data: { reservation_id },
  } = req.body;
  const updatedTable = {
    ...table,
    reservation_id: null,
  };
  await tablesService.finish(reservation_id, table.table_id);
  data = await tablesService.read(updatedTable.table_id);
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
    hasReservationId,
    reservationIdExists,
    tableExists,
    hasCapacity,
    tableIsFree,
    reservationNotSeated,
    asyncErrorBoundary(update),
  ],
  read: [tableExists, asyncErrorBoundary(read)],
  delete: [tableIsOccupied, asyncErrorBoundary(destroy)],
};
