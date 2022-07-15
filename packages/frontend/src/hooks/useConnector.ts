import { GnosisSafe } from "@web3-react/gnosis-safe";
import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect";
import { useCallback, useMemo, useState } from "react";
import { getAddChainParameters } from "../chains";
import { CONNECTORS, ConnectorType } from "../connectors";
import { ConnectorHooksResult, useConnectorHooks } from "./useConnectorHooks";

export const useConnector = () => {
  const [error, setError] = useState<Error>();
  const [connectorType, setConnectorType] = useState<ConnectorType>();

  const metamask = useConnectorHooks("Metamask");
  const coinbase = useConnectorHooks("Coinbase");
  const gnosisSafe = useConnectorHooks("GnosisSafe");
  const network = useConnectorHooks("Network");
  const walletConnect = useConnectorHooks("WalletConnect");

  const connectorHooks = useMemo<{
    [key in ConnectorType]: ConnectorHooksResult;
  }>(
    () => ({
      Metamask: metamask,
      Coinbase: coinbase,
      GnosisSafe: gnosisSafe,
      Network: network,
      WalletConnect: walletConnect,
    }),
    [coinbase, gnosisSafe, metamask, network, walletConnect]
  );

  const activate = useCallback(
    (type: ConnectorType) => {
      setConnectorType(type);
      const { connector } = CONNECTORS[type];
      const { chainId } = connectorHooks[type];
      if (connector instanceof WalletConnect || connector instanceof Network) {
        connector
          .activate(chainId === -1 ? undefined : chainId)
          .then(() => setError(undefined))
          .catch(setError);
      } else if (connector instanceof GnosisSafe) {
        connector
          .activate()
          .then(() => setError(undefined))
          .catch(setError);
      } else {
        connector
          .activate(
            chainId === -1 || !chainId
              ? undefined
              : getAddChainParameters(chainId)
          )
          .then(() => setError(undefined))
          .catch(setError);
      }
    },
    [connectorHooks]
  );

  return {
    activate,
    error,
    ...(connectorType ? connectorHooks[connectorType] : {}),
  };
};
