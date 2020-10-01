let httpGetAwait = async (url, headerList = undefined) => {
    const result = $http.get({
        url: url,
        header: headerList
    });
    return result;
};

let httpPostAwait = async (url, postBody, headerList = undefined) => {
    const result = $http.post({
        url: url,
        header: headerList,
        body: postBody
    });
    return result;
};
module.exports = {
    httpGetAwait,
    httpPostAwait
};