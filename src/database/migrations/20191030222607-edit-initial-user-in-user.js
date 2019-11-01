'use strict'

const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
    `update users set password_hash='${await bcrypt.hash('123456', 8)}' where email='root@root.com';`)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      "delete from users where email='root@root.com';"
    )
  }
}
