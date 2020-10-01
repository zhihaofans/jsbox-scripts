let kb = require("/scripts/keyboard");
let appEnv = $app.env;

switch (appEnv) {
    case $env.keyboard:
        kb.initKeyboard();
        break;

    default:
        $ui.render("main");
}