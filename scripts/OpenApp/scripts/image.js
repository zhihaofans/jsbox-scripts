const pixivCat = {
        single: urlQuery => {
            // mode=medium&illust_id=xxxx
            if (urlQuery && urlQuery.indexOf("illust_id=" >= 0)) {
                let illust_id = "",
                    queryItemList = urlQuery.split;
                $app.openURL(`https://pixiv.cat/${illust_id}.png`);
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
