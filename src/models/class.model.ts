import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.config";

const Class = sequelize.define('Class', {
    name: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    room: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    code: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true
    }
});

export default Class;