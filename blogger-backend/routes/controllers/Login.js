const express = require('express');
const con = require('./../../Database/Connection');

var app = new express.Router();

app.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (email && password) {
        con.query('SELECT user_id, first_name FROM login_details WHERE email = ? AND password = ?', [email, password], function (err, results) {
            console.log("result login", results);
            if (results.length > 0 && !err) {
                
                res.send({
                    success: true,
                    user_id: results[0].user_id,
                    first_name: results[0].first_name                
                })
            } else {
                res.send({
                    success: false
                })
            }

        });
    }
});

module.exports = app;