const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const app = express();
require('dotenv/config');

const PersonRouter = require('./v1/routes/PersonRoutes');
const CarLookUpRouter = require('./v1/routes/CarLookUpRoutes');
const NmapRouter = require('./v1/routes/NmapRoutes');
const WhoisRouter = require('./v1/routes/WhoisRoute');

//middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());

// 5req/min
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: { status: 'FAILED', data: 'Too Many Requests!' },
  standardHeaders: true,
  statusCode: 429,
});

// 10req/min
const lookupLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: { status: 'FAILED', data: 'Too Many Requests!' },
  standardHeaders: true,
  statusCode: 429,
});

app.use('/api/v1/person/', lookupLimiter, PersonRouter);
app.use('/api/v1/carlookup/', lookupLimiter, CarLookUpRouter);
app.use('/api/v1/nmap/', apiLimiter, NmapRouter);
app.use('/api/v1/whois/', apiLimiter, WhoisRouter);

//connect to the DB
mongoose
  .connect(process.env.MONGO_URI, () => {
    console.log('Connected to the database!');
  })
  .catch((error) => console.log(error));

app.listen(process.env.PORT, function (err) {
  if (err) console.log(err);
  console.log('Listening on port: ' + process.env.PORT);
});
