const _defaultUrl = "https://www.bilibili.com/video/BV1Do4y1d7K7",
  $$ = require("$$"),
  router = require("./scripts/init"),
  init = async () => {
    const _clipUrl = $$.Str.paste();
    switch (true) {
      case $$.Share.isActionOrSafari():
        inputUrl($$.Share.getLink());
        break;
      case $app.env == $env.app:
        inputUrl(_clipUrl);
        break;
      default:
        $app.close();
    }
  },
  inputUrl = async _inputStr => {
    $input.text({
      type: $kbType.url,
      placeholder: "请输入链接",
      text: $$.Url.isUrl(_inputStr) ? _inputStr : _defaultUrl,
      handler: function (text) {
        if (text) {
          router.init(text);
        } else {
          $ui.alert({
            title: "错误！",
            message: "请输入内容"
          });
        }
      }
    });
  },
  saveError = _error => {
    $file.mkdir("/.temp/error_log/");
    const filePath = `/.temp/error_log/error_${$$.Time.getNowUnixTime()}.txt`,
      success = $file.write({
        data: $data({ string: _error }),
        path: filePath
      });
    $console.info(filePath);
    $console.error(_error);
    $console.warn(success);
    return success;
  };
try {
  init();
} catch (_error) {
  saveError(_error.message);
}
