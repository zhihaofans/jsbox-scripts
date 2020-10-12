let $$app = require("./app.js");
let $$video = new $$app.video();
let appList = {
    nplayer: "nPlayer",
    documents: "Documents"
};
let getVideoApp = () => {
    const appIdList = appList.keys();
    return appIdList.map(appId => {
        return {
            id: appId,
            title: appList[appId]
        };
    });
};
let openApp = (appId, url) => {
    switch (appId) {
        case "nPlayer":
            $$video.nplayer(url);
            break;
    }
};

module.exports = {
    openApp,
    getVideoApp
};