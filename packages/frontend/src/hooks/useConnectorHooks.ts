import { Network } from "@web3-react/network";
import type { Web3Provider } from "@ethersproject/providers";
import { useEffect, useMemo } from "react";
import { CONNECTORS, ConnectorType } from "../connectors";

export type ConnectorHooksResult = {
  chainId: number;
  accounts: string[];
  isActivating: boolean;
  isActive: boolean;
  provider: Web3Provider;
  ensNames: (undefined | string)[];
};

export const useConnectorHooks = (
  type: ConnectorType
): ConnectorHooksResult => {
  const {
    connector,
    hooks: {
      useChainId,
      useAccounts,
      useIsActivating,
      useIsActive,
      useProvider,
      useENSNames,
    },
  } = useMemo(() => CONNECTORS[type], [type]);
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ensNames = useENSNames(provider);

  useEffect(() => {
    if (connector instanceof Network) {
      connector.activate().catch(() => {
        console.debug("Failed to connect to network");
      });
    } else {
      connector.connectEagerly().catch(() => {
        console.debug("Failed to connect eagerly to metamask");
      });
    }
  }, [connector]);

  return {
    chainId,
    accounts,
    isActivating,
    isActive,
    provider,
    ensNames,
  };
};
