const $Social = require("./lib").appScheme.Social,
  v2er = {
    init: _url => {},
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
  },
  telegram = {
    me: _id => {
      $Social.telegram.me(_id);
    }
  };
module.exports = {
  v2er,
  telegram
};
