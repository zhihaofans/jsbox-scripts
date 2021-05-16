// Check Framework
const initEasyJsBox = require("../EasyJsBox/src/kernel").init;
if (typeof initEasyJsBox !== "function") {
  // requireEasyJsBox()
  $app.close();
} else {
  // init
  initEasyJsBox();
  // run app
  const app = require("./scripts/app");
  app.run();
}
