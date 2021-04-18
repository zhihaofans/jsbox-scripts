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
      _Browser.Firefox.web(value);
    }
  },
  msedge = {
    http: value => {
      _Browser.Microsoftedge.http(value);
    },
    https: value => {
      _Browser.Microsoftedge.https(value);
    }
  };
module.exports = {
  chrome,
  firefox,
  msedge
};
