const _defaultUrl = "https://v2ex.com/member/Livid",
    JSDialogs = require("JSDialogs"),
    $$ = require("$$"),
    router = require("./scripts/router"),
    init = async () => {
        const shareLink = $context.link;
        if (shareLink) {
            // await JSDialogs.showPlainAlert("分享链接", shareLink);
            $$.Str.copy(shareLink);
            router.init(shareLink);
        } else {
            inputUrl();
        }
    },
    inputUrl = async () => {
        const _clipUrl = $$.Str.paste(),
            inputValve = await JSDialogs.showInputAlert(
                "请输入链接",
                "",
                $$.Url.isUrl(_clipUrl) ? _clipUrl : _defaultUrl
            );
        if (inputValve) {
            router.init(inputValve);
        } else {
            JSDialogs.showPlainAlert("错误！", "请输入内容");
        }
    };

try {
    init();
} catch (_error) {
    $console.error(_error.message);
}
