const _Browser = require("./lib").appScheme.Browser,
  chrome = {
    http: value => {
      _Browser.Chrome.http(value);
    },
    https: value => {
      _Browser.Chrome.https(value);
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
