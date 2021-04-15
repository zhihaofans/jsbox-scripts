const $Social = require("./lib").appScheme.Social,
  v2er = {
    init: _url => {},
    topic: _t => {
      $Social.V2er.topic(_t);
    },
    node: _node => {
      $Social.V2er.node(_node);
    },
    search: _key => {
      $Social.V2er.search(_key);
    },
    member: _uid => {
      $Social.V2er.member(_uid);
    }
  },
  telegram = {
    me: _id => {
      $Social.Telegram.me(_id);
    }
  },
  twitter = {
    status: _id => {
      $Social.Twitter.status(_id);
    },
    user: _id => {
      $Social.Twitter.user(_id);
    }
  };
module.exports = {
  v2er,
  telegram,
  twitter
};
