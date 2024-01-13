// import { Model, DataTypes } from "sequelize";
// import sequelize from "../db/connection.js";

// class RoomUser extends Model {}

// RoomUser.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       allowNull: false,
//       primaryKey: true,
//     },
//     chatter_id: {
//       type: DataTypes.UUID,
//       references: {
//         model: "user",
//         key: "id",
//       },
//     },
//     room_id: {
//       type: DataTypes.UUID,
//       references: {
//         model: "room",
//         key: "id",
//       },
//     },
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "roomuser",
//   }
// );

// export default RoomUser;
