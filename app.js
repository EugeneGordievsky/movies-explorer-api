require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const celebrateErrorHandler = require('./middlewares/celebrate-error-handler');
const indexRouter = require('./routes/index');
const limiter = require('./middlewares/rate-limiter');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(helmet());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(requestLogger);

app.use(indexRouter);

app.use(celebrateErrorHandler);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT);
