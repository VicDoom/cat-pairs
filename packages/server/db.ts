import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const { POSTGRES_HOST } = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: 5433,
  username: 'postgres',
  password: '625002',
  database: 'forum_cat_pairs',
  dialect: 'postgres',
  models: [__dirname + '/models'],
};
const sequelize = new Sequelize(sequelizeOptions);
export default sequelize;
