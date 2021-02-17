const _router = require("./router"),
    goApp = _url => {
        const routerKey = _router.checkRouter(_url);
        $console.info(_url);
        if (routerKey) {
            $console.info(`routerKey:${routerKey}`);
        } else {
            $ui.error("找不到支持该链接的路由");
        }
    };
module.exports = {
    goApp
};