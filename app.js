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

const { PORT = 3000, DB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const app = express();

mongoose.connect(DB, {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('Успешное подключение к БД');
  })
  .catch(() => {
    console.error('Ошибка подключения к БД!');
  });

/* app.use(cors({
  origin: ['http://localhost:3001', 'http://movies.emoskvin.nomoreparties.co', 'https://movies.emoskvin.nomoreparties.co'],
  credentials: true,
})); */
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use(limiter);

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(serverError);

app.listen(PORT, () => {
  console.log(`Приложение запущено на порту ${PORT}`);
});
