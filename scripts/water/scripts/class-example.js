class Result {
  constructor(success, code = -1, data = undefined, error_message = undefined) {
    this.success = success;
    this.data = data;
    this.code = code;
    this.error = success ? undefined : error_message;
    this.RESULT_VERSION = 1;
  }
}

module.exports = { Result };
