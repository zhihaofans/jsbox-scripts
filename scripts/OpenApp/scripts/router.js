const JSDialogs = require("JSDialogs"),
    $$ = require("$$"),
    _routerData = {
        "v2er.topic": {
            type: "social",
            app: "v2er",
            func: "topic",
            regex: /https:\/\/www.v2ex.com\/t\/(.+)/
        },
        "v2er.member": {
            type: "social",
            app: "v2er",
            func: "member",
            regex: /https:\/\/www.v2ex.com\/member\/(.+)/
        },
        "telegram.me": {
            type: "social",
            app: "telegram",
            func: "me",
            regex: /https:\/\/t.me\/(.+)/
        },
        "bilibili.video": {
            type: "video",
            app: "bilibili",
            func: "video",
            regex: /https:\/\/www.bilibili.com\/video\/(.+)/
        },
        "bilibili.m.video": {
            type: "video",
            app: "bilibili",
            func: "video",
            regex: /https:\/\/m.bilibili.com\/video\/(.+)/
        }
    },
    checkRouterByRegex = async _inputUrl => {
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
    goRouter = async (_routerId, _routerValue) => {
        $console.info(`routerId:${_routerId}\nvalue:${_routerValue}`);
        if (_routerId && _routerValue) {
            const routerData = _routerData[_routerId];
            if (routerData) {
                const jsPath = `/scripts/${routerData.type}.js`;
                if ($file.exists(jsPath)) {
                    const routerJs = require(jsPath);
                    routerJs[routerData.app][routerData.func](_routerValue);
                } else {
                    if ($app.env == $env.app) {
                        await JSDialogs.showPlainAlert("不存在该文件", jsPath);
                    } else {
                        $$.Push.default("不存在该文件", jsPath);
                    }
                }
            } else {
                if ($app.env == $env.app) {
                    await JSDialogs.showPlainAlert("错误", "未知路由");
                } else {
                    $$.Push.default("错误", "未知路由");
                }
            }
        }
    },
    init = async _url => {
        if (_url && _url.length > 0) {
            const routerData = await checkRouterByRegex(_url);
            if (routerData && routerData.length > 0) {
                $console.info(routerData);
                $ui.menu({
                    items: routerData.map(r => r.routerId),
                    handler: (title, idx) => {
                        const thisRouter = routerData[idx];
                        goRouter(
                            thisRouter.routerId,
                            thisRouter.regexMatch[
                                thisRouter.regexMatch.length - 1
                            ]
                        );
                    }
                });
            } else {
                if ($app.env == $env.app) {
                    await JSDialogs.showPlainAlert(
                        "错误",
                        "找不到支持该链接的路由"
                    );
                } else {
                    // $$.Push.default("错误", "找不到支持该链接的路由");
                    $ui.alert({
                        title: "错误",
                        message: "找不到支持该链接的路由"
                    });
                }
            }
        } else {
            $app.close();
        }
    };
module.exports = {
    goRouter,
    init,
    checkRouterByRegex
};
