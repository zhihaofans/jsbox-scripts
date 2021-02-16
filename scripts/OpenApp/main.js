const JSDialogs = require("./scripts/libs/dialogs"),
    app = require("./scripts/app"),
    init = () => {
        const shareLink = $context.link;
        if (shareLink) {
            app.goApp(shareLink);
        } else {
            inputUrl();
        }
    },
    inputUrl = async () => {
        const inputValve = await JSDialogs.Dialogs.showInputAlert("请输入链接");
        if (inputValve) {
            JSDialogs.Dialogs.showPlainAlert("输入内容", inputValve);
            app.goApp(inputValve);
        } else {
            JSDialogs.Dialogs.showPlainAlert("错误！", "请输入内容");
        }
    };
init();