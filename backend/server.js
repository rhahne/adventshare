const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')
var app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
require("dotenv").config();

// Connect to mongo
mongoose
    .connect(process.env.DB_HOST, {
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
    origin: [process.env.REACT_APP_BASE_URL] // <== this will be the URL of our React app (it will be running on port 3000)
}));
app.use(express.static(path.join(__dirname, 'public/build')))

// creating routes
var usersRouter = require('./routes/users');
var searchRouter = require('./routes/search');
var areasRouter = require('./routes/areas')
var housingsRouter = require('./routes/housings')
var activitiesRouter = require('./routes/activities')
var bookingsRouter = require('./routes/bookings')

app.use("/api/users", usersRouter);
app.use("/api/search", searchRouter);
app.use("/api/areas", areasRouter);
app.use("/api/housings", housingsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/bookings", bookingsRouter);

app.get("/*", (req, res, next) => {
    var options = {
        root: __dirname + '/public/build',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
      };
    
    //   var fileName = req.params.name;
      res.sendFile("index.html", options, function (err) {
        if (err) {
          next(err);
        } else {
          console.log('send:', err);
        }
      });
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    debugger
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send('errrrrrrrrror');
});

module.exports = app