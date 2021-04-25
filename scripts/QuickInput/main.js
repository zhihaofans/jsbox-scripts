switch ($app.env) {
  case $env.keyboard:
    try {
      require("scripts/keyboard").init();
    } catch (_error) {
      $ui.alert({
        title: "error",
        message: _error.message,
        actions: [
          {
            title: "OK",
            disabled: false, // Optional
            handler: function () {
              $app.close();
            }
          }
        ]
      });
    }
    break;
  default:
    $ui.render("views/main");
}
