import type { AddEthereumChainParameter } from "@web3-react/types";

const ETH: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

const MATIC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
};

const AVAX: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Avalanche",
  symbol: "AVAX",
  decimals: 18,
};

interface BasicChainInformation {
  urls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
}

export function getAddChainParameters(
  chainId: number
): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

export const CHAINS: {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation;
} = {
  1: {
    urls: [
      "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      "https://cloudflare-eth.com",
    ],
    name: "Mainnet",
  },
  3: {
    urls: ["https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    name: "Ropsten",
  },
  4: {
    urls: ["https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    name: "Rinkeby",
  },
  5: {
    urls: ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    name: "Görli",
  },
  42: {
    urls: ["https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    name: "Kovan",
  },
  // Optimism
  // 10: {
  //   urls: [
  //     "https://optimism-mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  //     "https://mainnet.optimism.io",
  //   ],
  //   name: "Optimism",
  //   nativeCurrency: ETH,
  //   blockExplorerUrls: ["https://optimistic.etherscan.io"],
  // },
  // 69: {
  //   urls: [
  //     "https://optimism-kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  //     "https://kovan.optimism.io",
  //   ],
  //   name: "Optimism Kovan",
  //   nativeCurrency: ETH,
  //   blockExplorerUrls: ["https://kovan-optimistic.etherscan.io"],
  // },
  // Arbitrum
  42161: {
    urls: [
      "https://arbitrum-mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      "https://arb1.arbitrum.io/rpc",
    ],
    name: "Arbitrum One",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://arbiscan.io"],
  },
  421611: {
    urls: [
      "https://arbitrum-rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      "https://rinkeby.arbitrum.io/rpc",
    ],
    name: "Arbitrum Testnet",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://testnet.arbiscan.io"],
  },
  // Polygon
  137: {
    urls: [
      "https://polygon-mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      "https://polygon-rpc.com",
    ],
    name: "Polygon Mainnet",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  80001: {
    urls: [
      "https://polygon-mumbai.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    ],
    name: "Polygon Mumbai",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
  },

  // Avalanche
  43114: {
    urls: ["https://api.avax.network/ext/bc/C/rpc"],
    name: "Avalanche Network",
    nativeCurrency: AVAX,
    blockExplorerUrls: ["https://snowtrace.io"],
  },
};

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});
