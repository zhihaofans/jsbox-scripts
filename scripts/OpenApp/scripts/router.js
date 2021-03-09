module.exports = {
    "v2er.topic": {
        type: "social",
        app: "v2er",
        func: "topic",
        regex: /https:\/\/www.v2ex.com\/t\/(.+)/
    },
    "v2er.member": {
        type: "social",
        app: "v2er",
        func: "member",
        regex: /https:\/\/www.v2ex.com\/member\/(.+)/
    },
    "telegram.me": {
        type: "social",
        app: "telegram",
        func: "me",
        regex: /https:\/\/t.me\/(.+)/
    },
    "bilibili.video": {
        type: "video",
        app: "bilibili",
        func: "video",
        regex: /https:\/\/www.bilibili.com\/video\/(.+)/
    },
    "bilibili.m.video": {
        type: "video",
        app: "bilibili",
        func: "video",
        regex: /https:\/\/m.bilibili.com\/video\/(.+)/
    },
    "bilibili.space": {
        type: "video",
        app: "bilibili",
        func: "space",
        regex: /https:\/\/space.bilibili.com\/(.+)/
    },
    "bilibili.m.space": {
        type: "video",
        app: "bilibili",
        func: "space",
        regex: /https:\/\/m.bilibili.com\/space\/(.+)/
    },
    "bilibili.b23wtf": {
        type: "video",
        app: "bilibili",
        func: "b23wtf",
        regex: /https:\/\/b23.tv\/(.+)/
    }
};