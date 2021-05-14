const database_file = "/assets/.files/database.db",
  table_id = "text_list",
  DB = require("DataBase"),
  SQLite = new DB.SQLite(database_file),
  init = () => {
    SQLite.createSimpleTable(table_id);
  },
  getTextList = list_id => {};
