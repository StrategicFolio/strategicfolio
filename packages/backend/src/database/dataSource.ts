import "dotenv/config";

import path from "path";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [path.join(__dirname, "../api/entities/*{.js,.ts}")],
  migrations: [path.join(__dirname, "migrations/*{.js,.ts}")],
  namingStrategy: new SnakeNamingStrategy(),
  subscribers: [],
});

AppDataSource.initialize();
