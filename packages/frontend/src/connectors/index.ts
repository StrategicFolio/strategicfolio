import { initializeConnector, Web3ReactHooks } from "@web3-react/core";
import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { MetaMask } from "@web3-react/metamask";
import { GnosisSafe } from "@web3-react/gnosis-safe";
import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect";

import { URLS } from "../chains";

export type ConnectorType =
  | "Metamask"
  | "WalletConnect"
  | "Network"
  | "GnosisSafe"
  | "Coinbase";

export const [coinbaseConnector, coinbaseHooks] =
  initializeConnector<CoinbaseWallet>(
    (actions) =>
      new CoinbaseWallet({
        actions,
        options: {
          url: URLS[1][0],
          appName: "StrategicFolio",
        },
      })
  );

export const [metamaskConnector, metamaskHooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions })
);

export const [gnosisSafeConnector, gnosisSafeHooks] =
  initializeConnector<GnosisSafe>((actions) => new GnosisSafe({ actions }));

export const [networkConnector, networkHooks] = initializeConnector<Network>(
  (actions) => new Network({ actions, urlMap: URLS })
);

export const [walletConnectConnector, walletConnectHooks] =
  initializeConnector<WalletConnect>(
    (actions) =>
      new WalletConnect({
        actions,
        options: {
          rpc: URLS,
        },
      })
  );

export const CONNECTORS: {
  [key in ConnectorType]: {
    connector: MetaMask | GnosisSafe | Network | WalletConnect | CoinbaseWallet;
    hooks: Web3ReactHooks;
  };
} = {
  Metamask: {
    connector: metamaskConnector,
    hooks: metamaskHooks,
  },
  WalletConnect: {
    connector: walletConnectConnector,
    hooks: walletConnectHooks,
  },
  Network: {
    connector: networkConnector,
    hooks: networkHooks,
  },
  GnosisSafe: {
    connector: gnosisSafeConnector,
    hooks: gnosisSafeHooks,
  },
  Coinbase: {
    connector: coinbaseConnector,
    hooks: coinbaseHooks,
  },
};
