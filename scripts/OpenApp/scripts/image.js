const pixivCat = {
        single: illust_id => {
            $app.openURL(`https://pixiv.cat/${illust_id}.png`);
        },
        mult: (illust_id, index = 1) => {
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