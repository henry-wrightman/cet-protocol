import { Signer } from "ethers";
import { useState } from "react";
import { WagerForm } from "./wagers/WagerForm";

export const App = ({
  signer,
  signerAddress,
  chainId,
}: {
  signer: Signer;
  signerAddress: string;
  chainId: number;
}) => {
  const IS_MAINNET = chainId === 1;

  return (
    <div className="">
      <div className="flex-col mx-auto">
        <>
          <WagerForm signerAddress={signerAddress} />
        </>
      </div>
    </div>
  );
};
