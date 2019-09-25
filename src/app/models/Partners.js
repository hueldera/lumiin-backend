import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class Partners extends Model {
  static init(sequelize) {
    super.init(
      {
        personalData: Sequelize.INTEGER,
        contacts: Sequelize.INTEGER,
        documents: Sequelize.INTEGER
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

export default Partners;
