const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var usersRoutes = require('./routes/controllers/SignUp');
var loginRoutes = require('./routes/controllers/Login');
var postRoutes = require('./routes/controllers/CreatePost');

var app = new express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(usersRoutes);
app.use(loginRoutes);
app.use(postRoutes);

app.listen(4000, () => {
    console.log('Listening on port 4000')
});