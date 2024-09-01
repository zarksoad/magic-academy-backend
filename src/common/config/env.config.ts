import { config } from "dotenv";

config()
export const EnvConfig = () => ({
  host: process.env.HOST,
  port: parseInt(process.env.PORT_DB),
  database: process.env.DATABASE,
  usernameDb: process.env.USERNAME_DB,
  password: process.env.PASSWORD,
});
