import { ConnectorNames } from "@/lib/connect-wallet/config/connectors";
import { getInjectedConnector } from "@/lib/connect-wallet/utils/connectors";

export const getConnectorByName = (name) => {
  if (name == ConnectorNames.Injected) {
    return getInjectedConnector();
  }
};
