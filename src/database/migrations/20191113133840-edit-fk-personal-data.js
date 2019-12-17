'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('personal_data', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'SET NULL'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('personal_data', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'SET NULL'
    })
  }
}
