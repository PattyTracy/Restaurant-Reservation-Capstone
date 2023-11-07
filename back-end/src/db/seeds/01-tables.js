const tables = require("../fixtures/tables");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex
  .raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE")
    .then(function () {
      // Inserts seed entries
      return knex("tables").insert(tables);
    });
};