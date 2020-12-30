let $B_user = require("./user"),
    $_Static = require("./static"),
    $$ = require("$$"),
    $$Dialogs = require("./libs/dialogs"),
    User = {
        checkIn: async () => {
            const accessKey = $B_user.Auth.accessKey(),
                uid = $B_user.Auth.uid(),
                postBody = {
                    platform: "ios",
                    uid: uid,
                    access_key: accessKey
                },
                postHeader = {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": $_Static.UA.COMIC.CHECK_IN
                };
            $console.warn(accessKey);
            $console.warn(uid);
            if (accessKey && uid) {
                $ui.loading(true);
                const httpPost = await $$.Http.postAwait(
                    $_Static.URL.COMIC.CHECK_IN,
                    postBody,
                    postHeader
                );
                if (httpPost.error) {
                    $ui.loading(false);
                    $console.error(httpPost.error);
                    $$Dialogs.Dialogs.showPlainAlert("签到失败", "网络请求发生错误");
                } else {
                    var checkInData = httpPost.data;
                    $console.info(checkInData);
                    $ui.loading(false);
                    if (checkInData) {
                        if (checkInData.code == 0) {
                            $$Dialogs.Dialogs.showPlainAlert("签到结果", "签到成功");
                        } else {
                            switch (checkInData.code) {
                                case "invalid_argument":
                                    $$Dialogs.Dialogs.showPlainAlert("签到结果", "今天已签到");
                                    break;
                                default:
                                    $$Dialogs.Dialogs.showPlainAlert("错误：${checkInData.code}", checkInData.msg);
                            }
                        }
                    } else {
                        $$Dialogs.Dialogs.showPlainAlert("签到失败", "服务器返回空白结果");
                    }
                }
            } else {
                $$Dialogs.Dialogs.showPlainAlert("签到失败", "未登录");
            }
        }
    };
module.exports = {
    User
};