import { WagerForm } from "./wagers/WagerForm";

export const App = ({
  signerAddress,
  chainId,
}: {
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
