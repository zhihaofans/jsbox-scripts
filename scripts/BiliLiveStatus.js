let env = $app.env;
let appModeView = () => {};

let init = () => {
    switch (env) {
        case $env.app:
            appModeView();
            break;
        default:
            $console.error("不支持该启动模式");
            $app.close();
    }
};
init();