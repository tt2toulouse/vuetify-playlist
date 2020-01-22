const mysql = require("mysql");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require("cors");
const axios = require("axios").default;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "omp",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;

  // Get all projects
  app.get("/projects", (req, res) => {
    console.log("Connected!");
    con.query("SELECT id, title, person, due, content, status FROM omp.projects", function(err, result) {
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
    let project = req.body;
    console.log(req);
    console.log(project);
    // project={
    //   title: 'test',
    //   person: 'testset',
    //   due: "2012-09-09",
    //   status: "testestestset",
    //   content: "Blablabla"
    // }
    var params = [
      project.title,
      project.person,
      project.due,
      project.status,
      project.content
    ];
    con.query(
      `INSERT INTO omp.projects SET title = ?, person = ?, due = ?, status = ?, content = ? `,
      params,
      res.send("Added !!")
      // (err, rows, fields) => {
      //   if (!err)
      //     rows.forEach(element => {
      //       if (element.constructor == Array)
      //         res.send("Inserted project id : " + element[0].id);
      //     });
      //   else console.log(err);
      // }
    );
  });

  // Update 1 project
  app.put("/projects/:id", (req, res) => {
    let project = req.body;
    
      con.query(
        `UPDATE projects p SET title = ?, person = ?, due = ?, status = ?, content = ? WHERE p.id=` + req.params.id,
      [
        project.title,
        project.person,
        project.due,
        project.status,
        project.content
      ],

       (err, res, rows) => {
        if (!err) res.send("Updated successfully");
        else console.log(err);
      }
    );
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
