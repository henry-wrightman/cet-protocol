import { Button } from "./common/Button";
import { Error } from "./common/Error";
import REGISTRY_ERROR_CODES from "../../../contracts/ErrorCodes.json";
import classNames from "classnames";
import Link from "next/link";
import { ethers, utils, Transaction as T } from "ethers";

export const getErrorCode = (err: string) => {
  if (!err) return "";
  const re = new RegExp(" reverted: (W[0-9]+)");
  const code: string = re.test(err) ? (re.exec(err)![1] as string) : "";

  // TODO fix this horrendous type circumvention
  return Object.keys(REGISTRY_ERROR_CODES.registry).includes(code)
    ? JSON.parse(JSON.stringify(REGISTRY_ERROR_CODES.registry))[code]
    : "";
};
export const Transaction = ({
  text,
  tx,
  error,
  buttonClassAdditions,
  data,
  isLoading,
  isSuccess,
  successCallback = (txId: string) => {},
}: {
  text: string;
  tx: ((overrideConfig?: any) => void) | undefined;
  error: Error | null;
  buttonClassAdditions?: string;
  data: string;
  isLoading: boolean;
  isSuccess: boolean;
  successCallback?: (txId: string) => void;
}) => {
  const buttonClass = classNames(buttonClassAdditions, "w-full");
  if (isSuccess && !isLoading) {
    console.log(data);
    successCallback(data);
  }
  return (
    <div className="w-full">
      {isSuccess && (
        <Link href="/wagers/">
          <span className="w-full text-center"></span>
        </Link>
      )}
      {!error && !isSuccess && (
        <Button
          className={buttonClass}
          type="submit"
          onClick={() => tx?.()}
          disabled={error != null}
          showLoader={isLoading}
        >
          {text}
        </Button>
      )}
      {error ? getErrorCode(error?.message!) : ""}
    </div>
  );
};
