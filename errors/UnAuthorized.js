const { STATUS_CODE_UNAUTHORIZED } = require('../utils/httpStatusCodes');
const { ERROR_MESSAGE_UNAUTHORIZED } = require('../utils/errorMessages');

class UnAuthorized extends Error {
  constructor(message) {
    super(message || ERROR_MESSAGE_UNAUTHORIZED);
    this.statusCode = STATUS_CODE_UNAUTHORIZED;
  }
}

module.exports = UnAuthorized;
