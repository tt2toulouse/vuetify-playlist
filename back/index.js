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
  database: "omp",
  multipleStatements: true
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

  // Get all projects
  app.get("/projects", (req, res) => {
    console.log("Connected!");
    con.query("SELECT * FROM omp.projects", function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  });

  // Get 1 project by id
  app.get("/projects/:id", (req, res) => {
    con.query(
      "SELECT * FROM omp.projects WHERE id=?",
      [req.params.id],
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });

  // Delete 1 project by id
  app.delete("/projects/:id", (req, res) => {
    con.query(
      "DELETE FROM omp.projects WHERE id=?",
      [req.params.id],
      (err, rows, fields) => {
        if (!err) res.send("deleted");
        else console.log(err);
      }
    );
  });

  // Insert 1 project
  app.post("/projects", (req, res) => {
    let proj = req.body;
    var sql =
      "SET @id = ?; SET @title = ?; SET @person = ?; SET @due = ?; SET @status = ?; SET @content = ?; \
      CALL ProjectAddOrEdit(@id,@title,@person,@due,@status,@content);";
    con.query(
      sql,
      [proj.id, proj.title, proj.person, proj.due, proj.status, proj.content],

      (err, rows, fields) => {
        if (!err)
          rows.forEach(element => {
            if (element.constructor == Array)
              res.send("Inserted project id : " + element[0].id);
          });
        else console.log(err);
      }
    );
  });

  // Update 1 project
  app.put("/projects", (req, res) => {
    let proj = req.body;
    var sql =
      "SET @id = ?; SET @title = ?; SET @person = ?; SET @due = ?; SET @status = ?; SET @content = ?; \
        CALL ProjectAddOrEdit(@id,@title,@person,@due,@status,@content);";
    con.query(
      sql,
      [proj.id, proj.title, proj.person, proj.due, proj.status, proj.content],

      (err, rows, fields) => {
        if (!err) res.send("Updated successfully");
        else console.log(err);
      }
    );
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
