const _Video = require("./lib").appScheme.Video,
    bilibili = {
        video: _vid => {
            _Video.Bilibili.video(_vid);
        }
    };
module.exports = {
    bilibili
};
