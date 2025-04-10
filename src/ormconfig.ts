import { config } from "dotenv"
import { DataSource } from "typeorm"
import { Budget } from "./entities/Budget"
import { Contract } from "./entities/Contract"


config()

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Budget, Contract],
})
