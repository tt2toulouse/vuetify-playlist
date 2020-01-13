const mysql = require("mysql");

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "omp"
});

con.connect(function(err) {
  if (err) throw err;
  // app.get("/agent", (req, res) => {
  //   console.log("Connected!");
  //   con.query("SELECT * FROM omp.agent", function(err, result) {
  //     if (err) throw err;
  //     res.send(result);
  //   });
  // });

  app.get("/projects", (req, res) => {
    console.log("Connected!");
    con.query("SELECT * FROM omp.projects", function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  });

  app.delete("/projects", (req, res) => {
    console.log("Deleted!");
    con.query("DELETE FROM omp.projects WHERE title = ?", function(
      err,
      result
    ) {
      if (err) throw err;
      res.send(result);
    });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
