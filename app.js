const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config')

//middleware
app.use(cors());
app.use(bodyParser.json());

//import routes
const postsRoute = require('./routes/post');
app.use('/post',postsRoute)


app.get('/',(req,res) => {
    //console.log(req.headers)
    res.json({message:'meow'});
});


//connect to the DB
mongoose.connect(process.env.DBCONNECTIONURL, () =>{
    console.log('Connected to the database!')
});


//listen to the server
app.listen('3000');