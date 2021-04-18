module.exports = {
  "bilibili.video": {
    type: "video",
    app: "bilibili",
    func: "video",
    regex: [
      /https:\/\/www.bilibili.com\/video\/(.+)/,
      /https:\/\/m.bilibili.com\/video\/(.+)/
    ],
    regexIndex: "$1"
  }
};
