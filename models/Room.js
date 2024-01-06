import { Model, DataTypes } from "sequelize";
import sequelize from "../db/connection";
import bcrypt from 'bcrypt';

class Room extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Room.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    admin_id: {
      type: DataTypes.UUID,
      references: {
        model: "user",
        key: "id",
      },
    }
  },
  {
    hooks: {
      beforeCreate: async (newRoom) => {
        newRoom.password = await bcrypt.hash(newRoom.password, 10);
        return newRoom;
      },
      beforeUpdate: async (updatedRoom) => {
        updatedRoom.password = await bcrypt.hash(updatedRoom.password, 10);
        return updatedRoom;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'room',
  }
);

export default Room;
