const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Data = require("./data");
const cors = require('cors')
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const API_PORT = 3002;
var app = express();

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

app.use(session({
    secret: 'fuckthisshit',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 999999999,
        expires: 999999999
    },
    store: new MongoStore({
        mongooseConnection: db,
        ttl: 24 * 60 * 60 // 1 day
    })
}));

db.once("open", () => console.log("connected to the database"));
// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000'] // <== this will be the URL of our React app (it will be running on port 3000)
}));

// creating routes
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var usersRouter = require('./routes/users');
var searchRouter = require('./routes/search');
var areasRouter = require('./routes/areas')
var housingsRouter = require('./routes/housings')
var activitiesRouter = require('./routes/activities')

app.use('/', indexRouter);
app.use("/api", apiRouter);
app.use("/users", usersRouter);
app.use("/search", searchRouter);
app.use("/areas", areasRouter);
app.use("/housings", housingsRouter);
app.use("/activities", activitiesRouter);

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