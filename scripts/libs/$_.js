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
const Url = {
    regex: inputUrl => {
        let _inputUrl = inputUrl,
            fragmentIndex = _inputUrl.indexOf("#"),
            fragment = undefined,
            queryIndex = _inputUrl.indexOf("?"),
            queryStr = undefined,
            queryObj = {};
        if (fragmentIndex >= 0) {
            fragment = _inputUrl.substring(fragmentIndex + 1, _inputUrl.length);
            _inputUrl = _inputUrl.substring(0, fragmentIndex);
        }
        if (queryIndex >= 0) {
            queryStr = _inputUrl.substring(queryIndex + 1, _inputUrl.length);
            _inputUrl = _inputUrl.substring(0, queryIndex);
            queryStr.split("&").map(i => {
                if (i.indexOf("=")) {
                    const _queryItem = i.split("=");
                    if (_queryItem.length == 2) {
                        queryObj[_queryItem[0]] = _queryItem[1];
                    }
                }
            });
        }
        const regex = /(.+):\/\/(.+?)\/(.+)/,
            matches = regex.exec(_inputUrl);
        if (matches) {
            const scheme = matches[1],
                host = matches[2],
                path = matches[3],
                urlResult = {
                    scheme: scheme,
                    host: host,
                    path: path,
                    fragment: fragment,
                    query: queryObj,
                    queryStr: queryStr
                };
            return urlResult;
        } else {
            
            return matches || undefined;
        }
    },
    split: _inputUrl => {
        if (Url.isUrl(_inputUrl)) {
            //        const schemeSymbol;
            return {};
        } else {
            return undefined;
        }
    },
    isUrl: _inputUrl => {
        const _urlResult = Url.regex(_inputUrl);
        return _urlResult ? _urlResult.host && _urlResult.scheme : false;
    }
};
module.exports = {
    ModV4
};
$console.info(
    Url.regex("https://aaa.github.com/hahaha/hshsb/?aaa=bb&ccc=sjsh#shshs")
);