import { useAccount, useEnsName, useNetwork } from "wagmi";
import { shortenHex } from "../utils/formatters";
import { Input } from "./common/Input";
import { Label } from "./common/Label";

export const Account = () => {
  const { address } = useAccount();
  const { data: ensNameData } = useEnsName({ address });
  const { chain } = useNetwork();

  return (
    <div>
      <Label className="mt-1">
        {ensNameData ?? shortenHex(address ?? "")}{" "}
        {ensNameData ? `(${shortenHex(address ?? "")})` : ""}{" "}
        {`(${chain?.network})`}
      </Label>
    </div>
  );
};
