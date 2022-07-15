import { AppDataSource } from "../../database/dataSource";
import { Portfolio } from "../entities/Portfolio";

export const PortfolioRepository = AppDataSource.getRepository(Portfolio);
