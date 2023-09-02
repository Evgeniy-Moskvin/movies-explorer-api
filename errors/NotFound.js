const { STATUS_CODE_NOT_FOUND } = require('../utils/httpStatusCodes');
const { ERROR_MESSAGE_NOT_FOUND } = require('../utils/errorMessages');

class NotFound extends Error {
  constructor(message) {
    super(message || ERROR_MESSAGE_NOT_FOUND);
    this.statusCode = STATUS_CODE_NOT_FOUND;
  }
}

module.exports = NotFound;
