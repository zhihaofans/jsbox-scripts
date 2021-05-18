const CORE_VERSION = 1;
class Core {
  constructor(name) {
    this.SITE_NAME = "";
    this.SITE_VERSION = "";
    this.NEED_CORE_VERSION = 1;
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
}
module.exports = Core;
