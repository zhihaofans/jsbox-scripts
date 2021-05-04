const loader = require("./scripts/loader");
$ui.alert({
  title: "",
  message: "",
  actions: [
    {
      title: "init",
      disabled: false, // Optional
      handler: function () {
        loader.init();
      }
    }
  ]
});
