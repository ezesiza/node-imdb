const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const movie = require("./routes/movie");
const series = require("./routes/series");
const season = require("./routes/season");

const app = express();
let config = require('config');
let morgan = require('morgan');

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database configuration
const db = require("./utils/keys").mongoURI;

//Connect to MongoDB
mongoose.connect(
        db, { useMongoClient: true }
    )
    .then(() => console.log("Connected to MongoDB! "))
    .catch(err => console.log(err));



//Test Route
app.get("/", (req, res) => res.send("Eze here! Codes works"));
//routes


app.use("/routes/movies", movie);
app.use("/routes/series", series);
app.use("/routes/season", season);



if (config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

const port = process.env.PORT || 5006;

app.listen(port, () => console.log(`Server running on port ${port}`));


module.exports = app;