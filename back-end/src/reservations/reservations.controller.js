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
  "people"
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
  const { people } = req.body.data;
  if (people < 1)
    return next({
      status: 400,
      message: "Reservation must be for at least 1 person.",
    });
  next();
}

async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

async function list(req, res) {
  const hasDate = req.query.date;
  let data = [];
  if (hasDate) {
    data = await reservationsService.hasDate();
  } else {
    data = await reservationsService.list();
  }
  res.json({
    data: [],
  });
}

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasPeople,
    asyncErrorBoundary(create),
  ],
  list: [
    asyncErrorBoundary(list),
  ],
};
