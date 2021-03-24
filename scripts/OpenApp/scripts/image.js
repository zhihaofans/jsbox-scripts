const pixivUtil = {
    menu: {
      single: imageUrl => {
        $ui.menu({
          items: ["用Safari打开", "分享", "预览"],
          handler: function (title, idx) {
            switch (idx) {
              case 0:
                $app.openURL(imageUrl);
                break;
              case 1:
                $share.sheet([imageUrl]);
                break;
              case 2:
                $quicklook.open({
                  url: imageUrl,
                  handler: function () {
                    $console.info(imageUrl);
                  }
                });
                break;
              default:
                $app.close();
            }
          }
        });
      }
    }
  },
  pixivCat = {
    single: artworks_id => {
      if (artworks_id) {
        pixivUtil.menu.single(`https://pixiv.cat/${artworks_id}.png`);
      } else {
        $app.close();
      }
    },
    mult: artworks_id => {
      if (artworks_id) {
        $input.text({
          type: $kbType.number,
          placeholder: "第几张图片，从1开始",
          text: 1,
          handler: function (index) {
            if (index) {
              pixivUtil.menu.single(
                `https://pixiv.cat/${artworks_id}-${index || 1}.png`
              );
            } else {
              $app.close();
            }
          }
        });
      } else {
        $app.close();
      }
    }
  };
module.exports = {
  pixivCat
};
