import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class Documents extends Model {
  static init(sequelize) {
    super.init(
      {
        document: Sequelize.STRING,
        photo: Sequelize.STRING
      },
      {
        sequelize
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

export default Documents
