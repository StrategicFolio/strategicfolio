import { getUniswapV2MainContracts, Exchange } from "@strategicfolio/common";
import { client } from "./database";

const runExchangeCrawler = (exchange: Exchange) => {
  const { factory } = getUniswapV2MainContracts(exchange);
  const filter = factory.filters.PairCreated();

  factory.on(filter, async (token0, token1, pair) => {
    const sql =
      "INSERT INTO pair(pair, token0, token1, exchange) VALUES($1, $2, $3, $4)";
    const values = [pair, token0, token1, exchange];

    try {
      await client.query(sql, values);
    } catch {}
  });
};

export const run = async () => {
  runExchangeCrawler("pancakeswap");
  // runExchangeCrawler("uniswapV2");
};
