const JSDialogs = require("./scripts/libs/dialogs").Dialogs,
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
            const _u = new URL(_url);
            const host = _u.hostname,
                pathname = _u.pathname;
            $console.warn(_url);
            $console.error(_u.toString());
            if (url[host]) {
                let pathList = Object.keys(url[host]),
                    itemKey = undefined,
                    i = 0;
                do {
                    const thisItem = pathList[i];
                    if (pathname.startsWith(thisItem)) {
                        itemKey = url[host][thisItem];
                    }
                    i += 1;
                } while (itemKey == undefined);
                return itemKey;
            } else {
                return undefined;
            }
        } catch (_error) {
            $console.error(_error.message);
            await JSDialogs.showPlainAlert("try catch", _error.message);
            return undefined;
        }
    },
    goRouter = (routerId, _url) => {
        if (routerId && _url) {
            const routerData = app[routerId];
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
    init = _url => {
        const routerKey = checkRouter(_url);
        if (routerKey) {
            $console.info(`routerKey:${routerKey}`);
            goRouter(routerKey, _url);
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