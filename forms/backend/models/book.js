/**this is book model */
const con = require("../database/sql")

class Bookings {

    /***this method will post the data in bookings table ,parameter will be json type ...req.body.data */
    postBooking(data) {
        return con.execute("INSERT INTO `bookings` (`id`, `userId`,`hotelId`, `roomId`, `checkIn`, `checkout`, `rooms`, `guests`, `specialRequest`, `createdAt`, `updatedAt`) VALUES (NULL, '" + data.userId + "','" + data.hotelId + "','" + data.roomId + "', '" + data.checkIn + "', '" + data.checkOut + "', " + data.rooms + ", " + data.guests + ",'" + data.request + "', '2019-08-14 ', '2019-08-14 ');");
    }
}

module.exports = Bookings;