const _Video = require("./lib").appScheme.Video,
    bilibili = {
        video: _vid => {
            _Video.Bilibili.video(_vid);
        },
        space: _uid => {
            _Video.Bilibili.space(_uid);
        }
    };
module.exports = {
    bilibili
};
