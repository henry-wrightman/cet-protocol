import { Button } from "./common/Button";
import { Error } from "./common/Error";
import REGISTRY_ERROR_CODES from "../../../contracts/ErrorCodes.json";

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
  isLoading,
  isSuccess,
}: {
  text: string;
  tx: ((overrideConfig?: any) => void) | undefined;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
}) => {
  return (
    <div className="w-full">
      {!error && (
        <Button
          className="w-full"
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
