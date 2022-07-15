import {
  NetworkInfo,
  ERC20ContractInfo,
  ERC20TokenTransferEventsByAddressResponse,
} from "@strategicfolio/common";
import { uniqBy } from "lodash";
import fetch from "node-fetch";
import queryString from "query-string";

export const getERC20TokensByAddress = async (
  address: string,
  network: NetworkInfo
): Promise<ERC20ContractInfo[]> => {
  const { result } = await getERC20TokenTransferEventsByAddress(
    address,
    network
  );

  const uniqContracts = uniqBy(
    result,
    (tx) => tx.contractAddress
  ).map<ERC20ContractInfo>(
    ({ contractAddress, tokenName, tokenSymbol, tokenDecimal }) => ({
      address: contractAddress,
      tokenName,
      tokenSymbol: +tokenSymbol,
      tokenDecimal,
    })
  );
  return uniqContracts;
};

export const getERC20TokenTransferEventsByAddress = async (
  address: string,
  network: NetworkInfo
) => {
  address = "0x085c0663771a9824582A7b7065ff5D57eD2E38B3";
  const randomApiKey =
    network.apiKeys[Math.floor(Math.random() * network.apiKeys.length)];
  const params = {
    module: "account",
    action: "tokentx",
    address,
    sort: "asc",
    apikey: randomApiKey,
  };

  const fetchUrl = `${network.apiBaseUrl}?${queryString.stringify(params)}`;

  const result: ERC20TokenTransferEventsByAddressResponse = await (
    await fetch(fetchUrl)
  ).json();

  if (+result.status !== 1) {
    throw new Error("Error happened.");
  }

  return result;
};
