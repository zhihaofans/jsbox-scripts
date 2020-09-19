let scriptName = "哔哩哔哩直播监控",
    cacheId = {
        UID_LIST: "BILIBILI_LIVE_STATUS_UID_LIST",
        ROOMID_CACHE: "BILIBILI_LIVE_ROOMID_CACHE",
        UID_DATA_CACHE: "BILIBILI_UID_DATA_"
    };
let env = $app.env;
let getAwait = async (url, headerList = undefined) => {
    const result = await $http.get({
        url: url,
        header: headerList
    });
    return result;
};
let getUidDataCache = uid => {
    const cacheData = $cache.get(cacheId.UID_DATA_CACHE + uid);
    if (cacheData) {
        if (cacheData.time) {
        }
    }

    return undefined;
};
// Bilibili
let openLiveRoom = roomid => {
    $app.openURL(`https://live.bilibili.com/${roomid}`);
};
let refreshLiveroomData = async uid => {
    const liveroomData = await getLiveStatus(uid);
    if (liveroomData.error) {
        $console.error(liveroomData);
        $ui.alert({
            title: "刷新直播间数据出错",
            message: liveroomData.error,
            actions: [
                {
                    title: "OK",
                    disabled: false, // Optional
                    handler: function() {}
                }
            ]
        });
    } else {
        $console.info(liveroomData);
        const data = liveroomData.data;
        if (data.code == 0) {
            setRoomidCache(uid, data.data.roomid);
        } else {
            $ui.alert({
                title: `刷新直播间数据出错(Code${data.code})`,
                message: data.message,
                actions: [
                    {
                        title: "OK",
                        disabled: false, // Optional
                        handler: function() {}
                    }
                ]
            });
        }
    }
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
let getLiveStatusByList = async uidList => {
    var resultList = {};
    uidList.map(uid => {
        const liveStatusResult = getLiveStatus(uid);
    });
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
let isUidAdded = uid => {
    return getSavedUidList().indexOf(uid) >= 0;
};
let removeUid = uid => {
    if (isUidAdded(uid)) {
        var uidList = getSavedUidList();
        uidList.splice(uidList.indexOf(uid), 1);
        $console.info(uidList);
        setUidList(uidList);
    }
};
let addUid = async uid => {
    var uidList = getSavedUidList();
    if (uidList.indexOf(uid) >= 0) {
        $ui.alert({
            title: "添加失败",
            message: "已存在uid:" + uid,
            actions: [
                {
                    title: "OK",
                    disabled: false, // Optional
                    handler: function() {}
                }
            ]
        });
    } else {
        $console.info(uidList);
        uidList.push(uid);
        $console.info(uidList);
        setUidList(uidList);
        const liveStatusData = await getLiveStatus(uid);
        if (liveStatusData.error) {
            $console.error(liveStatusData.error);
            $ui.alert({
                title: "获取直播间信息失败",
                message: liveStatusData.error,
                actions: [
                    {
                        title: "OK",
                        disabled: false, // Optional
                        handler: function() {}
                    }
                ]
            });
        } else {
            $console.info(liveStatusData.data);
            const liveData = liveStatusData.data;
            $ui.alert({
                title: "",
                message: liveData,
                actions: [
                    {
                        title: "OK",
                        disabled: false, // Optional
                        handler: function() {}
                    }
                ]
            });
            if (liveData.code == 0) {
                setRoomidCache(uid, liveData.data.roomid);
            } else {
                $ui.alert({
                    title: `查询直播间信息出错(code${liveData.code})`,
                    message: liveData.message,
                    actions: [
                        {
                            title: "移除uid",
                            disabled: false, // Optional
                            handler: function() {
                                removeUid(uid);
                            }
                        },
                        {
                            title: "OK",
                            disabled: false, // Optional
                            handler: function() {}
                        }
                    ]
                });
            }
        }
    }
};
let getRoomidCache = uid => {
    const roomidCache = $cache.get(cacheId.ROOMID_CACHE) || {};
    return roomidCache[uid] || undefined;
};
let setRoomidCache = (uid, roomid) => {
    var roomidaCache = $cache.get(cacheId.ROOMID_CACHE) || {};
    roomidaCache[uid] = roomid;
    $cache.set(cacheId.ROOMID_CACHE, roomidaCache);
};
// app mode
let appModeView = () => {
    $console.info("App mode");
    const uidList = getSavedUidList();
    $console.info(uidList);
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
                            rows: uidList.map(
                                uid => `${uid}/${getRoomidCache(uid)}`
                            )
                        }
                    ],
                    actions: [
                        {
                            title: "Delete",
                            color: $color("gray"), // default to gray
                            handler: function(sender, indexPath) {
                                removeUid(uidList[indexPath.row]);
                            }
                        },
                        {
                            title: "打开直播间",
                            handler: function(sender, indexPath) {
                                const uid = uidList[indexPath.row];
                                const roomid = getRoomidCache(uid);
                                $console.info(uid);
                                $console.info(roomid);
                                if (roomid) {
                                    openLiveRoom(roomid);
                                } else {
                                    $ui.alert({
                                        title: `uid:${uid}`,
                                        message: "不知道roomid",
                                        actions: [
                                            {
                                                title: "OK",
                                                disabled: false, // Optional
                                                handler: function() {}
                                            },
                                            {
                                                title: "刷新roomid",
                                                disabled: false, // Optional
                                                handler: function() {
                                                    refreshLiveroomData(uid);
                                                }
                                            }
                                        ]
                                    });
                                }
                            }
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
let todayModeView = async () => {
    const uidList = getSavedUidList();
    var listData = [];
    if (uidList.length > 0) {
        const liveStatusData = await getLiveStatus(uidList[0]);
        $console.info(liveStatusData);
        if (liveStatusData.error) {
            listData = [
                {
                    title: "未添加直播间",
                    rows: []
                }
            ];
        } else {
            listData = [
                {
                    title: "直播间",
                    rows: [JSON.stringify(liveStatusData.data)]
                }
            ];
        }
    } else {
        listData = [
            {
                title: "未添加直播间",
                rows: []
            }
        ];
    }

    $ui.render({
        props: {
            navBarHidden: true,
            statusBarStyle: 0
        },
        views: [
            {
                type: "list",
                props: {
                    data: listData
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
            //todayModeView();
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