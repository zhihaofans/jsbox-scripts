const __VERSION__ = 1,
    appScheme = require("AppScheme"),
    checkVersion = (_ver = __VERSION__) => {
        const libVer = appScheme.__VERSION__;
        switch (true) {
            case _ver == libVer:
                return 0;
            case _ver < libVer:
                return 1;
            case _ver > libVer:
                return -1;
            default:
                return undefined;
        }
    };
module.exports = {
    checkVersion,
    appScheme
};