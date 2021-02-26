const JSDialogs = require("JSDialogs"),
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
        const inputValve = await JSDialogs.showInputAlert(
            "请输入链接",
            "",
            "https://v2ex.com/member/Livid"
        );
        if (inputValve) {
            router.init(inputValve);
        } else {
            JSDialogs.showPlainAlert("错误！", "请输入内容");
        }
    };
init();
