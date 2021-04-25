const init = () => {
  $ui.render({
    props: {
      title: "QuickInput"
    },
    views: [
      {
        type: "list",
        props: {
          data: [
            {
              title: "Section 0",
              rows: ["0-0", "0-1", "0-2"]
            }
          ]
        },
        layout: $layout.fill,
        events: {
          didSelect: function (_sender, indexPath, _data) {
            const section = indexPath.section;
            const row = indexPath.row;
          }
        }
      }
    ]
  });
};
module.exports = {
  init
};
