import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.config";

const User = sequelize.define('User', {
    googleId: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true
    },
    // username: {
    //     type: DataTypes.STRING(128),
    //     allowNull: false,
    //     unique: true
    // },
    email: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(256),
        allowNull: false
    }
});

export default User;