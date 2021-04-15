const _Browser = require("./lib").appScheme.Browser,
  chrome = {
    http: value => {
      _Browser.ChromeHttp(value);
    },
    https: value => {
      _Browser.ChromeHttp(value);
    }
  },
  firefox = {
    web: value => {
      _Browser.FirefoxWeb(value);
    }
  };
module.exports = {
  chrome,
  firefox
};
