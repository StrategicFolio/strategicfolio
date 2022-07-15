import { getUniswapV2MainContracts } from "@strategicfolio/common";
import { LogDescription } from "ethers/lib/utils";
import { DateTime } from "luxon";
import cron from "node-cron";
import { Pair } from "../api/entities/Pair";
import { AppDataSource } from "../database/dataSource";

export class PairsCron {
  public static run() {
    const scheduleTime = DateTime.now()
      .plus({ seconds: 10 })
      .toFormat("ss mm HH dd LL c");

    cron.schedule(scheduleTime, async () => {
      let block = 0;

      do {
        const { provider, factory } = getUniswapV2MainContracts("pancakeswap");
        if (!block) {
          block = (await provider.getBlockNumber()) - 1;
        }
        const encodedResult = await factory.queryFilter(
          factory.filters.PairCreated(),
          Math.max(block - 1000, 1),
          block
        );
        block -= 1000;

        for (const tx of encodedResult) {
          const log = factory.interface.parseLog(tx);
          await this.insertFromLog(log);
        }
      } while (block >= 1);
    });
  }

  public static async insertFromLog(log: LogDescription) {
    const pair: Pair = AppDataSource.manager.create(Pair, {
      pair: log.args.pair,
      token0: log.args.token0,
      token1: log.args.token1,
    });
    try {
      await AppDataSource.manager.save(pair);
    } catch (err) {
      console.error(err);
    }
  }
}
