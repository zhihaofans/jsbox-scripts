let $DB = require("./data_base"),
    $_Static = require("./static"),
    $$ = require("$$"),
    $Dialogs = require("./libs/dialogs"),
    Auth = {
        getSignUrl: async (host, param, android = false) => {
            const url = `${$_Static.URL.KAAASS.SIGN_URL}?host=${encodeURI(host)}&param=${encodeURI(param)}&android=${android}`,
                headers = {
                    "user-agent": $_Static.UA.KAAASS.KAAASS
                };
            const $_get = await $$.Http.getAwait(url, headers);
            if ($_get.error) {
                $console.error($_get.error.message);
                return undefined;
            } else {
                return $_get.data;
            }

        },
        getSignUrl_A: async (param, android = false) => {
            const url = `${$_Static.URL.KAAASS.SIGN_URL}?host=&param=${encodeURI(param)}&android=${android}`,
                headers = {
                    "user-agent": $_Static.UA.KAAASS.KAAASS
                };
            const $_get = await $$.Http.getAwait(url, headers);
            if ($_get.error) {
                $console.error($_get.error.message);
                return undefined;
            } else {
                return $_get.data;
            }

        },
        isLogin: () => {
            return Auth.accessKey() ? true : false;
        },
        accessKey: (access_key = undefined) => {
            if (access_key) {
                $DB.Cache.accessKey(access_key);
            }
            return $DB.Cache.accessKey();
        },
        uid: (uid = undefined) => {
            if (uid) {
                $DB.Cache.uid(uid);
            }
            return $DB.Cache.uid();
        },
        cookies: (cookies = undefined) => {
            if (cookies) {
                $DB.Cache.cookies(cookies);
            }
            return $DB.Cache.cookies();
        },
        refreshToken: async () => {
            $ui.loading(true);
            const access_key = Auth.accessKey();
            if (access_key) {
                const url = `${$_Static.URL.KAAASS.REFRESH_TOKEN}?access_key=${access_key}`,
                    headers = {
                        "user-agent": $_Static.UA.KAAASS.KAAASS
                    };
                const $_get = await $$.Http.getAwait(url, headers);
                $ui.loading(false);
                if ($_get.error) {
                    $console.error($_get.error.message);
                    return false;
                } else {
                    return $_get.data.status == "OK";
                }
            } else {
                $ui.loading(false);
                return false;
            }
        },
        getCookiesByAccessKey: async () => {
            $ui.loading(true);
            const access_key = Auth.accessKey();
            if (access_key) {
                const url = `${$_Static.URL.KAAASS.GET_COOKIES_BY_ACCESS_KEY}?access_key=${access_key}`,
                    headers = {
                        "user-agent": $_Static.UA.KAAASS.KAAASS
                    },
                    $_get = await $$.Http.getAwait(url, headers);
                $console.warn(url);
                $console.warn(headers);
                $console.warn($_get);
                $ui.loading(false);
                if ($_get.error) {
                    $console.error($_get.error.message);
                    return undefined;
                } else {
                    $ui.loading(false);
                    if ($_get.data.status == "OK") {
                        const userCookies = $_get.data.cookie;
                        if (userCookies) {
                            Auth.cookies(userCookies);
                            return userCookies;
                        } else {
                            $ui.error("获取饼干失败");
                        }
                    }
                }
            }
            return undefined;
        }
    },
    Info = {
        getMyInfoByKaaass: async () => {
            $ui.loading(true);
            const access_key = Auth.accessKey();
            if (access_key) {
                const url = `${$_Static.URL.KAAASS.MY_INFO}?access_key=${access_key}`,
                    headers = {
                        "user-agent": $_Static.UA.KAAASS.KAAASS
                    },
                    $_get = await $$.Http.getAwait(url, headers);
                if ($_get.error) {
                    $ui.loading(false);
                    $console.error($_get.error.message);
                    return undefined;
                } else {
                    const kaaassData = $_get.data;
                    if (kaaassData.status == "OK") {
                        const myInfoData = kaaassData.info;
                        Auth.uid(myInfoData.mid);
                        $ui.loading(false);
                        $ui.alert({
                            title: "结果",
                            message: myInfoData,
                            actions: [{
                                title: "ok",
                                disabled: false, // Optional
                                handler: function () {}
                            }]
                        });
                    } else {
                        $ui.loading(false);
                        $ui.alert({
                            title: `Error ${kaaassData.code}`,
                            message: kaaassData.message || "未知错误",
                            actions: [{
                                title: "OK",
                                disabled: false, // Optional
                                handler: function () {}
                            }]
                        });
                    }
                }
            } else {
                return undefined;
            }
        },
        getMyInfo: () => {
            const access_key = Auth.accessKey();
            if (access_key) {
                const respKaaass = Auth.getSignUrl($_Static.URL.USER.MY_INFO, `access_key=${access_key}`);
                const dataKaaass = respKaaass.data;
                $console.info(dataKaaass);
                if (dataKaaass) {
                    $http.get({
                        url: dataKaaass.url,
                        header: {
                            "User-Agent": $_Static.UA.USER.APP_IPHONE
                        },
                        handler: respBili => {
                            var resultBili = respBili.data;
                            if (resultBili.code == 0) {
                                const myInfoData = resultBili.data;
                                //saveLoginCache(_AK, myInfoData.mid);
                                $ui.loading(false);
                                $ui.success("已更新登录数据");
                                $ui.alert({
                                    title: "结果",
                                    message: myInfoData,
                                    actions: [{
                                        title: "ok",
                                        disabled: false, // Optional
                                        handler: function () {}
                                    }]
                                });
                            } else {
                                $ui.loading(false);
                                $ui.alert({
                                    title: `Error ${resultBili.code}`,
                                    message: resultBili.message || "未知错误",
                                    actions: [{
                                        title: "OK",
                                        disabled: false, // Optional
                                        handler: function () {}
                                    }]
                                });
                            }
                        }
                    });
                } else {
                    $ui.loading(false);
                    $ui.error("获取签名url失败");
                }
                return "";
            } else {
                return undefined;
            }
        },
        myInfo: () => {
            const access_key = Auth.accessKey();
            if (access_key) {
                $http.get({
                    url: `${$_Static.URL.USER.MY_INFO}?access_key=${access_key}`,
                    header: {
                        "User-Agent": $_Static.UA.USER.APP_IPHONE
                    },
                    handler: respBili => {
                        var resultBili = respBili.data;
                        $console.warn(resultBili);
                        if (resultBili.code == 0) {
                            const myInfoData = resultBili.data;
                            //saveLoginCache(_AK, myInfoData.mid);
                            $ui.loading(false);
                            $ui.success("已更新登录数据");
                            $ui.alert({
                                title: "结果",
                                message: myInfoData,
                                actions: [{
                                    title: "ok",
                                    disabled: false, // Optional
                                    handler: function () {}
                                }]
                            });
                        } else {
                            $ui.loading(false);
                            $ui.alert({
                                title: `Error ${resultBili.code}`,
                                message: resultBili.message || "未知错误",
                                actions: [{
                                    title: "OK",
                                    disabled: false, // Optional
                                    handler: function () {}
                                }]
                            });
                        }
                    }
                });
            } else {
                $ui.loading(false);
                $ui.error("未登录");
            }
        }
    },
    View = {
        updateAccessKey: async () => {
            const access_key = await $Dialogs.Dialogs.showInputAlert("输入Access key");
            $console.warn(access_key);
            if (access_key) {
                const new_access_key = Auth.accessKey(access_key);
                if (new_access_key == access_key) {
                    $ui.success("设置成功");
                } else {
                    $Dialogs.Dialogs.showPlainAlert("设置失败", "未知错误");
                }
            } else {
                $Dialogs.Dialogs.showPlainAlert("空白内容", "请输入Access key");
            }
            /* 
            $input.text({
                type: $kbType.text,
                placeholder: "输入Access key",
                text: Auth.accessKey() || "",
                handler: function (access_key) {
                    if (access_key) {
                        const new_access_key = Auth.accessKey(access_key);
                        if (new_access_key == access_key) {
                            $ui.success("设置成功");
                        } else {
                            $ui.alert({
                                title: "设置失败",
                                message: "",
                                actions: [{
                                    title: "OK",
                                    disabled: false,
                                    handler: function () {}
                                }]
                            });
                        }
                    }
                }
            }); */
        },
        getMyInfo: async () => {
            if (await Info.getMyInfoByKaaass()) {

            } else {
                $Dialogs.Dialogs.showPlainAlert("获取个人信息失败", "!");
            }
        },
        refreshToken: async () => {
            if (await Auth.refreshToken()) {
                $Dialogs.Dialogs.showPlainAlert("刷新成功", "~");
            } else {
                $Dialogs.Dialogs.showPlainAlert("刷新失败", "!");
            }
        },
        getCookiesByAccessKey: async () => {
            await Auth.getCookiesByAccessKey();
        }
    };
module.exports = {
    Auth,
    Info,
    View
};