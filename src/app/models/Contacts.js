import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class Contacts extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING,
        phone: Sequelize.INTEGER,
        cellphone: Sequelize.INTEGER
      },
      { sequelize }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

export default Contacts
