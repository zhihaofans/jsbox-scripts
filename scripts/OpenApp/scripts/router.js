const JSDialogs = require("JSDialogs"),
    $_Url = require("$_").Url,
    app = {
        "v2er.topic": {
            type: "social",
            app: "v2er",
            func: "topic"
        }
    },
    url = {
        "www.v2ex.com": {
            "/t/": "v2er.topic"
        },
        "v2ex.com": {
            "/t/": "v2er.topic"
        }
    },
    checkRouter = async _url => {
        try {
            const _u = $_Url.regex(_url),
                host = _u.host,
                pathname = _u.path;
            $console.warn(_url);
            $console.error(_u);
            if (url[host]) {
                let pathList = Object.keys(url[host]),
                    itemKey = "",
                    routerPath = "",
                    i = 0;
                do {
                    const thisItem = pathList[i];
                    if (pathname.startsWith(thisItem)) {
                        routerPath = thisItem;
                        itemKey = url[host][thisItem];
                    }
                    i += 1;
                } while (itemKey == "" && i < pathList.length);
                return {
                    routerKey: itemKey,
                    routerPath: routerPath
                };
            } else {
                return undefined;
            }
        } catch (_error) {
            $console.error(_error.message);
            await JSDialogs.showPlainAlert("Line 42:try catch", _error.message);
            return undefined;
        }
    },
    goRouter = (routerId, _url, routerPath) => {
        if (routerId && _url) {
            const _url = $_Url.regex(_url),
                routerData = app[routerId];
            if (routerData) {
                const jsPath = `/scripts/${routerData.type}.js`;
                if ($file.exists(jsPath)) {
                    const routerJs = require(jsPath);
                    routerJs[routerData.app][routerData.func](_url);
                } else {
                    JSDialogs.showPlainAlert("不存在该文件", jsPath);
                }
            } else {
                JSDialogs.showPlainAlert("错误", "未知路由");
            }
        }
    },
    init = async _url => {
        const routerData = await checkRouter(_url);
        if (routerData && routerData.routerKey) {
            $console.info(
                `routerKey:${routerData.routerKey}\nrouterPath:${routerData.routerPath}`
            );
            goRouter(routerData.routerKey, _url, routerData.routerPath);
        } else {
            $ui.error("找不到支持该链接的路由");
        }
    };
module.exports = {
    app,
    url,
    checkRouter,
    goRouter,
    init
};