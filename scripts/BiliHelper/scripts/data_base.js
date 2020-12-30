let Cache = {
    ACCESS_KEY: "USER_AUTH_ACCESS_KEY",
    UID: "USER_AUTH_UID",
    COOKIES: "USER_AUTH_COOKIES",
    accessKey: (access_key = undefined) => {
        if (access_key) {
            $cache.set(Cache.ACCESS_KEY, access_key);
        }
        return $cache.get(Cache.ACCESS_KEY);
    },
    uid: (uid = undefined) => {
        if (uid) {
            $cache.set(Cache.UID, uid);
        }
        return $cache.get(Cache.UID);
    },
    cookies: (cookies = undefined) => {
        if (cookies) {
            $cache.set(Cache.COOKIES, cookies);
        }
        return $cache.get(Cache.COOKIES);
    }
};
module.exports = {
    Cache
};