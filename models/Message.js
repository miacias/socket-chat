const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Message extends Model {}

Message.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.UUID,
      references: {
        model: "user",
        key: "id",
      },
    },
    room_id: {
      type: DataTypes.UUID,
      references: {
        model: "room",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "message",
  }
);

module.exports = Message;
