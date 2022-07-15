import { AppDataSource } from "../../database/dataSource";
import { User } from "../entities/User";

export const UserRepository = AppDataSource.getRepository(User);
