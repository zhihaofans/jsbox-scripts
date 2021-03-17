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
                    const illust_id = queryItemList["illust_id"];
                    $app.openURL(`https://pixiv.cat/${illust_id}.png`);
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
                    const illust_id = queryItemList["illust_id"];
                    $app.openURL(`https://pixiv.cat/${illust_id}-${index}.png`);
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
                    const illust_id = queryItemList["illust_id"];
                    $app.openURL(`https://pixiv.re/${illust_id}.png`);
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
                    const illust_id = queryItemList["illust_id"];
                    $app.openURL(`https://pixiv.re/${illust_id}-${index}.png`);
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
