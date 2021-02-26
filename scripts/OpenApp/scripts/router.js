const JSDialogs = require("JSDialogs"),
    routerRegex = [
        {
            routerId: "v2er.topic",
            routerRegex: /(http|https):\/\/(www.v2ex|v2ex).com\/t\/(.+)/
        },
        {
            routerId: "v2er.member",
            routerRegex: /(http|https):\/\/(www.v2ex|v2ex).com\/member\/(.+)/
        },
        {
            routerId: "telegram.me",
            routerRegex: /https:\/\/t.me\/(.+)/
        }
    ],
    app = {
        "v2er.topic": {
            type: "social",
            app: "v2er",
            func: "topic"
        },
        "v2er.member": {
            type: "social",
            app: "v2er",
            func: "member"
        },
        "telegram.me": {
            type: "social",
            app: "telegram",
            func: "me"
        }
    },
    _routerData = {
        "v2er.topic": {
            type: "social",
            app: "v2er",
            func: "topic",
            regex: /(http|https):\/\/(www.v2ex|v2ex).com\/t\/(.+)/
        },
        "v2er.member": {
            type: "social",
            app: "v2er",
            func: "member",
            regex: /(http|https):\/\/(www.v2ex|v2ex).com\/member\/(.+)/
        },
        "telegram.me": {
            type: "social",
            app: "telegram",
            func: "me",
            regex: /https:\/\/t.me\/(.+)/
        }
    },
    checkRouterByRegex = _inputUrl => {
        if (_inputUrl) {
            const matchResult = [];
            routerRegex.map(i => {
                const regexMatches = i.routerRegex.exec(_inputUrl);
                if (regexMatches) {
                    matchResult.push({
                        routerId: i.routerId,
                        regexMatch: regexMatches
                    });
                }
            });
            return matchResult;
        } else {
            return undefined;
        }
    },
    checkRouterByRegexA = _inputUrl => {
        if (_inputUrl) {
            const matchResult = [];
            Object.keys(_routerData).map(i => {
                const thisRouter = _routerData[i],
                    regexMatches = thisRouter.regex.exec(_inputUrl);
                if (regexMatches) {
                    matchResult.push({
                        routerId: i,
                        regexMatch: regexMatches
                    });
                }
            });
            return matchResult;
        } else {
            return undefined;
        }
    },
    goRouter = (_routerId, _routerValue) => {
        $console.info(`routerId:${_routerId}\nvalue:${_routerValue}`);
        if (_routerId && _routerValue) {
            const routerData = app[_routerId];
            if (routerData) {
                const jsPath = `/scripts/${routerData.type}.js`;
                if ($file.exists(jsPath)) {
                    const routerJs = require(jsPath);
                    routerJs[routerData.app][routerData.func](_routerValue);
                } else {
                    JSDialogs.showPlainAlert("不存在该文件", jsPath);
                }
            } else {
                JSDialogs.showPlainAlert("错误", "未知路由");
            }
        }
    },
    init = async _url => {
        const routerData = await checkRouterByRegexA(_url);
        if (routerData) {
            $console.info(routerData);
            $ui.menu({
                items: routerData.map(r => r.routerId),
                handler: (title, idx) => {
                    const thisRouter = routerData[idx];
                    goRouter(
                        thisRouter.routerId,
                        thisRouter.regexMatch[thisRouter.regexMatch.length - 1]
                    );
                }
            });
        } else {
            $ui.error("找不到支持该链接的路由");
        }
    };
module.exports = {
    app,
    goRouter,
    init,
    checkRouterByRegex,
    checkRouterByRegexA
};
