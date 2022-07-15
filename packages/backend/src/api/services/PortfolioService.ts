import { NETWORKS } from "@strategicfolio/common";
import { getAddress } from "ethers/lib/utils";
import { Service } from "typedi";
import { CreatePortfolioRequest } from "../controllers/requests/CreatePortfolioRequest";
import { Portfolio } from "../entities/Portfolio";
import { User } from "../entities/User";
import { PortfolioRepository } from "../repositories/PortfolioRepository";
import { getERC20TokensByAddress } from "../utils/web3";

@Service()
export class PortfolioService {
  constructor() {}

  async list(user: User) {
    const portfolios = await PortfolioRepository.findBy({
      user: { id: user.id },
    });

    for (const portfolio of portfolios) {
      for (const network of NETWORKS) {
        await getERC20TokensByAddress(portfolio.address, network);
      }
    }

    return portfolios;
  }

  async create(user: User, input: CreatePortfolioRequest): Promise<Portfolio> {
    const { address, name, ...restInput } = input;
    const checksumAddress = getAddress(address);
    const duplicates = await PortfolioRepository.countBy([
      { address: checksumAddress },
      { name },
    ]);

    if (duplicates) {
      throw new Error("Portfolio name or address already exists.");
    }

    const portfolio = PortfolioRepository.create({
      address: checksumAddress,
      name,
      user,
      ...restInput,
    });
    await PortfolioRepository.save(portfolio);

    return portfolio;
  }
}
