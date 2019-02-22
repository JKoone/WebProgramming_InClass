const express = require("express");

const conn = require("../models/mysql_connection");
const app = express.Router();

// Mapping routes to functions
app.get("/", (req, res) => {
  conn.query("SELECT * FROM InClass_Person", (err, data) => {
      if(err) throw err;
      res.send(data);
  })
  //res.send([{FirstName: "Fake Person"}]);

});

module.exports = app;


