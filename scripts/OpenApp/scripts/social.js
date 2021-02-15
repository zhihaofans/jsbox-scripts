const $Social = require("./lib").appScheme.Social,
    v2er = {
        init: _url => {
          if()
        },
        topic: _t => {
            $Social.v2er.topic(_t);
        },
        node: _node => {
            $Social.v2er.node(_node);
        },
        search: _key => {
            $Social.v2er.search(_key);
        },
        member: _uid => {
            $Social.v2er.member(_uid);
        }
    };
module.exports = {
    v2er
};