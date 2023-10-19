import { useAccount, useEnsName, useNetwork } from "wagmi";
import { shortenHex } from "../utils/formatters";
import { Select, SelectOption } from "./common/Select";
import { Label } from "./common/Label";

export const Account = () => {
  const { address } = useAccount();
  const { data: ensNameData } = useEnsName({ address });
  const { chain } = useNetwork();

  return (
    <div className="">
      <Label className="mt-1 text-white">
        {ensNameData ?? shortenHex(address ?? "")}{" "}
        {ensNameData ? `(${shortenHex(address ?? "")})` : ""}{" "}
        {`(${chain?.network})`}
      </Label>
      <Select
        name="accountDropdown"
        placeholder={`${shortenHex(address ?? "")}`}
        options={[{ label: `${shortenHex(address ?? "")}`, value: `${shortenHex(address ?? "")}`}, { label: "Disconnect", value: "disconnect" }]}
        className="w-[50%]"
        defaultValue={`${shortenHex(address ?? "")}`}
        onSelect={(option: SelectOption) => {
          if (option.label === "Disconnect") {
            // TODO
          }
        }}
      />
    </div>
  );
};
