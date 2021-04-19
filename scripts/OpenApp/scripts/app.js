const qimai = {
  appInfo: app_id => {
    $app.openURL(`https://www.qimai.cn/app/baseinfo/appid/${app_id}`);
  }
};
module.exports = {
  qimai
};
