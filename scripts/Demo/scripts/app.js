const { Kernel, VERSION } = require("../EasyJsBox/src/kernel"),
  // Storage = require("./storage"),
  run = () => {
    if ($app.env === $env.app) {
      const kernel = new AppKernel();
      const Factory = require("./ui/factory");
      new Factory(kernel).render();
    } else {
      $ui.render({
        views: [
          {
            type: "label",
            props: {
              text: "不支持在此环境中运行",
              align: $align.center
            },
            layout: (make, view) => {
              make.center.equalTo(view.super);
              make.size.equalTo(view.super);
            }
          }
        ]
      });
    }
  };
class AppKernel extends Kernel {
  constructor() {
    super();
    this.query = $context.query;
    // 注册组件
    this.settingComponent = this.registerComponent("Setting");
    this.setting = this.settingComponent.controller;
  }
  print(message) {
    $console.info(message);
  }
}
module.exports = {
  run
};
