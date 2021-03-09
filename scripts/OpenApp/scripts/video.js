const _Video = require("./lib").appScheme.Video,
    bilibili = {
        video: _vid => {
            _Video.Bilibili.video(_vid);
        },
        space: _uid => {
            _Video.Bilibili.space(_uid);
        },
        b23wtf: value => {
            $app.openURL(`https://b23.wtf/`);
        }
    };
module.exports = {
    bilibili
};
