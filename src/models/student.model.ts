import { DataTypes } from "sequelize/dist";
import { sequelize } from "../configs/database.config";

const Student = sequelize.define('Student', {});

export default Student;