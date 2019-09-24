const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const multer = require("multer");
const helmet = require("helmet");
const bodyParser = require('body-parser');


/**importing routes from here */

const book = require("./routes/book");



const con = require("./database/sql");
app.use(helmet());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(multer({
  limits: { fileSize: process.env.FILESIZE }
}).single("image"));
/**setting headers to give permission for CORS */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**calling routes starts from here */

app.use("/question", book);
app.use("/questionIds", async function (req, res) {
  try {
    const result = await con.execute("select  id,question  from questions");
    res.json({
      "success": true,
      "data": result[0]
    });
    res.end;
  } catch (error) {
    console.log(error)
  }

});

app.listen(4000);
