import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.config";

const Work = sequelize.define('Work', {
    name: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

export default Work;