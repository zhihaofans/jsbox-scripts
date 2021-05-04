const ClassExample = require("../class-example");
class SiteInfo {
  constructor() {
    this.NAME = "DEMO";
    this.VERSION = "210504.1";
    this.ID = "zhihaofans.demo";
    this.LIB = {};
  }
  init(_lib) {
    this.LIB = {
      DATABASE_ID: _lib.DATABASE_ID,
      $$: _lib.$$,
      Http: { get: _lib.HTTP.getAwait, post: _lib.HTTP.postAwait }
    };
  }
  sync() {
    return new ClassExample.Result(false, -1, undefined, "未初始化");
  }
}

module.exports = {
  SiteInfo
};
