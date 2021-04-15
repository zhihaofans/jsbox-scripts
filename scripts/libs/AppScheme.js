// PPHub
let pphubOpenUser = user => {
  $app.openURL(`pphub://user?login=${user}`);
};
let pphubOpenRepository = (user, repository) => {
  $app.openURL(`pphub://repo?owner=${user}&repo=${repository}`);
};
// Woring Copy
let workingcopyClone = url => {
  $app.openURL(`working-copy://clone?remote=${url}`);
};
// Microsoft Edge
let microsoftEdgeWeb = url => {
  $app.openURL(`microsoft-edge-${url}`);
};
// Jsbox
let jsboxInstall = (url, name = undefined, icon = undefined) => {
  let installUrl = `jsbox://import?url=${encodeURI(url)}`;
  if (name) {
    installUrl += `&name=${encodeURI(name)}`;
  }
  if (icon) {
    installUrl += `&icon=${encodeURI(icon)}`;
  }
  $app.openURL(installUrl);
};
let jsboxRun = (name, location = "local") => {
  $app.openURL(`jsbox://run?name=${encodeURI(name)}&location=${location}`);
};

// thor
let thorLaunch = filterName => {
  let appUrl = "thor://sniffer.gui/launch";
  if (filterName) {
    appUrl += `filter_name=${encodeURI(filterName)}`;
  }
  $app.openURL(appUrl);
};
const __VERSION__ = 1,
  Browser = {
    Alook: {
      open: url => {
        $app.openURL(`Alook://${$text.URLEncode(url)}`);
      },
      download: url => {
        $app.openURL(`Alook://download/${$text.URLEncode(url)}`);
      }
    },
    Chrome: url => {
      $app.openBrowser({
        type: 10000,
        url: url
      });
    },
    QQBrowser: url => {
      $app.openBrowser({
        type: 10003,
        url: url
      });
    },
    Firefox: url => {
      $app.openBrowser({
        type: 10002,
        url: url
      });
    },
    Safari: {
      Preview: url => {
        $safari.open({
          url: url
        });
      },
      ReadMode: (url, handler) => {
        $safari.open({
          url: url,
          entersReader: true,
          handler: handler
        });
      },
      AddReadingItem: (url, title, previewText) => {
        $safari.addReadingItem({
          url: url,
          title: title,
          preview: previewText
        });
      },
      Open: (url, entersReader = false, height = 360, handler) => {
        $safari.open({
          url: url,
          entersReader: entersReader,
          height: height,
          handler: handler
        });
      }
    }
  },
  Video = {
    AVPlayer: url => {
      $app.openURL(`AVPlayer://${$text.URLEncode(url)}`);
    },
    NPlayer: url => {
      $app.openURL(`nplayer-${url}`);
    },
    VlcPlayer: url => {
      $app.openURL(`vlc-x-callback://x-callback-url/ACTION?url=${url}`);
    },
    Bilibili: {
      app: (mode, id) => {
        $app.openURL(`bilibili://${mode}/${id}`);
      },
      video: vid => {
        Video.Bilibili.app("video", vid);
      },
      getVideoUrl: vid => {
        return `bilibili://video/${vid}`;
      },
      live: roomid => {
        Video.Bilibili.app("live", roomid);
      },
      space: uid => {
        Video.Bilibili.app("space", uid);
      },
      article: id => {
        Video.Bilibili.app("article", id);
      },
      dynamic: id => {
        Video.Bilibili.app("following/detail", id);
      }
    },
    Acfun: {
      video: vid => {
        $app.openURL(Video.Acfun.getVideoUrl(vid));
      },
      getVideoUrl: vid => {
        return `acfun://detail/video/${vid}`;
      },
      getVideoWebUrl: vid => {
        return `https://www.acfun.cn/v/ac${vid}`;
      }
    }
  },
  Social = {
    adaoThread: t => {
      $app.openURL(`adnmb://t/${t}`);
    },
    V2er: {
      topic: _t => {
        $app.openURL(`v2er://topic?id=${_t}`);
      },
      node: _node => {
        $app.openURL(`v2er://node?title=${_node}`);
      },
      member: _uid => {
        $app.openURL(`v2er://member?username=${_uid}`);
      },
      search: _key => {
        $app.openURL(`v2er://search?query=${_key}`);
      }
    },
    Telegram: {
      me: _id => {
        $app.openURL(`tg://resolve?domain=${_id}`);
      }
    },
    Twitter: {
      status: _id => {
        $app.openURL(`twitter://status?id=${_id}`);
      }
    }
  },
  File = {
    Documents: {
      open: url => {
        $app.openURL(`r${url}`);
      }
    }
  };
module.exports = {
  pphubOpenUser,
  pphubOpenRepository,
  workingcopyClone,
  microsoftEdgeWeb,
  jsboxInstall,
  jsboxRun,
  thorLaunch,
  __VERSION__,
  Browser,
  Video,
  Social,
  File
};
