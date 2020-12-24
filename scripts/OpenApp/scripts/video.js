let $$video = require("AppScheme").video;
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
        $$video
            break;
    }
};