import { Contract, providers } from "ethers";
import { NETWORKS } from "../shared";
import factoryAbi from "../abis/uniswapV2Factory.json";
import routerAbi from "../abis/uniswapV2Router.json";
import pairAbi from "../abis/uniswapV2Pair.json";

export type Exchange = "uniswapV2" | "pancakeswap";

export const SWAP_PROTOCOL_CHAINS: { [key in Exchange]: number } = {
  uniswapV2: 1,
  pancakeswap: 56,
};

export const CONTRACT_ADDRESSES: {
  [key in Exchange]: { factory: string; router: string };
} = {
  uniswapV2: {
    factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    router: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  },
  pancakeswap: {
    factory: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
    router: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  },
};

export const getUniswapV2MainContracts = (protocol: Exchange) => {
  const protocolChainId = SWAP_PROTOCOL_CHAINS[protocol];
  const network = NETWORKS.find(
    (network) => network.chainId === protocolChainId
  );

  if (!network) {
    return null;
  }

  const provider = new providers.JsonRpcProvider(network.rpc);
  const factory = new Contract(
    CONTRACT_ADDRESSES[protocol].factory,
    factoryAbi,
    provider
  );
  const router = new Contract(
    CONTRACT_ADDRESSES[protocol].router,
    routerAbi,
    provider
  );

  return { provider, factory, router };
};

export const getUniswapV2PairContract = (
  exchange: Exchange,
  pairAddress: string
) => {
  const protocolChainId = SWAP_PROTOCOL_CHAINS[exchange];
  const network = NETWORKS.find(
    (network) => network.chainId === protocolChainId
  );

  if (!network) {
    return null;
  }

  const provider = new providers.JsonRpcProvider(network.rpc);
  const contract = new Contract(pairAddress, pairAbi, provider);

  return contract;
};
