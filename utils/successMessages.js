const { PORT } = require('../config');

const SUCCESS_MESSAGE_APP_START = `Приложение запущено на порту ${PORT}`;
const SUCCESS_MESSAGE_CONNECT_DB = 'Успешное подключение к БД';
const SUCCESS_MESSAGE_LOGIN = 'Успешный вход';
const SUCCESS_MESSAGE_LOGOUT = 'Успешный выход';

module.exports = {
  SUCCESS_MESSAGE_APP_START,
  SUCCESS_MESSAGE_CONNECT_DB,
  SUCCESS_MESSAGE_LOGIN,
  SUCCESS_MESSAGE_LOGOUT,
};
