const ClassExample = require("./class-example"),
  $$ = require("$$");
class SiteLoader {
  constructor(site_dir = "/scripts/site/") {
    this.SITE_DIR = site_dir;
    this.SITE_FILE_LIST = $file.list(this.SITE_DIR) || [];
    this.SITE_LIST = [];
  }
  loadSite(file_name) {
    try {
      return new ClassExample.Result(true, 0, require(file_name), undefined);
    } catch (_ERROR) {
      $console.error(_ERROR);
      return new ClassExample.Result(false, -1, _ERROR, _ERROR.message);
    }
  }
  init() {
    try {
      this.SITE_LIST = [];
      if (this.SITE_FILE_LIST.length > 0) {
        this.SITE_FILE_LIST.map(file_name => {
          const file_path = this.SITE_DIR + file_name;
          if ($$.File.isFile(file_path)) {
            const siteResult = this.loadSite(file_path);
            if (siteResult.success) {
              const site_lib = { $$: $$, HTTP: $$.Http },
                site = siteResult.data,
                siteInfo = new site.SiteInfo();
              if (site && siteInfo) {
                if (siteInfo.ID && siteInfo.NAME && siteInfo.VERSION) {
                  this.SITE_LIST.push(
                    new ClassExample.Site(
                      site,
                      file_name,
                      siteInfo.ID,
                      siteInfo.NAME,
                      siteInfo.VERSION
                    )
                  );
                } else {
                  $console.error(`SITE_FILE_LIST.map:${siteInfo}(undefined-2)`);
                  $console.error(siteResult.data);
                }
              } else {
                $console.error(`SITE_FILE_LIST.map:${file_name}(undefined-1)`);
              }
            }
          } else {
            $console.error(`SITE_FILE_LIST.map:${file_name}(is not file)`);
          }
        });
      } else {
        return new ClassExample.Result(
          false,
          -1,
          undefined,
          `SITE_FILE_LIST:${this.SITE_FILE_LIST.length}`
        );
      }
    } catch (_ERROR) {
      $console.error(`loader.init:${_ERROR.message}`);
    }
  }
  initListView() {
    const showList = [];
    this.SITE_LIST.map(_site => {
      $console.info(_site);
      showList.push(_site.NAME);
    });
    $console.info(showList);
    $ui.push({
      props: {
        title: "test"
      },
      views: [
        {
          type: "list",
          props: {
            data: showList
          },
          layout: $layout.fill,
          events: {
            didSelect: function (_sender, indexPath, _data) {
              const section = indexPath.section;
              const row = indexPath.row;
            }
          }
        }
      ]
    });
  }
}
const init = () => {
  const Loader = new SiteLoader();
  Loader.init();
  $console.info(Loader.SITE_FILE_LIST);
  $console.info(Loader.SITE_LIST);
  Loader.initListView();
};
module.exports = { init };
