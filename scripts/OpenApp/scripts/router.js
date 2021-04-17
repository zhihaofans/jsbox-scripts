module.exports = {
  "v2er.topic": {
    type: "social",
    app: "v2er",
    func: "topic",
    regex: /https:\/\/www.v2ex.com\/t\/(.+)/
  },
  "v2er.member": {
    type: "social",
    app: "v2er",
    func: "member",
    regex: /https:\/\/www.v2ex.com\/member\/(.+)/
  },
  "telegram.me": {
    type: "social",
    app: "telegram",
    func: "me",
    regex: /https:\/\/t.me\/(.+)/
  },
  "bilibili.video": {
    type: "video",
    app: "bilibili",
    func: "video",
    regex: /https:\/\/www.bilibili.com\/video\/(.+)/
  },
  "bilibili.space": {
    type: "video",
    app: "bilibili",
    func: "space",
    regex: /https:\/\/space.bilibili.com\/(\d+)/
  },
  "bilibili.article": {
    type: "video",
    app: "bilibili",
    func: "article",
    regex: /https:\/\/www.bilibili.com\/read\/cv(\d+)/
  },
  "bilibili.live.room": {
    type: "video",
    app: "bilibili",
    func: "live",
    regex: /https:\/\/live.bilibili.com\/(\d+)/
  },
  "bilibili.m.video": {
    type: "video",
    app: "bilibili",
    func: "video",
    regex: /https:\/\/m.bilibili.com\/video\/(.+)/
  },
  "bilibili.m.space": {
    type: "video",
    app: "bilibili",
    func: "space",
    regex: /https:\/\/m.bilibili.com\/space\/(\d+)/
  },
  "bilibili.m.article": {
    type: "video",
    app: "bilibili",
    func: "article",
    regex: /https:\/\/www.bilibili.com\/read\/mobile\/(\d+)/
  },
  "bilibili.t.h5.dynamic": {
    type: "video",
    app: "bilibili",
    func: "dynamic",
    regex: /https:\/\/t.bilibili.com\/h5\/dynamic\/detail\/(\d+)/
  },
  "bilibili.t.dynamic": {
    type: "video",
    app: "bilibili",
    func: "dynamic",
    regex: /https:\/\/t.bilibili.com\/(\d+)/
  },
  "bilibili.b23wtf": {
    type: "video",
    app: "bilibili",
    func: "b23wtf",
    regex: /https:\/\/b23.tv\/(.+)/
  },
  "bilibili.vtbmoe": {
    type: "video",
    app: "bilibili",
    func: "vtbmoe",
    regex: /https:\/\/space.bilibili.com\/(\d+)/
  },
  "pixiv.cat.artworks.single": {
    type: "image",
    app: "pixivCat",
    func: "single",
    regex: /https:\/\/www.pixiv.net\/artworks\/(\d+)/
  },
  "pixiv.cat.artworks.mult": {
    type: "image",
    app: "pixivCat",
    func: "mult",
    regex: /https:\/\/www.pixiv.net\/artworks\/(\d+)/
  },
  "twitter.status": {
    type: "social",
    app: "twitter",
    func: "status",
    regex: /https:\/\/www.twitter.com\/(.+)\/status\/(\d+)/
  },
  "twitter.mobile.status": {
    type: "social",
    app: "twitter",
    func: "status",
    regex: /https:\/\/mobile.twitter.com\/(.+)\/status\/(\d+)/
  },
  "twitter.user": {
    type: "social",
    app: "twitter",
    func: "user",
    regex: /https:\/\/www.twitter.com\/([A-Za-z0-9_]+)/
  },
  "twitter.mobile.user": {
    type: "social",
    app: "twitter",
    func: "user",
    regex: /https:\/\/mibile.twitter.com\/([A-Za-z0-9_]+)/
  },
  "chrome.http": {
    type: "web",
    app: "chrome",
    func: "http",
    regex: /http:\/\/(.+)/
  },
  "chrome.https": {
    type: "web",
    app: "chrome",
    func: "https",
    regex: /https:\/\/(.+)/
  },
  "firefox.web": {
    type: "web",
    app: "firefox",
    func: "web",
    regex: /(.+)/
  },
  "instagram.user": {
    type: "social",
    app: "instagram",
    func: "user",
    regex: /https:\/\/instagram.com\/([A-Za-z0-9_]+)/
  },
  "acfun.user": {
    type: "video",
    app: "acfun",
    func: "user",
    regex: /https:\/\/www.acfun.cn\/u\/(\d+)/
  },
  "acfun.user.aspx": {
    type: "video",
    app: "acfun",
    func: "user",
    regex: /https:\/\/www.acfun.cn\/u\/(\d+).aspx/
  },
  "acfun.m.user": {
    type: "video",
    app: "acfun",
    func: "user",
    regex: /https:\/\/m.acfun.cn\/upPage\/(\d+)/
  }
};
