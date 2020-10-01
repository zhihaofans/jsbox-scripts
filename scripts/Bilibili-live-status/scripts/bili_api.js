let $$ = require("./libs.js");
let loadApiJson = () => {
    const filePath = "/assets/api.json";
    try {
        const jsonData = $file.read(filePath);
        $console.info(jsonData);
        if (jsonData) {
            return {
                success: false,
                data: JSON.parse(jsonData),
                rawData: jsonData
            };
        }
    } catch (_error) {
        $console.error(_error);
        return {
            success: false,
            error_message: _error.message
        };
    }
};

let getLiveStatus = async uid => {
    const apiJson = loadApiJson();
    if (apiJson.success) {
        const apiUrl = apiJson.data.live.info.room_play_info.url || undefined;
        if (apiUrl) {
            const $get = await $$.httpGetAwait(apiUrl + uid);
        } else {
            return {
                success: false,
                error_message: "获取API地址失败",
                result: undefined
            };
        }
    }
};