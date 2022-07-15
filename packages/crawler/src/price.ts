import {
  getUniswapV2MainContracts,
  getUniswapV2PairContract,
  CONTRACT_ADDRESSES,
  Exchange,
} from "@strategicfolio/common";
import { BigNumber, ethers } from "ethers";
import { client } from "./database";

type Transaction = {
  transactionHash: string;
  pair: string;
  blockNumber: number;
  log: ethers.utils.LogDescription;
  reserve0: number;
  reserve1: number;
};

const getExchangeTransactionsForBlock = async (
  exchange: Exchange,
  blockNumber: number
) => {
  const swapInterface = new ethers.utils.Interface([
    "event Swap(address indexed sender, uint amount0In, uint amount1In, uint amount0Out, uint amount1Out, address indexed to)",
  ]);
  const syncInterface = new ethers.utils.Interface([
    "event Sync(uint112 reserve0, uint112 reserve1)",
  ]);

  const { provider } = getUniswapV2MainContracts(exchange);

  const block = await provider.getBlock(blockNumber);
  const logs = await provider.getLogs({
    fromBlock: blockNumber - 1,
    toBlock: blockNumber,
  });
  const parsedSwapLogs: Transaction[] = [];
  for (const log of logs) {
    try {
      const parsedLog = swapInterface.parseLog(log);
      if (parsedLog.args.sender === CONTRACT_ADDRESSES["pancakeswap"].router) {
        parsedSwapLogs.push({
          transactionHash: log.transactionHash,
          pair: log.address,
          blockNumber: log.blockNumber,
          log: parsedLog,
          reserve0: 0,
          reserve1: 1,
        });
      }
    } catch {}
  }

  const reserves: {
    [pair: string]: {
      reserve0: BigNumber;
      reserve1: BigNumber;
      block: number;
      blockTimestamp: number;
    };
  } = {};

  for (const log of logs) {
    try {
      const parsedLog = syncInterface.parseLog(log);
      const { reserve0, reserve1 } = parsedLog.args;

      const swapLog = parsedSwapLogs.find(
        (swapLog) => swapLog.transactionHash === log.transactionHash
      );

      reserves[swapLog.pair] = {
        reserve0,
        reserve1,
        block: blockNumber,
        blockTimestamp: block.timestamp,
      };
    } catch {}
  }

  return { reserves, transactions: parsedSwapLogs };
};

// const insertPairsIfNotExist = async (
//   transactions: Transaction[],
//   exchange: Exchange
// ) => {
//   for (const transaction of transactions) {
//     const contract = getUniswapV2PairContract(exchange, transaction.pair);
//     const token0 = await contract.token0();
//     const token1 = await contract.token1();

//     await client.query(
//       `INSERT INTO pair(pair, token0, token1, exchange) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`,
//       [transaction.pair, token0, token1, exchange]
//     );
//   }
// };

export const runForExchange = async (exchange: Exchange) => {
  const { provider } = getUniswapV2MainContracts(exchange);

  provider.on("block", async (blockNumber) => {
    const { transactions, reserves } = await getExchangeTransactionsForBlock(
      exchange,
      blockNumber
    );

    const transactionValues = transactions.map(
      (tx) =>
        `('${tx.transactionHash}','${
          tx.log.args.to
        }','${tx.log.args.amount0In.toString()}','${tx.log.args.amount1In.toString()}','${tx.log.args.amount0Out.toString()}','${tx.log.args.amount1Out.toString()}','${
          tx.pair
        }')`
    );
    const transactionsSql = `
      INSERT INTO transaction(tx, address, amount0_in, amount1_in, amount0_out, amount1_out, pair) VALUES ${transactionValues.join(
        ", "
      )}
    `;
    await client.query(transactionsSql);
  });
};

export const run = async () => {
  runForExchange("pancakeswap");
};

// 0x791ac947
