let appScheme = require("./scripts/AppScheme");
class Video {
    nPlayer(_url) {
        appScheme.nplayerVideo(_url);
    }
}
module.exports = {
    video: new Video
};