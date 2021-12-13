class ResponseWrapper {
  constructor(code, message, countdown) {
    this.code = code;
    this.message = message;
    if (countdown) {
      this.countdown = Math.floor(countdown / 1000);
    }
  }
}

ResponseWrapper.ok = message => new ResponseWrapper(0, message);
ResponseWrapper.error = (code, message, countdown) => new ResponseWrapper(code, message, countdown);

module.exports = ResponseWrapper;
