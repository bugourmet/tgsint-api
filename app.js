const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv/config')

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('combined'));

//import routes
const apiroute = require('./routes/api');
app.use('/api',apiroute);
app.use('/api/phone/',apiroute);
app.use('/api/find/',apiroute);

app.get('/',(req,res) => {
    res.json({message:'meow'});
});

app.get('/api',(req,res) => {
    res.json({message:'meow'});
});


//connect to the DB
mongoose.connect(process.env.DBCONNECTIONURL, () =>{
    console.log('Connected to the database!');
})
.catch(error => console.log(error));
;


app.listen(process.env.PORT, function(err){
    if (err) console.log("Error in server setup");
    console.log('Listening on port: ' + process.env.PORT);
})