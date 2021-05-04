class Result {
  constructor(success, code = -1, data = undefined, error_message = undefined) {
    this.success = success;
    this.data = data;
    this.code = code;
    this.error = success ? undefined : error_message;
    this.RESULT_VERSION = 1;
  }
}

class SiteLib {
  constructor(database, $$, http) {
    this.DATABASE_ID = database;
    this.$$ = $$;
    this.HTTP = http;
  }
}
class Site {
  constructor(obj, file, id, name, version) {
    this.OBJ = obj;
    this.file = file;
    this.ID = id;
    this.NAME = name;
    this.VERSION = version;
  }
}
module.exports = { Result, SiteLib, Site };
