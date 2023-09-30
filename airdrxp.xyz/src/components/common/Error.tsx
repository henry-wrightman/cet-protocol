import { ReactNode } from "react";

export const Error = ({ children }: { children: ReactNode }) => {
  return <div className="text-center text-xs text-red">{children}</div>;
};
