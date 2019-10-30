'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      "insert into users (name, email, password_hash, role, created_at, updated_at) values('root', 'root@root.com', '123456', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);"
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      "delete from users where name='root';"
    )
  }
}
