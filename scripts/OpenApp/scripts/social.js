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
    status: value => {
      $Social.Twitter.status(value);
    },
    user: value => {
      $Social.Twitter.user(value);
    }
  },
  instagram = {
    media: value => {
      $Social.Instagram.media(value);
    },
    user: value => {
      $Social.Instagram.user(value);
    }
  };
module.exports = {
  v2er,
  telegram,
  twitter,
  instagram
};
