const express = require("express");

const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(
  cors({
    //     "Access-Control-Allow-Origin" : "*",
    // "Access-Control-Allow-Credentials" : true
  })
);
app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const conn = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "euroair",
});

// Q14 you need to add the full code to use session variables to enable a login system.

conn.connect((err) => {
  if (err) {
    console.log("Could not connect to database server");
    // process.exit(1);
  } else {
    console.log("connected to db");
    // Q4 complete the route to find all flights to the user's chosen
    // destination on the user's chosen date
    app.get("/search/:flightDestination/:flightDate", (req, res) => {
      conn.query(
        "SELECT * FROM eaflights WHERE endcity = ? AND date = ?",
        [req.params.flightDestination, req.params.flightDate],
        (err, result) => {
          // Q5 complete to return the flight details as JSON
          if (err) {
            console.log(err);
          } else {
            res.json(result);
          }
        }
      );
    });

    // Q7 complete the route to book the flight for 1 passenger and a hard-coded
    // username by inserting a record in the bookings table
    app.post("/flightbook/:flightId", (req, res) => {
      conn.query(
        "INSERT INTO `bookings` (`username`,	`flightID`,	`npass`) VALUES (? ,?,?)",
        ["Fred", req.params.flightId, 1],
        (err, results, fields) => {
          if (err) {
            // res.status(500).json({'error': 'Internal error'});
            console.log(err);
          } else {
            res.json({ success: 1 });
          }
        }
      );
    });

    app.post("/flightadd", (req, res) => {
      // Q11 send back an error if any of the details are blank (you need to add this code...)
      console.log(req.params);
      var fNumber = req.body.number;
      var destCity = req.body.dest;
      var theDate2 = req.body.date;
      var departTime = req.body.deptime;
      var arriveTime = req.body.arrtime;
      var price = req.body.thePrice;
      var numSeats = 20;
      if(fNumber || destCity || theDate2 || departTime||arriveTime||price||numSeats == null || undefined) {
        res.status(400)
        return;
      }

      // Q10 complete the 'add flight' route as described in the paper
      conn.query(
        "INSERT  into `eaflights` (`fNumber`,`endcity`,`date`,`depart`,`arrive`,`price`,`nseats`) VALUES (?,?,?,?,?,?,?)",
        [fNumber, destCity, theDate2, departTime, arriveTime, price, numSeats],
        (err, results, fields) => {
          if (err) {
            // res.status(500).json({ error: "Internal error" });
            console.log(err);
          } else {
            // res.json({ success: 1 });
            res.send(results)
          }
        }
      );
    });

    // // Q14 complete the login route on the server
    // app.post('/login', (req, res) => {
    //     // ?????
    // });

    app.listen(3000, () => {
      console.log("server up and running");
    });
  }
});
