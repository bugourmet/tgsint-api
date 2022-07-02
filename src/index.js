import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';

import PersonRouter from './routes/v1/person.routes.mjs';
import CarLookUpRouter from './routes/v1/carLookUp.routes.mjs';
import NmapRouter from './routes/v1/nmap.routes.mjs';
import WhoisRouter from './routes/v1/whois.routes.mjs';

const app = express();

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
