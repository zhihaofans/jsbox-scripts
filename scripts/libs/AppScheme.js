//Alook浏览器
let alookBrowserOpen = url => {
    $app.openURL(`Alook://${$text.URLEncode(url)}`);
};
let alookBrowserDownload = url => {
    $app.openURL(`Alook://download/${$text.URLEncode(url)}`);
};
// Chrome (使用jsbox接口)
let chromeBrowserOpen = url => {
    $app.openBrowser({
        type: 10000,
        url: url
    });
};
// QQ浏览器 (使用jsbox接口)
let qqBrowserOpen = url => {
    $app.openBrowser({
        type: 10003,
        url: url
    });
};
// 火狐浏览器 (使用jsbox接口)
let firefoxBrowserOpen = url => {
    $app.openBrowser({
        type: 10002,
        url: url
    });
};
// Safari
let safariPreview = url => {
    $safari.open({
        url: url
    });
};
let safariReadMode = (url, handler) => {
    $safari.open({
        url: url,
        entersReader: true,
        handler: handler
    });
};
let safariAddReadingItem = (url, title, previewText) => {
    $safari.addReadingItem({
        url: url,
        title: title,
        preview: previewText
    });
};
let safariOpen = (url, entersReader = false, height = 360, handler) => {
    $safari.open({
        url: url,
        entersReader: entersReader,
        height: height,
        handler: handler
    });
};
// Avplayer 视频播放器
let avplayerVideo = url => {
    $app.openURL(`AVPlayer://${$text.URLEncode(url)}`);
};
// nPlayer 视频播放器
let nplayerVideo = url => {
    $app.openURL(`nplayer-${url}`);
};
// Documents 文件管理器
let documentsOpen = url => {
    $app.openURL(`r${url}`);
};
// Bilibili
let bilibiliApp = (mode, id) => {
    $app.openURL(`bilibili://${mode}/${id}`);
};
let bilibiliVideo = vid => {
    bilibiliApp("video", vid);
};
let getBilibiliVideoUrl = vid => {
    return `bilibili://video/${vid}`;
};
let bilibiliLive = roomid => {
    bilibiliApp("live", roomid);
};
let bilibiliSpace = uid => {
    bilibiliApp("space", uid);
};
// Acfun
let acfunVideo = vid => {
    $app.openURL(getAcfunVideoUrl(vid));
};
let getAcfunVideoUrl = vid => {
    return `acfun://detail/video/${vid}`;
};
let getAcfunVideoWebUrl = vid => {
    return `https://www.acfun.cn/v/ac${vid}`;
};
// PPHub
let pphubOpenUser = user => {
    $app.openURL(`pphub://user?login=${user}`);
};
let pphubOpenRepository = (user, repository) => {
    $app.openURL(`pphub://repo?owner=${user}&repo=${repository}`);
};
// Woring Copy
let workingcopyClone = url => {
    $app.openURL(`working-copy://clone?remote=${url}`);
};
// Microsoft Edge
let microsoftEdgeWeb = url => {
    $app.openURL(`microsoft-edge-${url}`);
};
// Jsbox
let jsboxInstall = (url, name = undefined, icon = undefined) => {
    var installUrl = `jsbox://import?url=${encodeURI(url)}`;
    if (name) {
        installUrl += `&name=${encodeURI(name)}`;
    }
    if (icon) {
        installUrl += `&icon=${encodeURI(icon)}`;
    }
    $app.openURL(installUrl);
};
let jsboxRun = (name, location = "local") => {
    $app.openURL(`jsbox://run?name=${encodeURI(name)}&location=${location}`);
};

// thor
let thorLaunch = filterName => {
    var appUrl = "thor://sniffer.gui/launch";
    if (filterName) {
        appUrl += `filter_name=${encodeURI(filterName)}`;
    }
    $app.openURL(appUrl);
};

// A岛匿名版
let adaoThread = t => {
    $app.openURL(`adnmb://t/${t}`);
};

const __VERSION__ = 1,
    Browser = {
        AlookBrowser: {
            Open: url => {
                $app.openURL(`Alook://${$text.URLEncode(url)}`);
            },
            Download: url => {
                $app.openURL(`Alook://download/${$text.URLEncode(url)}`);
            }
        },
        Chrome: url => {
            $app.openBrowser({
                type: 10000,
                url: url
            });
        },
        QQBrowser: url => {
            $app.openBrowser({
                type: 10003,
                url: url
            });
        },
        Firefox: url => {
            $app.openBrowser({
                type: 10002,
                url: url
            });
        },
        Safari: {
            Preview: url => {
                $safari.open({
                    url: url
                });
            },
            ReadMode: (url, handler) => {
                $safari.open({
                    url: url,
                    entersReader: true,
                    handler: handler
                });
            },
            AddReadingItem: (url, title, previewText) => {
                $safari.addReadingItem({
                    url: url,
                    title: title,
                    preview: previewText
                });
            },
            Open: (url, entersReader = false, height = 360, handler) => {
                $safari.open({
                    url: url,
                    entersReader: entersReader,
                    height: height,
                    handler: handler
                });
            }
        }
    },
    Video = {
        AVPlayer: url => {
            $app.openURL(`AVPlayer://${$text.URLEncode(url)}`);
        },
        NPlayerVideo: url => {
            $app.openURL(`nplayer-${url}`);
        },
        VlcPlayVideo: url => {
            $app.openURL(`vlc-x-callback://x-callback-url/ACTION?url=${url}`);
        },
        Bilibili: {
            bilibiliApp: (mode, id) => {
                $app.openURL(`bilibili://${mode}/${id}`);
            },
            bilibiliVideo: vid => {
                Video.Bilibili.bilibiliApp("video", vid);
            },
            getBilibiliVideoUrl: vid => {
                return `bilibili://video/${vid}`;
            },
            bilibiliLive: roomid => {
                Video.Bilibili.bilibiliApp("live", roomid);
            },
            bilibiliSpace: uid => {
                Video.Bilibili.bilibiliApp("space", uid);
            }
        }
    },
    Social = {
        adaoThread: t => {
            $app.openURL(`adnmb://t/${t}`);
        },
        v2er: {
            topic: _t => {
                $app.openURL(`v2er://topic?id=${_t}`);
            },
            node: _node => {
                $app.openURL(`v2er://node?title=${_node}`);
            },
            member: _uid => {
                $app.openURL(`v2er://member?username=${_uid}`);
            },
            search: _key => {
                $app.openURL(`v2er://search?query=${_key}`);
            }
        }
    };
module.exports = {
    alookBrowserOpen,
    chromeBrowserOpen,
    qqBrowserOpen,
    alookBrowserDownload,
    firefoxBrowserOpen,
    safariReadMode,
    safariAddReadingItem,
    avplayerVideo,
    nplayerVideo,
    documentsOpen,
    safariPreview,
    bilibiliVideo,
    getBilibiliVideoUrl,
    acfunVideo,
    getAcfunVideoUrl,
    getAcfunVideoWebUrl,
    safariOpen,
    pphubOpenUser,
    pphubOpenRepository,
    workingcopyClone,
    microsoftEdgeWeb,
    jsboxInstall,
    jsboxRun,
    thorLaunch,
    bilibiliLive,
    adaoThread,
    bilibiliSpace,
    bilibiliApp,
    __VERSION__,
    Browser,
    Video,
    Social
};