import Sequelize, { Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

class SocialMedia extends Model {
  static init(sequelize) {
    super.init(
      {
        portfolio: Sequelize.STRING,
        linkedin: Sequelize.STRING,
        facebook: Sequelize.STRING,
        twitter: Sequelize.STRING
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

export default SocialMedia;
