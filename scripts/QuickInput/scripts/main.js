const initView = () => {
  $ui.push({
    props: {
      title: ""
    },
    views: [
      {
        type: "list",
        props: {
          data: [
            {
              title: "",
              rows: []
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
