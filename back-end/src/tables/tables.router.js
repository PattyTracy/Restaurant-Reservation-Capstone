const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

<<<<<<< HEAD
// router.route("/:table_id/seat").put(controller.update).all(methodNotAllowed);
=======
router.route("/:table_id/seat").put(controller.update).all(methodNotAllowed);
>>>>>>> 53252024ffb912e2e62f7d5d85d112ca653bfdce
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;