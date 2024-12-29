module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("topics", "storeID", {
        type: Sequelize.INTEGER,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("tableName", "columnName1"),
      queryInterface.removeColumn("tableName", "columnName2"),
    ]);
  },
};
