module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Reports', {
        report_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Reports');
    },
  };
  