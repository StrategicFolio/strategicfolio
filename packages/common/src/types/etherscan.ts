export type EtherscanApiResponse<T> = {
  status: string;
  message: string;
  result: T;
};

export type ERC20TokenTransferEventsByAddressResult = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
};

export type ERC20TokenTransferEventsByAddressResponse = EtherscanApiResponse<
  ERC20TokenTransferEventsByAddressResult[]
>;
