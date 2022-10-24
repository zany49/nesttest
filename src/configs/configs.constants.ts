import { config } from 'dotenv';
let NODE_TLS_REJECT_UNAUTHORIZED = 1;
const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV) {
  const pathName = `.${NODE_ENV}.env`.replace(/\s/g, '');
  config({ path: `${pathName}` });
} else config();

export const databaseConfig = {
  type: process.env.DB_TYPE,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  synchronize: process.env.DB_SYNCHRONIZE,
  conn: process.env.DB_CONN,
  ssl: process.env.DB_SSL,
  //sURI: process.env.URI,
};

export const appConfig = {
  port: process.env.APP_PORT,
};

export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
};
