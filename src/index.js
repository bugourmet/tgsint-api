// In src/index.js
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const app = express();
require('dotenv/config')

const PersonRouter = require("./v1/routes/PersonRoutes");
const CarLookUpRouter = require("./v1/routes/CarLookUpRoutes");
const NmapRouter = require("./v1/routes/NmapRoutes");
const WhoisRouter = require("./v1/routes/WhoisRoute");

//middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());

app.use("/api/v1/person/", PersonRouter);
app.use("/api/v1/carlookup/", CarLookUpRouter);
app.use("/api/v1/nmap/", NmapRouter);
app.use("/api/v1/whois/", WhoisRouter);


//connect to the DB
mongoose.connect(process.env.MONGO_URI, () =>{
    console.log('Connected to the database!');
})
.catch(error => console.log(error));

app.listen(process.env.PORT, function(err){
    if (err) console.log("Error in server setup");
    console.log('Listening on port: ' + process.env.PORT);
})