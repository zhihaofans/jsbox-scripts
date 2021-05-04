const __VERSION__ = 3,
  Http = {
    getAwait: async (url, header) => {
      const result = await $http.get({
        url: url,
        timeout: 5,
        header: header
      });
      return url ? result : undefined;
    },
    postAwait: async (url, postBody, header = undefined) => {
      const result = await $http.post({
        url: url,
        header: header,
        timeout: 5,
        body: postBody
      });
      return url ? result : undefined;
    },
    get: async (url, header) => {
      return Http.getAwait(url, header);
    },
    post: async (url, postBody, header = undefined) => {
      return Http.postAwait(url, postBody, header);
    }
  },
  ModV1 = {
    getModList: modDir => {
      let modList = [];
      const fileList = $file.list(modDir);
      fileList.map(f => {
        if (!$file.isDirectory(f)) {
          if (f.endsWith(".js")) {
            modList.push(f);
          }
        }
      });
      return modList;
    },
    showModList: modDir => {
      const modJsonObj = {},
        pinModList = [],
        otherModList = [],
        modList = ModV1.getModList(modDir),
        modJson = ModV1.loadModJson(`${modDir}/mod.json`);
      if (modJson) {
        modJson.map(mod => (modJsonObj[mod.file] = mod));
      }
      $console.info(modJsonObj);
      if (modList) {
        if (modList.length > 0) {
          modList.map(mod => {
            modJsonObj[mod] ? pinModList.push(mod) : otherModList.push(mod);
          });
          $ui.push({
            props: {
              title: "Mod列表"
            },
            views: [
              {
                type: "list",
                props: {
                  data: [
                    {
                      title: "常用Mod",
                      rows: pinModList.map(mod => modJsonObj[mod].name)
                    },
                    {
                      title: "其他Mod",
                      rows: otherModList
                    }
                  ]
                },
                layout: $layout.fill,
                events: {
                  didSelect: function (_sender, indexPath, _data) {
                    $console.info(_data);
                    ModV1.initMod(
                      modDir +
                        (indexPath.section == 0
                          ? pinModList[indexPath.row]
                          : otherModList[indexPath.row])
                    );
                  }
                }
              }
            ]
          });
        } else {
          $ui.alert({
            title: "Mod列表",
            message: "空白",
            actions: [
              {
                title: "OK",
                disabled: false, // Optional
                handler: function () {}
              }
            ]
          });
        }
      } else {
        $ui.error("返回错误列表");
      }
    },
    initMod: fileName => {
      if ($file.exists(fileName)) {
        if ($file.isDirectory(fileName)) {
          $ui.error("这是目录");
        } else {
          const modData = require(fileName);
          if (modData) {
            try {
              modData.init();
              $console.info(`Mod加载完毕:${fileName}`);
            } catch (error) {
              $ui.alert({
                title: `${fileName}加载失败`,
                message: error.message,
                actions: [
                  {
                    title: "OK",
                    disabled: false, // Optional
                    handler: function () {}
                  }
                ]
              });
            }
          } else {
            $ui.error("请确认是否为mod文件");
          }
        }
      } else {
        $ui.error("不存在该文件");
      }
    },
    loadModJson: jsonPath => {
      const modJson = $file.read(jsonPath).string;
      if (modJson) {
        try {
          return JSON.parse(modJson);
        } catch (error) {
          $console.error("loadModJson:failed");
          $console.error(error);
          return undefined;
        }
      } else {
        return undefined;
      }
    }
  },
  ModV2 = {
    getModList: modDir => {
      // 以一个文件夹为一个mod整体的版本(且文件夹里有同名的js文件作为入口文件)，文件将被排除。
      if ($file.exists(modDir) && $file.isDirectory(modDir)) {
        return $file.list(modDir);
      } else {
        return undefined;
      }
    },
    isDirHasIndexJs: (modDir, mod_id) => {
      return File.isFile(`${modDir}${mod_id}/${mod_id}.js`);
    },
    loadMod: (modDir, mod_id) => {
      if (ModV2.isDirHasIndexJs(modDir, mod_id)) {
        return require(`${modDir}${mod_id}/${mod_id}.js`);
      } else {
        return undefined;
      }
    }
  },
  ModV3 = {
    loadIndexJs: filePath => {
      const indexJsDemo = {
        title: "ModV3",
        modDir: "./mods/",
        mods: [
          {
            modId: "demo",
            modAction: "init",
            modTitle: "ModV3的Demo"
          }
        ]
      };
      return filePath ? require(filePath) : indexJsDemo;
    },
    loadMod: (modDir, modInfo) => {
      require(modDir + modInfo.modId)[modInfo.modAction]();
    },
    showModList: indexJs => {
      const modDir = indexJs.modDir,
        mods = indexJs.mods,
        modListTitle = indexJs.title,
        listEvent = (_sender, indexPath, _data) => {
          const thisMod = mods[indexPath.row];
          this.loadMod(modDir, thisMod);
        };
      View.pushListView(
        modListTitle,
        mods.map(m => m.modTitle),
        listEvent
      );
    }
  },
  Str = {
    copy: str => {
      $clipboard.copy({
        text: str,
        ttl: 30,
        locally: true
      });
    },
    paste: () => {
      return $clipboard.text || "";
    },
    toQrcode: str => {
      return $qrcode.encode(str);
    },
    fromQrcode: qrcode => {
      return $qrcode.decode(qrcode);
    },
    toJson: str => {
      return JSON.parse(str);
    },
    fromJson: json => {
      return JSON.stringify(json);
    },
    checkIfUrl: str => {
      if (str.length > 0) {
        const linkList = $detector.link(str);
        return linkList.length == 1 && linkList[0] == str;
      }
      return false;
    },
    getListFromL10n: sourceList => {
      return sourceList.map(x => $l10n(x));
    }
  },
  Image = {
    Mult: {
      ShowNetworkImage: urlList => {
        $ui.push({
          props: {
            title: ""
          },
          views: [
            {
              type: "gallery",
              props: {
                items: urlList.map(u => ({
                  type: "image",
                  props: {
                    src: u
                  }
                })),
                interval: 3,
                radius: 5.0
              },
              layout: function (make, view) {
                make.left.right.inset(10);
                make.centerY.equalTo(view.super);
                make.height.equalTo(320);
              }
            }
          ]
        });
      }
    },
    single: {
      showImageMenu: imageUrl => {
        if (imageUrl) {
          const links = $detector.link(imageUrl);
          let imageLink = imageUrl;
          if (links.length > 1) {
            imageLink = imageUrl[0];
          }
          $ui.menu({
            items: ["用Safari打开", "分享", "快速预览", "网页预览"],
            handler: function (title, idx) {
              switch (idx) {
                case 0:
                  $app.openURL(imageLink);
                  break;
                case 1:
                  $share.sheet([imageLink]);
                  break;
                case 2:
                  $quicklook.open({
                    url: imageLink,
                    handler: function () {
                      $console.info(imageLink);
                    }
                  });
                  break;
                case 3:
                  $ui.preview({
                    title: title,
                    url: imageLink
                  });
                  break;
                default:
                  return;
              }
            }
          });
        } else {
          return;
        }
      }
    }
  },
  File = {
    isFile: path => {
      if (path && $file.exists(path)) {
        if ($file.isDirectory(path)) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    getFileList: (dir, ext = undefined) => {
      if ($file.exists(dir) && $file.isDirectory(dir)) {
        let files = [];
        const fileList = $file.list(dir);
        fileList.map(f => {
          if (!$file.isDirectory(f)) {
            if (ext) {
              if (f.endsWith(`.${ext}`)) {
                files.push(f);
              }
            } else {
              files.push(f);
            }
          }
        });
        return files;
      } else {
        $console.error(`不存在该目录或不是目录:${dir}`);
        return undefined;
      }
    }
  },
  View = {
    pushListView: (title, listData, didSelect) => {
      $ui.push({
        props: {
          title: title
        },
        views: [
          {
            type: "list",
            props: {
              data: listData
            },
            layout: $layout.fill,
            events: {
              didSelect: didSelect
            }
          }
        ]
      });
    }
  },
  Url = {
    isUrl: str => {
      if (str) {
        return /(.+):\/\/(.+).(.+)\/(.+)/.test(str);
      } else {
        return false;
      }
    },
    getUrlByRegex: inputUrl => {
      let _inputUrl = inputUrl,
        fragmentIndex = _inputUrl.indexOf("#"),
        fragment = undefined,
        queryIndex = _inputUrl.indexOf("?"),
        queryStr = undefined,
        queryObj = {};
      if (fragmentIndex >= 0) {
        fragment = _inputUrl.substring(fragmentIndex + 1, _inputUrl.length);
        _inputUrl = _inputUrl.substring(0, fragmentIndex);
      }
      if (queryIndex >= 0) {
        queryStr = _inputUrl.substring(queryIndex + 1, _inputUrl.length);
        _inputUrl = _inputUrl.substring(0, queryIndex);
        queryStr.split("&").map(i => {
          if (i.indexOf("=")) {
            const _queryItem = i.split("=");
            if (_queryItem.length == 2) {
              queryObj[_queryItem[0]] = _queryItem[1];
            }
          }
        });
      } else {
        queryObj = undefined;
      }
      const regex = /(.+):\/\/(.+?)\/(.+)/,
        matches = regex.exec(_inputUrl);
      if (matches) {
        const scheme = matches[1],
          host = matches[2],
          path = matches[3],
          urlResult = {
            scheme: scheme,
            host: host,
            path: path.startsWith("/") ? path : `/${path}`,
            fragment: fragment,
            query: queryObj,
            queryStr: queryStr
          };
        return urlResult;
      } else {
        return matches || undefined;
      }
    }
  },
  Time = {
    getNowUnixTime: () => {
      return new Date().getTime();
    },
    getNowUnixTimeSecond: () => {
      return Math.round(new Date().getTime() / 1000);
    },
    iso8601ToLocaltime: ISO8601 => {
      const moment = require("moment");
      let timezone = '"Asia/Shanghai';
      moment(ISO8601).tz(timezone).format("YYYY-MM-DD hh:mm:ss");
    }
  },
  Push = {
    default: (title = "标题", body = "内容", mute = true) => {
      $push.schedule({
        title: title,
        body: body,
        mute: mute
      });
    }
  },
  Console = {
    auto: (success = true, message) => {
      success ? $console.info(message) : $console.error(message);
    }
  },
  Share = {
    isAction: () => {
      return $app.env == $env.action;
    },
    isSafari: () => {
      return $app.env == $env.safari;
    },
    isActionOrSafari: () => {
      return Share.isAction() || Share.isSafari();
    },
    getImage: () => {
      if (Share.isAction()) {
        return $context.image || undefined;
      }
      return undefined;
    },
    getText: () => {
      if (Share.isAction()) {
        return $context.text || undefined;
      }
      if (Share.isSafari()) {
        return $context.safari.title || undefined;
      }
      return undefined;
    },
    getLink: () => {
      if (Share.isAction()) {
        return $context.link || undefined;
      }
      if (Share.isSafari()) {
        return $context.safari
          ? $context.safari.items.location.href
          : undefined;
      }
      return undefined;
    },
    getLinks: () => {
      if (Share.isAction()) {
        return $context.linkItems || undefined;
      }
      if (Share.isSafari()) {
        return $context.safari
          ? [$context.safari.items.location.href]
          : undefined;
      }
      return undefined;
    }
  };
module.exports = {
  __VERSION__: __VERSION__,
  Http: Http,
  ModV1: ModV1,
  ModV2: ModV2,
  ModV3: ModV3,
  Str: Str,
  Image: Image,
  File: File,
  View: View,
  Url: Url,
  Time: Time,
  Push: Push,
  Console: Console,
  Share: Share
};
