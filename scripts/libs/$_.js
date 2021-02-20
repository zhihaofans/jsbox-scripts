class ModV4 {
    constructor(indexJsPath) {
        this._indexJsPath = indexJsPath;
    }
    get indexJs() {
        const _f = require("$$").File;
        return this._indexJsPath
            ? _f.isFile(this.vindexJsPath)
                ? require(this._indexJsPath) || undefined
                : undefined
            : undefined;
    }
    showModList(_title, modDir, listData) {
        $console.error(modDir);
        $console.error(listData);
        $ui.push({
            props: {
                title: _title
            },
            views: [
                {
                    type: "list",
                    props: {
                        data: listData.map(_mod => _mod.modTitle)
                    },
                    layout: $layout.fill,
                    events: {
                        didSelect: function (_sender, indexPath, _data) {
                            const row = indexPath.row,
                                thisMod = listData[row];
                            require(modDir + thisMod.modId)[
                                thisMod.modAction
                            ]();
                        }
                    }
                }
            ]
        });
    }
}
const url = {
    split: _inputUrl => {
        if (url.isUrl(_inputUrl)) {
            //        const schemeSymbol;
            return {};
        } else {
            return undefined;
        }
    },
    isUrl: _inputUrl => {
        const _LEFT = _inputUrl.indexOf("://"),
            _DOT = _inputUrl.indexOf(".", _LEFT);
        return _LEFT >= 0 && _DOT >= 0;
    }
};
module.exports = {
    ModV4
};