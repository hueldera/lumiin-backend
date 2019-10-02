import Sequelize, { Model } from 'sequelize'

class Tag extends Model {
  static init(sequelize) {
    super.init({
      note: Sequelize.INTEGER,
      comment: Sequelize.STRING
    }, {
      sequelize
    })

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

export default Tag
