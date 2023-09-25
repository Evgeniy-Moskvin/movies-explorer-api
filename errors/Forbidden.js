const { STATUS_CODE_FORBIDDEN } = require('../utils/httpStatusCodes');
const { ERROR_MESSAGE_FORBIDDEN } = require('../utils/errorMessages');

class Forbidden extends Error {
  constructor(message) {
    super(message || ERROR_MESSAGE_FORBIDDEN);
    this.statusCode = STATUS_CODE_FORBIDDEN;
  }
}

module.exports = Forbidden;
