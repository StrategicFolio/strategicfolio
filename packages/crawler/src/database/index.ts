import "dotenv/config";
import { Client } from "pg";

export const client = new Client({
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || "5432"),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
