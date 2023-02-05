import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchNetwork,
  useNetwork,
} from "wagmi";
import { useIsMounted } from "../hooks";
import { Button, Error, Select } from "./common";
import { InjectedConnector } from "wagmi/connectors/injected";
import { NETWORK } from "../utils/constants";
import { SelectOption } from "../components/wagers";

const NETWORK_OPTIONS = ["goerli", "mainnet"].map((x) => {
  return {
    label: x,
    value: x,
  };
});

export const Connect = () => {
  const isMounted = useIsMounted();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { connect, connectors, error, pendingConnector } = useConnect({
    onError(error) {
      console.log(error);
    },
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <>
      {address && isMounted && (
        <div className="flex flex-row">
          <Select
            name="network"
            options={NETWORK_OPTIONS}
            className="mr-2 basis-1/2"
            placeholder={chain?.network}
            defaultValue={chain?.network}
            onSelect={(option: SelectOption) => {
              //setValue("wagerType", option?.value as string);
              //useSwitchNetwork()
            }}
          />
          <Button className="w-full h-[40px]" onClick={() => disconnect()}>
            Disconnect
          </Button>
        </div>
      )}

      {!address &&
        connectors
          .filter((x) => isMounted && x.ready)
          .map((x) => (
            <Button
              className="w-full mb-5"
              key={x.id}
              onClick={() => connect({ connector: x })}
              showLoader={address && x.id === pendingConnector?.id}
            >
              Connect ({x.name})
            </Button>
          ))}

      {error && <Error>{error.message}</Error>}
    </>
  );
};
