import { Model, DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

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
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
    },
    room_id: {
      type: DataTypes.UUID,
      references: {
        model: "rooms",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: "roomuser",
  }
);

export default RoomUser;
