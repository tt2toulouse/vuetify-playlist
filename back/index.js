const mysql = require("mysql");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require("cors");
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
    con.query(`SELECT * FROM omp.projects`, function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  });


  app.get("/projects", (req, res) => {
    con.query(`SELECT * FROM omp.projects`, (err, result) => {
      if (err) {
        //  If an error has occurred, then the user is informed of the error
        res.status(500).send("Erreur lors de la récupération des agents OMP");
      } else {
        // If everything went well, we send the result of the SQL query as JSON.
        res.json(resuts);
      }
    }
  );
  });

  // Delete 1 project by id
  app.delete("/projects/:id", (req, res) => {
    const idProject = req.params.id;

    con.query(`DELETE FROM omp.projects WHERE id=?`, [idProject], err => {
      if (err) {
        // If an error has occurred, then the user is informed of the error
        console.log(err);
        res.status(500).send("Errueur de supprssion d'un agent OMP");
      } else {
        // If everything went well, we send a status "ok".
        res.sendStatus(200);
      }
    });
  });

  // Insert 1 project
  app.post("/projects", (req, res) => {
    const project = req.body;

    con.query(`INSERT INTO omp.projects SET ?`, project, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la sauvegarde d'un agent OMP");
      } else {
        res.sendStatus(200);
      }
    });
  });

  // Update 1 project
  app.put("/projects", (req, res) => {
    const idProject = req.body.id;
    const project = req.body;

    con.query(
      `UPDATE projects SET ? WHERE id = ?`,
      [project, idProject],
      err => {
        if (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la modification d'un agent OMP");
        } else {
          res.sendStatus(200);
        }
      }
    );
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
