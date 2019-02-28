const express = require("express");

const conn = require("../models/mysql_connection");
const app = express.Router();
const userModel = require("../models/user");

// Mapping routes to functions
app.get("/", (req, res) => {
  userModel.getAll((err, data) => {
    if(err) throw err;
    res.send(data);
  })
});

app.get("/:id", (req, res) => {
  userModel.get(req.params.id, (err, data) => {
    if(err) throw err;
    res.send(data);
  })
});

app.post("/", (req, res) => {
  userModel.add(req.body, (err, data) => {
    if(err) throw err;
    res.send(data);
  })
})


// Equivalent to return for require
module.exports = app;


