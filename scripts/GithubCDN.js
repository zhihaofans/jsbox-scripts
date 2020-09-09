let githubList = {
    HUB: "https://github.com/"
};
let cdnList = {
    FASTGIT_HUB: "https://hub.fastgit.org/"
};
let cdnRouter = {
    HUB: ["FASTGIT_HUB"]
};

let getCdn = (id, url) => {
    switch (id) {
        case "FASTGIT_HUB":
            return url.replace(githubList.HUB, cdnList.FASTGIT_HUB);
            break;
        default:
            return undefined;
    }
};
let getCdnList = url => {
    var resultList = [];
    if (url.startsWith(githubList.HUB)) {
        const routerList = cdnRouter.HUB;
        routerList.map(r => {
            const cdn = getCdn(r, url);
            if (cdn) {
                resultList.push(cdn);
            }
        });
    }
};