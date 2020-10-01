let initKeyboard = () => {
    $ui.alert({
        title: "请等待更新",
        message: "键盘功能未完成",
        actions: [
            {
                title: "OK",
                disabled: false, // Optional
                handler: function() {
                    $keyboard.dismiss();
                }
            }
        ]
    });
};
module.exports = {
    initKeyboard
};