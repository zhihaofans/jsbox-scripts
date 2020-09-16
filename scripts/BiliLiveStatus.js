let scriptName = "哔哩哔哩直播监控",
    cacheId = {
        UID_LIST: "BILIBILI_LIVE_STATUS_UID_LIST"
    };
let env = $app.env;
let getAwait = async (url, headerList = undefined) => {
    const result = await $http.get({
        url: url,
        header: headerList
    });
    return result;
};
let getLiveStatus = uid => {
    const getResult = getAwait(
        `http://api.live.bilibili.com/room/v1/Room/getRoomInfoOld?mid=${uid}`,
        {
            "User-Agent":
                "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
        }
    );
    return getResult;
};
let pushMsg = (title, message) => {
    $push.schedule({
        title: title,
        body: message,
        delay: 5
    });
};
let getSavedUidList = () => {
    return $cache.get(cacheId.UID_LIST) || [];
};
let setUidList = uidList => {
    return $cache.set(cacheId.UID_LIST, uidList);
};
let addUid = uid => {
    var uidList = getSavedUidList();
    $console.info(uidList);
    uidList.push(uid);
    $console.info(uidList);
    setUidList(uidList);
};
// app mode
let appModeView = () => {
    $console.info("App mode");
    $ui.render({
        props: {
            id: "appView_main",
            homeIndicatorHidden: false,
            modalPresentationStyle: 0,
            navButtons: undefined
        },
        views: [
            {
                type: "list",
                props: {
                    data: [
                        {
                            title: "设置",
                            rows: ["添加uid"]
                        },
                        {
                            title: "已设置uid",
                            rows: getSavedUidList()
                        }
                    ]
                },
                layout: $layout.fill,
                events: {
                    didSelect: function(_sender, indexPath, _data) {
                        const section = indexPath.section;
                        const row = indexPath.row;
                        switch (section) {
                            case 0:
                                switch (row) {
                                    case 0:
                                        $input.text({
                                            type: $kbType.number,
                                            placeholder: "",
                                            text: "",
                                            handler: uid => {
                                                if (uid) {
                                                    addUid(uid);
                                                }
                                            }
                                        });
                                        break;
                                }
                                break;
                        }
                    }
                }
            }
        ]
    });
};

// today mode
let todayModeView = () => {
    $ui.render({
        props: {
            navBarHidden: true,
            statusBarStyle: 0
        },
        views: [
            {
                type: "list",
                props: {
                    data: [
                        {
                            title: "Section 0",
                            rows: ["0-0", "0-1", "0-2"]
                        }
                    ]
                },
                layout: $layout.fill,
                events: {
                    didSelect: function(_sender, indexPath, _data) {
                        const section = indexPath.section;
                        const row = indexPath.row;
                    }
                }
            }
        ]
    });
};
let init = () => {
    switch (env) {
        case $env.app:
            appModeView();
            break;
        case $env.today:
            todayModeView();
            break;
        default:
            pushMsg(scriptName, "不支持该启动模式");
            $app.close();
    }
};
init();