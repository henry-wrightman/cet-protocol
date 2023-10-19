import { useContractRead, useNetwork } from "wagmi";

export type ChainResult = {
  loading: boolean;
  error: Error;
  data: string;
};

export function useContractWrite(
  address: any,
  abi: any,
  functionName: string,
  args: any
) {
  const { chain } = useNetwork();
  const contractRead = useContractRead({
    address,
    abi,
    functionName,
    args,
    chainId: chain?.id,
  });
  return {
    loading: contractRead.isLoading,
    error: contractRead.error,
    data: contractRead.data ?? "",
  } as ChainResult;
}
