const pixivCat = {
        single: urlQuery => {
            // mode=medium&illust_id=xxxx
            $console.warn(urlQuery);
            if (urlQuery && urlQuery.indexOf("illust_id=" >= 0)) {
                let queryItemList = {};
                urlQuery.split("&").map(queryStr => {
                    if (queryStr.indexOf("=") > 0) {
                        const queryArray = queryStr.split("=");
                        queryItemList[queryArray[0]] = queryArray[1];
                    }
                });
                $console.warn(queryItemList);
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
        mult: (illust_id, index = 1) => {
            const illust_id = "";
            $app.openURL(`https://pixiv.cat/${illust_id}-${index}.png`);
        }
    },
    pixivRe = {
        single: illust_id => {
            $app.openURL(`https://pixiv.re/${illust_id}.png`);
        },
        mult: (illust_id, index = 1) => {
            $app.openURL(`https://pixiv.re/${illust_id}-${index}.png`);
        }
    };
module.exports = {
    pixivCat,
    pixivRe
};
