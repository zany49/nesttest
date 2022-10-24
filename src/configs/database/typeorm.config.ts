import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { databaseConfig } from '../configs.constants';

const NODE_ENV = process.env.NODE_ENV;
console.log(NODE_ENV);
if (NODE_ENV) {
  const pathName = `.${NODE_ENV}.env`.replace(/\s/g, '');
  config({ path: `${pathName}` });
} else config();

export const typeOrmConfig: TypeOrmModule = {
  type: databaseConfig.type,
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  // URL: databaseConfig.URI,
  conn: databaseConfig.conn,

  // ssl : true,
  entities: [`${__dirname}/../../**/*.entity.{js,ts}`],
  synchronize: databaseConfig.synchronize,
  // tls: {
  //   rejectUnauthorized: false,
  // },
};
