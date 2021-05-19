const CORE_VERSION = 1;
class Core {
  constructor(name) {
    this.SITE_NAME = "";
    this.SITE_VERSION = "";
    this.SITE_AUTHOR = "";
    this.NEED_CORE_VERSION = 0;
  }
  checkCoreVersion() {
    if (CORE_VERSION == this.NEED_CORE_VERSION) {
      return 0;
    }
    if (CORE_VERSION > this.NEED_CORE_VERSION) {
      return -1;
    }

    if (CORE_VERSION < this.NEED_CORE_VERSION) {
      return 1;
    }
  }
  async httpRequest({ method, url, header, body }) {
    return await $http.request({
      method: method,
      url: url,
      header: header,
      body: body
    });
  }
  parseData(_data) {}
}
module.exports = Core;
