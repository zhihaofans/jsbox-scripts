let Http = {
        getAwait: async (url, header) => {
            const result = await $http.get({
                url: url,
                timeout: 5,
                header: header
            });
            return url ? result : undefined;
        },
        postAwait: async (url, postBody, header = undefined) => {
            const result = await $http.post({
                url: url,
                header: header,
                timeout: 5,
                body: postBody
            });
            return url ? result : undefined;
        }
    },
    ModV1 = {
        getModList: modDir => {
            var modList = [];
            const fileList = $file.list(modDir);
            fileList.map(f => {
                if (!$file.isDirectory(f)) {
                    if (f.endsWith(".js")) {
                        modList.push(f);
                    }
                }
            });
            return modList;
        },
        showModList: modDir => {
            const modJsonObj = {},
                pinModList = [],
                otherModList = [],
                modList = ModV1.getModList(modDir),
                modJson = ModV1.loadModJson(`${modDir}/mod.json`);
            if (modJson) {
                modJson.map(mod => (modJsonObj[mod.file] = mod));
            }
            $console.info(modJsonObj);
            if (modList) {
                if (modList.length > 0) {
                    modList.map(mod => {
                        modJsonObj[mod]
                            ? pinModList.push(mod)
                            : otherModList.push(mod);
                    });
                    $ui.push({
                        props: {
                            title: "Mod列表"
                        },
                        views: [
                            {
                                type: "list",
                                props: {
                                    data: [
                                        {
                                            title: "常用Mod",
                                            rows: pinModList.map(
                                                mod => modJsonObj[mod].name
                                            )
                                        },
                                        {
                                            title: "其他Mod",
                                            rows: otherModList
                                        }
                                    ]
                                },
                                layout: $layout.fill,
                                events: {
                                    didSelect: function (
                                        _sender,
                                        indexPath,
                                        _data
                                    ) {
                                        $console.info(_data);
                                        ModV1.initMod(
                                            modDir +
                                                (indexPath.section == 0
                                                    ? pinModList[indexPath.row]
                                                    : otherModList[
                                                          indexPath.row
                                                      ])
                                        );
                                    }
                                }
                            }
                        ]
                    });
                } else {
                    $ui.alert({
                        title: "Mod列表",
                        message: "空白",
                        actions: [
                            {
                                title: "OK",
                                disabled: false, // Optional
                                handler: function () {}
                            }
                        ]
                    });
                }
            } else {
                $ui.error("返回错误列表");
            }
        },
        initMod: fileName => {
            if ($file.exists(fileName)) {
                if ($file.isDirectory(fileName)) {
                    $ui.error("这是目录");
                } else {
                    const modData = require(fileName);
                    if (modData) {
                        try {
                            modData.init();
                            $console.info(`Mod加载完毕:${fileName}`);
                        } catch (error) {
                            $ui.alert({
                                title: `${fileName}加载失败`,
                                message: error.message,
                                actions: [
                                    {
                                        title: "OK",
                                        disabled: false, // Optional
                                        handler: function () {}
                                    }
                                ]
                            });
                        }
                    } else {
                        $ui.error("请确认是否为mod文件");
                    }
                }
            } else {
                $ui.error("不存在该文件");
            }
        },
        loadModJson: jsonPath => {
            const modJson = $file.read(jsonPath).string;
            if (modJson) {
                try {
                    return JSON.parse(modJson);
                } catch (error) {
                    $console.error("loadModJson:failed");
                    $console.error(error);
                    return undefined;
                }
            } else {
                return undefined;
            }
        }
    },
    ModV2 = {
        getModList: modDir => {
            // 以一个文件夹为一个mod整体的版本(且文件夹里有同名的js文件作为入口文件)，文件将被排除。
            if ($file.exists(modDir) && $file.isDirectory(modDir)) {
                return $file.list(modDir);
            } else {
                return undefined;
            }
        },
        isDirHasIndexJs: (modDir, mod_id) => {
            return File.isFile(`${modDir}${mod_id}/${mod_id}.js`);
        },
        loadMod: (modDir, mod_id) => {
            if (ModV2.isDirHasIndexJs(modDir, mod_id)) {
                return require(`${modDir}${mod_id}/${mod_id}.js`);
            } else {
                return undefined;
            }
        }
    },
    ModV3 = {},
    Str = {
        copy: str => {
            $clipboard.copy({
                text: str,
                ttl: 30,
                locally: true
            });
        },
        paste: () => {
            return $clipboard.text;
        },
        code: str => {
            return $qrcode.encode(str);
        },
        fromQrcode: qrcode => {
            return $qrcode.decode(qrcode);
        },
        toJson: str => {
            return JSON.parse(str);
        },
        fromJson: json => {
            return JSON.stringify(json);
        },
        checkIfUrl: str => {
            if (str.length > 0) {
                const linkList = $detector.link(str);
                return linkList.length == 1 && linkList[0] == str;
            }
            return false;
        }
    },
    Image = {
        Mult: {
            ShowNetworkImage: urlList => {
                $ui.push({
                    props: {
                        title: ""
                    },
                    views: [
                        {
                            type: "gallery",
                            props: {
                                items: urlList.map(u => ({
                                    type: "image",
                                    props: {
                                        src: u
                                    }
                                })),
                                interval: 3,
                                radius: 5.0
                            },
                            layout: function (make, view) {
                                make.left.right.inset(10);
                                make.centerY.equalTo(view.super);
                                make.height.equalTo(320);
                            }
                        }
                    ]
                });
            }
        }
    },
    File = {
        isFile: path => {
            if (path && $file.exists(path)) {
                if ($file.isDirectory(path)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    };
module.exports = {
    Http,
    ModV1,
    ModV2,
    Str,
    Image,
    File
};