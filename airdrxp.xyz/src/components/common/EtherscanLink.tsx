import { ReactNode } from "react";

export const EtherscanLink = ({
  children,
  data,
  type,
  chainId,
}: {
  children: ReactNode;
  data: string;
  type: "tx" | "address";
  chainId: number;
}) => {
  return (
    <a
      href={`https://${chainId === 5 ? "goerli." : ""}etherscan.io/${
        type === "tx" ? "tx" : "address"
      }/${data}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};
