const app = {
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
        const _u = new URL(_url),
            host = _u.hostname,
            pathname = _u.pathname;
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
    };
module.exports = {
    app,
    url,
    checkRouter
};