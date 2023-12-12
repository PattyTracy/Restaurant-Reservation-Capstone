const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");
const tablesRouter = require("./tables/tables.router");

const app = express();

// set up rate limiter: maximum of five requests per minute
// const RateLimit = require('express-rate-limit');
// const limiter = RateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
// });

app.use(cors());
app.use(express.json());

app.use("/reservations", reservationsRouter);
app.use("/tables", tablesRouter);

app.use(notFound);
app.use(errorHandler);


// apply rate limiter to all requests
// app.use(limiter);

app.get('/:path', function(req, res) {
  let path = req.params.path;
  if (isValidPath(path))
    res.sendFile(path);
});

module.exports = app;
