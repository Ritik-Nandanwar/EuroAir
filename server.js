const express = require("express");

const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(
  cors({
    //     "Access-Control-Allow-Origin" : "*",
    // "Access-Control-Allow-Credentials" : true
  })
);
app.use(express.static("static"));

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
    // app.get("/search/:flightDestination/:flightDate", (req, res) => {
    //   // res.send(req.params.flightDestination, req.params.flightDate);
    //   conn.query(
    //     'SELECT * FROM euroair WHERE endcity = ? AND date = ?',
    //     [req.params.flightDestination, req.params.flightDate],
    //     (err, results) => {
    //       if (err) throw err;
    //       console.log(req.params.flightDestination, req.params.flightDate);
    //       // Q5 complete to return the flight details as JSON
    //       res.json(results.toString());
    //     }
    //   );
    // });
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
    // app.get('/search/:flightDestination/:flightDate', (req, res) => {
    //   console.log(req.params.flightDestination, req.params.flightDate);
    //   res.send(req.params.flightDestination, req.params.flightDate)
    //     // conn.query("SELECT * FROM `eaflights` WHERE endcity = ? AND date = ?"
    //     //     [ req.params.flightDestination, req.params.flightDate ],
    //     //     (err, rows) => {
    //     //         res.send(rows)
    //     //         // Q5 complete to return the flight details as JSON
    //     //     });
    // });

    // Q7 complete the route to book the flight for 1 passenger and a hard-coded
    // username by inserting a record in the bookings table
    // app.post('/flightbook/:flightId', (req, res) => {
    //     conn.query("INSERT INTO ?????",
    //         [ ????? ],
    //         (err, results, fields) => {
    //             if(err) {
    //                 res.status(500).json({'error': 'Internal error'});
    //             } else {
    //                 res.json({'success': 1});
    //             }
    //         });
    // });

    // app.post('/flightadd', (req, res) => {
    //     // Q11 send back an error if any of the details are blank (you need to add this code...)

    //     // Q10 complete the 'add flight' route as described in the paper
    //     conn.query("INSERT INTO ?????",
    //         [ ????? ],
    //         (err, results, fields) => {
    //             if(err) {
    //                 res.status(500).json({'error': 'Internal error'});
    //             } else {
    //                 res.json({'success': 1});
    //             }
    //         });
    // });

    // // Q14 complete the login route on the server
    // app.post('/login', (req, res) => {
    //     // ?????
    // });

    app.listen(3000, () => {
      console.log("server up and running");
    });
  }
});
