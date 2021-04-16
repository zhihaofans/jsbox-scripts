const _Video = require("./lib").appScheme.Video,
  bilibili = {
    video: _vid => {
      _Video.Bilibili.video(_vid);
    },
    space: _uid => {
      _Video.Bilibili.space(_uid);
    },
    article: _id => {
      _Video.Bilibili.article(_id);
    },
    dynamic: _id => {
      _Video.Bilibili.dynamic(_id);
    },
    live: _id => {
      _Video.Bilibili.live(_id);
    },
    b23wtf: value => {
      $app.openURL(`https://b23.wtf/${value}`);
    },
    vtbmoe: value => {
      $app.openURL(`https://vtbs.moe/detail/${value}`);
    }
  },
  acfun = {
    user: value => {
      $app.openURL(`https://www.acfun.cn/u/${value}.aspx`);
      // _Video.Acfun.user(value);
    }
  };
module.exports = {
  bilibili,
  acfun
};
