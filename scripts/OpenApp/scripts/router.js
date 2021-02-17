const JSDialogs = require("./scripts/libs/dialogs").Dialogs,
    app = {
        "v2er.topic": {
            type: "social",
            app: "v2er",
            func: "topic"
        }
    },
    url = {
        "v2ex.com": {
            "/t/": "v2er.topic"
        }
    },
    checkRouter = _url => {
        const _u = new URL(_url);
        const host = _u.hostname,
            pathname = _u.pathname;
        $console.error(_u);
        if (url[host]) {
            const pathList = Object.keys(url[host]);
            let itemKey = undefined,
                i = 0;
            do {
                if (pathname.startsWith(pathList[i])) {
                    itemKey = url[host][pathList[i]];
                }
                i += 1;
            } while (itemKey == undefined);
            return itemKey;
        } else {
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
    };
module.exports = {
    app,
    url,
    checkRouter,
    goRouter
};