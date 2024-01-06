import { Model, DataTypes } from "sequelize";
import sequelize from "../db/connection";

class RoomUser extends Model {}

RoomUser.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    chatter_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    room_id: {
      type: DataTypes.STRING,
      references: {
        model: "room",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: "chatter",
  }
);

export default RoomUser;
