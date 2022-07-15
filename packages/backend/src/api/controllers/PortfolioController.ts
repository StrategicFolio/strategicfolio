import {
  Authorized,
  Body,
  CurrentUser,
  Get,
  JsonController,
  Post,
} from "routing-controllers";
import { Service } from "typedi";
import { Portfolio } from "../entities/Portfolio";
import { User } from "../entities/User";
import { PortfolioService } from "../services/PortfolioService";
import { CreatePortfolioRequest } from "./requests/CreatePortfolioRequest";

@Authorized()
@JsonController("/portfolio")
@Service()
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @Get()
  async list(@CurrentUser() user: User) {
    return await this.portfolioService.list(user);
  }

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() input: CreatePortfolioRequest
  ): Promise<Portfolio> {
    return await this.portfolioService.create(user, input);
  }
}
