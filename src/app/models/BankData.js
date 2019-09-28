import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class BankData extends Model {
  static init(sequelize) {
    super.init(
      {
        cpf: Sequelize.INTEGER,
        holder: Sequelize.STRING,
        account: Sequelize.INTEGER,
        bank_branch: Sequelize.STRING,
        bank: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

export default BankData;
