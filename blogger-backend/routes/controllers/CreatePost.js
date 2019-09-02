const express = require('express');
const con = require('./../../Database/Connection');

var app = new express.Router();

app.post('/createpost', function (req, res) {

    var sql = "INSERT INTO post_details ( user_id, posted_on, post_title, post_body) VALUES (?, CURRENT_TIMESTAMP, ?, ?)";
    var data = [
        req.body.user_id,
        req.body.postTitle,
        req.body.postBody


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
})

app.get('/posts', function (req, res) {
    if (!req.query.user_id) {
        con.query("SELECT * FROM login_details INNER JOIN post_details ON login_details.user_id=post_details.user_id", function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    } else {
        con.query("SELECT * FROM post_details WHERE user_id = " + req.query.user_id, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    }
}

);

app.put('/posts', function (req, res) {
    var sql = "UPDATE post_details SET post_title= '" + req.body.postTitle + "', post_body= '" + 
    req.body.postBody + "' WHERE post_id = '" + req.query.post_id + "'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result.affectedRows + "record(s) updated !")
    });
});

app.delete('/posts', function (req, res) {
    var sql = "DELETE FROM post_details WHERE post_id = '" + req.query.post_id + "'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send("Number of records deleted: " + result.affectedRows);
    });
});


module.exports = app;