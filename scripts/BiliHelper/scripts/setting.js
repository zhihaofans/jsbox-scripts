let pref_cache_list = {
        "user.auth.access_key": "USER_AUTH_ACCESS_KEY",
        "user.auth.uid": "USER_AUTH_UID",
        "user.auth.cookies": "USER_AUTH_COOKIES"
    },
    initPrefs = () => {
        initPrefByList(pref_cache_list);
    },
    showSettingPage = () => {
        initPrefs();
        $prefs.open(() => {
            updatePrefs();
        });
    },
    initPrefByList = (_list) => {
        Object.keys(_list).map(_k => {
            $prefs.set(_k, $cache.get(_list[_k]) || "");
        });
    },
    updatePrefs = () => {
        updatePrefByList(pref_cache_list);
    },
    updatePrefByList = (_list) => {
        Object.keys(_list).map(_k => {
            $cache.set(_list[_k], $prefs.get(_k) || "");
        });
    }
module.exports = {
    showSettingPage,
};