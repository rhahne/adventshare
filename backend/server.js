const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Data = require("./data");

const API_PORT = 3001;
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

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            data: data
        });
    });
});


// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
    const {
        id,
        update
    } = req.body;
    Data.findOneAndUpdate(id, update, err => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true
        });
    });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
    const {
        id
    } = req.body;
    Data.findOneAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({
            success: true
        });
    });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
    let data = new Data();

    const {
        id,
        message
    } = req.body;

    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }
    data.message = message;
    data.id = id;
    data.save(err => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true
        });
    });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));



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
    res.render('error');
});

module.exports = app 