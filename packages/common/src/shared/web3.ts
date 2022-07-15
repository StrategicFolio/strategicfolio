export type NetworkInfo = {
  name: string;
  rpc: string;
  chainId: number;
  currency: string;
  apiBaseUrl: string;
  apiKeys: string[];
};

export const NETWORKS: NetworkInfo[] = [
  {
    name: "Ethereum",
    rpc: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    chainId: 1,
    currency: "ETH",
    apiBaseUrl: "https://api.etherscan.io/api",
    apiKeys: ["IEPZFY4IAFKIUS38G3D8D9XHGYQZQ9QFTB"],
  },
  // {
  //   name: "Binance Smart Chain",
  //   rpc: "https://bsc-dataseed.binance.org",
  //   chainId: 56,
  //   currency: "BNB",
  //   apiBaseUrl: "https://api.etherscan.io/api",
  //   apiKeys: ["VRWDTGRTII85AJE38JM8CGP7SC44YYMM6E"],
  // },
  // {
  //   name: "Avalanche",
  //   rpc: "https://api.avax.network/ext/bc/C/rpc",
  //   chainId: 43114,
  //   currency: "AVAX",
  //   apiBaseUrl: "https://api.etherscan.io/api",
  //   apiKeys: [],
  // },
  // {
  //   name: "Polygon",
  //   rpc: "https://polygon-rpc.com",
  //   chainId: 137,
  //   currency: "MATIC",
  //   apiBaseUrl: "https://api.etherscan.io/api",
  //   apiKeys: [],
  // },
];
