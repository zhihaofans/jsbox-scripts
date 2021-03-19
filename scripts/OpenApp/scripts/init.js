const JSDialogs = require("JSDialogs"),
    $$ = require("$$"),
    _routerData = require("./router"),
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
                $console.info(`jsPath:${jsPath}`);
                if ($file.exists(jsPath)) {
                    const routerJs = require(jsPath);
                    try {
                        routerJs[routerData.app][routerData.func](_routerValue);
                        $console.info("goRouter");
                    } catch (_error) {
                        $console.error("goRouter");
                        $console.error(_error);
                        $ui.alert({
                            title: "goRouter:Error",
                            message: _error.message
                        });
                    }
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
