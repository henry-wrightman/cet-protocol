import { Signer } from "ethers";
import { useState } from "react";
import { WagerForm } from "./wagers/WagerForm";

import {} from "../utils/constants";
import { shortenHex } from "../utils/formatters";
import { EtherscanLink } from "./common/EtherscanLink";

export type Status = "createWager" | "done";

export const DeploySteps = ({
  signer,
  signerAddress,
  chainId,
}: {
  signer: Signer;
  signerAddress: string;
  chainId: number;
}) => {
  const [passportAddress, setPassportAddress] = useState<string | null>(null);
  const [mmAddress, setMMAddress] = useState<string | null>(null);
  const [step, setStep] = useState<Status>("createWager");

  const IS_MAINNET = chainId === 1;

  return (
    <div className="">
      <div className="flex-col mx-auto">
        {/* {passportAddress && (
          <div className="text-center">
            IT-02 Virtual Mint Token Address:
            <EtherscanLink data={passportAddress} type="address" chainId={chainId}>
              {shortenHex(passportAddress)}
            </EtherscanLink>
          </div>
        )}
        {mmAddress && (
          <div className="text-center">
            Minting Module Address:
            <EtherscanLink data={mmAddress} type="address" chainId={chainId}>
              {shortenHex(mmAddress)}
            </EtherscanLink>
          </div>
        )} */}

        {step === "createWager" && signerAddress && (
          <>
            <WagerForm signerAddress={signerAddress} />
          </>
        )}

        {/* {step === "setBTModule" && mmAddress && passportAddress && (
          <SetBTModule
            passportAddress={passportAddress}
            btModuleAddress={
              IS_MAINNET ? PASSAGE_BT_MODULE_ADDRESS_MAINNET : PASSAGE_BT_MODULE_ADDRESS_GOERLI
            }
            setStep={() => setStep("done")}
          />
        )} */}

        {step === "done" && <div className="text-center text-3xl">Done!</div>}
      </div>
    </div>
  );
};
