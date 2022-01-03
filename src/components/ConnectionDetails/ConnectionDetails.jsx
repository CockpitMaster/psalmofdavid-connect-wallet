import { useWeb3React } from "@web3-react/core";

import { DataDisplay } from "@/components/DataDisplay";

export const ConnectionDetails = () => {
  const { active, account } = useWeb3React();

  if (!active) {
    return null;
  }

  return <DataDisplay>{account}</DataDisplay>;
};
