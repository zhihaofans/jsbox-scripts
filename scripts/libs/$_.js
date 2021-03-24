class SuperString extends String {
  constructor(_str) {
    super(_str);
  }
  toJson() {
    try {
      return JSON.parse(this);
    } catch (_error) {
      $console.error(`SuperString:${_error.message}`);
      return undefined;
    }
  }
}
const Url = {
  regex: inputUrl => {
    let _inputUrl = inputUrl,
      fragmentIndex = _inputUrl.indexOf("#"),
      fragment = undefined,
      queryIndex = _inputUrl.indexOf("?"),
      queryStr = undefined,
      queryObj = {};
    if (fragmentIndex >= 0) {
      fragment = _inputUrl.substring(fragmentIndex + 1, _inputUrl.length);
      _inputUrl = _inputUrl.substring(0, fragmentIndex);
    }
    if (queryIndex >= 0) {
      queryStr = _inputUrl.substring(queryIndex + 1, _inputUrl.length);
      _inputUrl = _inputUrl.substring(0, queryIndex);
      queryStr.split("&").map(i => {
        if (i.indexOf("=")) {
          const _queryItem = i.split("=");
          if (_queryItem.length == 2) {
            queryObj[_queryItem[0]] = _queryItem[1];
          }
        }
      });
    } else {
      queryObj = undefined;
    }
    const regex = /(.+):\/\/(.+?)\/(.+)/,
      matches = regex.exec(_inputUrl);
    if (matches) {
      const scheme = matches[1],
        host = matches[2],
        path = matches[3],
        urlResult = {
          scheme: scheme,
          host: host,
          path: path.startsWith("/") ? path : `/${path}`,
          fragment: fragment,
          query: queryObj,
          queryStr: queryStr
        };
      return urlResult;
    } else {
      return matches || undefined;
    }
  },
  isUrl: _inputUrl => {
    const _urlResult = Url.regex(_inputUrl);
    return _urlResult ? _urlResult.host && _urlResult.scheme : false;
  }
};

module.exports = {
  Url,
  SuperString
};
