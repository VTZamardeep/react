/**this is book route */
const book = require("../controller/book");
const express = require("express");
const router = express.Router();


/**this will post the booking to bookings table */
router.get("/:id",book.postBook);

module.exports = router;