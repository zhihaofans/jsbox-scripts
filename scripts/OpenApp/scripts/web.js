const _Browser = require("./lib").appScheme.Browser,
  chrome = {
    http: value => {
      _Browser.ChromeHttp(value);
    },
    https: value => {
      _Browser.ChromeHttp(value);
    }
  };
module.exports = {
  chrome
};
