switch ($app.env) {
  case $env.keyboard:
    $ui.render("views/keyboard");
    break;
  default:
    $ui.render("views/main");
}
