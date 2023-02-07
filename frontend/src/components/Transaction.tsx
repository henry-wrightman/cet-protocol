import { Button } from "./common/Button";
import { Error } from "./common/Error";
import REGISTRY_ERROR_CODES from "../../../contracts/ErrorCodes.json";
import classNames from "classnames";
import Link from "next/link";
import { TransactionReceipt } from "@ethersproject/providers";

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
  successCallback = (tx?: TransactionReceipt) => {},
}: {
  text: string;
  tx: ((overrideConfig?: any) => void) | undefined;
  error: Error | null;
  buttonClassAdditions?: string;
  data: TransactionReceipt | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  successCallback?: (tx?: TransactionReceipt) => void;
}) => {
  const buttonClass = classNames(buttonClassAdditions, "w-3/4 m-1");
  if (isSuccess && !isLoading) {
    console.log(data);
    successCallback(data);
  }
  return (
    <div className="flex flex-col items-center">
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
      {error ? (
        <span className="text-center font-bold text-red-500">
          {getErrorCode(error?.message!).toUpperCase()}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};
