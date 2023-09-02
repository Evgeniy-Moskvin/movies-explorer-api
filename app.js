require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
// const cors = require('cors');
const helmet = require('helmet');

const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { serverError } = require('./middlewares/serverError');
const { limiter } = require('./utils/rateLimiter');

// const { PORT = 3000, DB = 'mongodb://127.0.0.1:27017/bitfilmsdb', NODE_ENV } = process.env;
const { PORT, DB } = require('./config');

const app = express();

const { SUCCESS_MESSAGE_APP_START, SUCCESS_MESSAGE_CONNECT_DB } = require('./utils/successMessages');
const { ERROR_MESSAGE_CONNECT_DB } = require('./utils/errorMessages');

mongoose.connect(DB, {
  useNewUrlParser: true,
})
  .then(() => {
    console.log(SUCCESS_MESSAGE_CONNECT_DB);
  })
  .catch(() => {
    console.error(ERROR_MESSAGE_CONNECT_DB);
  });

/* app.use(cors({
  origin: ['http://localhost:3001', 'http://movies.emoskvin.nomoreparties.co', 'https://movies.emoskvin.nomoreparties.co'],
  credentials: true,
})); */
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);
app.use(limiter);
app.use(routes);
app.use(errorLogger);

app.use(errors());
app.use(serverError);

app.listen(PORT, () => {
  console.log(SUCCESS_MESSAGE_APP_START);
});
