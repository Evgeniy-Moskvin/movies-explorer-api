const { STATUS_CODE_BAD_REQUEST } = require('../utils/httpStatusCodes');
const { ERROR_MESSAGE_BAD_REQUEST } = require('../utils/errorMessages');

class BadRequest extends Error {
  constructor(message) {
    super(message || ERROR_MESSAGE_BAD_REQUEST);
    this.statusCode = STATUS_CODE_BAD_REQUEST;
  }
}

module.exports = BadRequest;
