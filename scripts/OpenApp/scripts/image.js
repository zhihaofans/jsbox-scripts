const pixivCat = {
        single: urlQuery => {
            if (urlQuery && urlQuery.indexOf("illust_id=" >= 0)) {
                let queryItemList = {};
                urlQuery.split("&").map(queryStr => {
                    if (queryStr.indexOf("=") > 0) {
                        const queryArray = queryStr.split("=");
                        queryItemList[queryArray[0]] = queryArray[1];
                    }
                });
                if (queryItemList["illust_id"]) {
                    const illust_id = queryItemList["illust_id"],
                        newUrl = `https://pixiv.cat/${illust_id}.png`;
                    $ui.menu({
                        items: ["用Safari打开", "分享"],
                        handler: function (title, idx) {
                            switch (idx) {
                                case 0:
                                    $app.openURL(newUrl);
                                    break;
                                case 1:
                                    $share.sheet([newUrl]);
                                    break;
                            }
                        }
                    });
                } else {
                    $app.close();
                }
            } else {
                $app.close();
            }
        },
        mult: (urlQuery, index = 1) => {
            if (urlQuery && urlQuery.indexOf("illust_id=" >= 0)) {
                let queryItemList = {};
                urlQuery.split("&").map(queryStr => {
                    if (queryStr.indexOf("=") > 0) {
                        const queryArray = queryStr.split("=");
                        queryItemList[queryArray[0]] = queryArray[1];
                    }
                });
                if (queryItemList["illust_id"]) {
                    const illust_id = queryItemList["illust_id"],
                        newUrl = `https://pixiv.cat/${illust_id}-${index}.png`;
                    $ui.menu({
                        items: ["用Safari打开", "分享"],
                        handler: function (title, idx) {
                            switch (idx) {
                                case 0:
                                    $app.openURL(newUrl);
                                    break;
                                case 1:
                                    $share.sheet([newUrl]);
                                    break;
                            }
                        }
                    });
                } else {
                    $app.close();
                }
            } else {
                $app.close();
            }
        }
    },
    pixivRe = {
        single: urlQuery => {
            if (urlQuery && urlQuery.indexOf("illust_id=" >= 0)) {
                let queryItemList = {};
                urlQuery.split("&").map(queryStr => {
                    if (queryStr.indexOf("=") > 0) {
                        const queryArray = queryStr.split("=");
                        queryItemList[queryArray[0]] = queryArray[1];
                    }
                });
                if (queryItemList["illust_id"]) {
                    const illust_id = queryItemList["illust_id"],
                        newUrl = `https://pixiv.re/${illust_id}.png`;
                    $ui.menu({
                        items: ["用Safari打开", "分享"],
                        handler: function (title, idx) {
                            switch (idx) {
                                case 0:
                                    $app.openURL(newUrl);
                                    break;
                                case 1:
                                    $share.sheet([newUrl]);
                                    break;
                            }
                        }
                    });
                } else {
                    $app.close();
                }
            } else {
                $app.close();
            }
        },
        mult: (urlQuery, index = 1) => {
            if (urlQuery && urlQuery.indexOf("illust_id=" >= 0)) {
                let queryItemList = {};
                urlQuery.split("&").map(queryStr => {
                    if (queryStr.indexOf("=") > 0) {
                        const queryArray = queryStr.split("=");
                        queryItemList[queryArray[0]] = queryArray[1];
                    }
                });
                if (queryItemList["illust_id"]) {
                    const illust_id = queryItemList["illust_id"],
                        newUrl = `https://pixiv.re/${illust_id}-${index}.png`;
                    $ui.menu({
                        items: ["用Safari打开", "分享"],
                        handler: function (title, idx) {
                            switch (idx) {
                                case 0:
                                    $app.openURL(newUrl);
                                    break;
                                case 1:
                                    $share.sheet([newUrl]);
                                    break;
                            }
                        }
                    });
                } else {
                    $app.close();
                }
            } else {
                $app.close();
            }
        }
    };
module.exports = {
    pixivCat,
    pixivRe
};
