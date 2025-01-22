import { Sequelize } from "sequelize";

const db = new Sequelize('bycrypt_db','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;