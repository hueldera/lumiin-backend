'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      "insert into users (name, email, password_hash, role) values('root', 'root@root.com', '123456', 1);"
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      "delete from users where name='root';"
    )
  }
}
