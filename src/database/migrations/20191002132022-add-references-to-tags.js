'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('tags', 'user_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('tags', 'user_id')
  }
};
