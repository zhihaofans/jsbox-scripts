let $Api = require("./api"),
    initView = () => {
        $ui.push({
            props: {
                title: "Bilibili 签到"
            },
            views: [{
                type: "list",
                props: {
                    data: ["漫画", "直播签到", "直播银瓜子兑换硬币"]
                },
                layout: $layout.fill,
                events: {
                    didSelect: function (_sender, indexPath, _data) {
                        switch (indexPath.row) {
                            case 0:
                                $Api.Comic.checkIn();
                                break;
                            case 1:
                                $Api.Live.checkIn();
                                break;
                            case 2:
                                $Api.Live.silver2coin();
                                break;
                            default:
                                $ui.error("待更新");
                        }
                    }
                }
            }]
        });
    };
module.exports = {
    initView
};