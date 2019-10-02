import Sequelize, { Model } from 'sequelize'

class Avaliation extends Model {
  static init(sequelize) {
    super.init({
      posture: Sequelize.STRING,
      comunication: Sequelize.STRING
    }, {
      sequelize
    })

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

export default Avaliation
