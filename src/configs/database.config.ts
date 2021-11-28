import { Sequelize } from 'sequelize';

const DB_NAME: string = process.env.DB_NAME || 'database.sqlite';
const sequelize: Sequelize = new Sequelize(`sqlite:${DB_NAME}`)

export { sequelize, DB_NAME };