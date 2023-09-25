const { STATUS_CODE_CONFLICT } = require('../utils/httpStatusCodes');
const { ERROR_MESSAGE_CONFLICT } = require('../utils/errorMessages');

class Conflict extends Error {
  constructor(message) {
    super(message || ERROR_MESSAGE_CONFLICT);
    this.statusCode = STATUS_CODE_CONFLICT;
  }
}

module.exports = Conflict;
