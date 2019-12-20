import Sequelize, { Model } from 'sequelize'

class PersonalData extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        birth_date: Sequelize.DATE,
        cpf_cnpj: Sequelize.INTEGER,
        rg: Sequelize.INTEGER,
        street: Sequelize.STRING,
        house_number: Sequelize.INTEGER,
        house_complement: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        country: Sequelize.STRING,
        state_subscription: Sequelize.INTEGER,
        civic_subscription: Sequelize.INTEGER
      },
      {
        sequelize
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    })
  }
}

export default PersonalData
