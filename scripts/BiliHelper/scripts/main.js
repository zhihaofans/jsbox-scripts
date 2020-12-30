let $$View = require("./view"),
    $$Setting = require("./setting"),
    $$Dialogs = require("./libs/dialogs"),
    init = (first_time) => {
        const main_view_title = "BiliHelper",
            ui_view = [{
                type: "list",
                props: {
                    data: [{
                        title: "V1",
                        rows: ["设置Access Key", "签到", "获取个人信息", "刷新Access key", "获取饼干"]
                    }, {
                        title: "设置",
                        rows: ["进入设置页面"]
                    }]
                },
                layout: $layout.fill,
                events: {
                    didSelect: function (_sender, indexPath, _data) {
                        switch (indexPath.section) {
                            case 0:
                                switch (indexPath.row) {
                                     case 0:
                                        $$View.User.updateAccessKey();
                                        break;
                                    case 1:
                                        //$$View.CheckIn();
                                        break;
                                    case 2:
                                        //$$View.User.getMyInfo();
                                        break;
                                    case 3:
                                        $$View.User.refreshToken();
                                        break;
                                    case 4:
                                        $$View.User.getCookiesByAccessKey();
                                        break; 
                                    default:
                                        // $ui.error("暂不支持");
                                        $$Dialogs.Dialogs.showPlainAlert("错误!", "暂不支持")
                                }
                                break;
                            case 1:
                                switch (indexPath.row) {
                                    case 0:
                                        $$Setting.showSettingPage();
                                        break;
                                    default:
                                        // $ui.error("暂不支持");
                                        $$Dialogs.Dialogs.showPlainAlert("错误!", "暂不支持")
                                }
                                break;
                            default:
                                // $ui.error("暂不支持");
                                $$Dialogs.Dialogs.showPlainAlert("错误!", "暂不支持")

                        }
                    }
                }
            }];
        if (first_time) {
            $ui.render({
                props: {
                    id: "main",
                    homeIndicatorHidden: false,
                    modalPresentationStyle: 0,
                    title: main_view_title
                },
                views: ui_view,
                events: {
                    appeared: function () {
                        $app.tips("Hi~");
                    },
                    shakeDetected: function () {
                        //摇一摇
                    }
                }
            });
        } else {
            $ui.push({
                props: {
                    title: main_view_title
                },
                views: ui_view
            });
        }
    };
module.exports = {
    init
};