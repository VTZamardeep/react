/**this is book controller */
const bookings = require("../models/book");
const con = require("../database/sql")


/**this function will post the details of booking in booking table */
async function postBook(req, res) {
    try {
       const result= await con.execute("select * from questions  where id="+req.params.id+";");
       res.json({
        "success": true,
        "data": result[0]
    });
    res.end;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    postBook,
}