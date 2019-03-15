const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Data = require("./data");
const cors = require('cors')

const API_PORT = 3002;
var app = express();
const router = express.Router();

const dblink = 'mongodb+srv://Robin:Tj2cEFnJ1RxEltqh@cluster0-qcewh.gcp.mongodb.net/test?retryWrites=true'

// Connect to mongo
mongoose
    .connect('mongodb://localhost/adventshare', {
        useNewUrlParser: true
    })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));
// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors())


// this is our get method
router.get("/demo", (req, res) => {
    let demoOne = [
        {title: 'history', name: 'sÚon'},
        {title: 'stroopwafels', name: 'sÚon'}
    ]
    res.json(demoOne)
});

// append /api for our http requests
app.use("/api", router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

module.exports = app 