const express = require('express');
const con = require('./../../Database/Connection');

var app = new express.Router();

app.post('/signup', function (req, res) {
  console.log("received", req.body)
  var sql = "INSERT INTO login_details (first_name, last_name, email, password, created_on, contact, gender, category) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?)";
  var data = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password,
    req.body.contact,
    req.body.gender,
    req.body.category
  ];
  con.query(sql, data, function (err, result) {
    if (!err && result.affectedRows !== 0) {
      res.send({
        success: true
      })
    }
    else {
      res.send({
        success: false
      })
    }
  });

});

app.get('/users', function (req, res) {
  var sql = "SELECT user_id, first_name, last_name, email, contact, gender, category created_on FROM login_details";
  var respone;
  con.query(sql, function (err, result) {
    if (!req.query.user_id) {
      con.query("SELECT * FROM login_details", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    } else {
      con.query('SELECT * FROM login_details WHERE user_id = ' + req.query.user_id, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    }
  });

});

module.exports = app;




