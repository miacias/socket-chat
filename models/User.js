const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUser) => {
        newUser.password = await bcrypt.hash(newUser.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUser) => {
        updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
        return updatedUser;
      },
      beforeBulkCreate: (bulkUserData) => {
        bulkUserData.forEach((user) => {
          user.password = bcrypt.hashSync(user.password, 10);
        });
        return bulkUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
