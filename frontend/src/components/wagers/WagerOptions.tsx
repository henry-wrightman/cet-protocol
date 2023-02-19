import { Label, Select, Input } from "../common";
import { SelectOption, WAGER_FORM_TYPE } from "./WagerForm";
import { TICKERS } from "../../utils/constants";
import { UseFormReturn } from "react-hook-form";

const HIGHLOW_OPTIONS = [
  {
    value: "1",
    label: "higher (1)",
  },
  {
    value: "0",
    label: "lower (0)",
  },
];

const TICKER_OPTIONS = Object.keys(TICKERS).map((x) => {
  return {
    label: x,
    value: x,
  };
});

export const WagerOptions = ({
  wagerType,
  currentPrice,
  ticker,
  form,
}: {
  wagerType: string;
  currentPrice: string;
  ticker?: TICKERS;
  form: UseFormReturn<WAGER_FORM_TYPE>;
}) => {
  const { watch, setValue, register, formState } = form;
  return (
    <div className="flex flex-row">
      <fieldset className="border-[1px] border-black p-3 rounded-md text-left mb-2 w-full">
        <legend className="text-xs text-black p-1">
          options ({wagerType.replace("wm.", "")})
        </legend>
        <div className="flex-col">
          <div className="flex flew-col">
            <div className="flex-row basis-1/2">
              <Label className="mb-1 ml-1">ticker: </Label>
              <Select
                register={register}
                name="wagerTicker"
                disabled={ticker ? true : false}
                options={TICKER_OPTIONS}
                className="flex mb-2"
                placeholder={
                  ticker
                    ? TICKER_OPTIONS.filter((x) => x.label == ticker)[0].value
                    : ""
                }
                defaultValue={
                  ticker
                    ? TICKER_OPTIONS.filter((x) => x.label == ticker)[0].value
                    : watch("wagerTicker")
                }
                onSelect={(option: SelectOption) => {
                  setValue("wagerTicker", option?.value as string);
                  //setWagerType(option?.value as string);
                }}
              />
            </div>
            <div className="flex basis-1/2">
              <div className="flex-row">
                <Label className="mb-1 ml-1">current price: </Label>
                <Input
                  className="mb-2"
                  disabled={true}
                  register={register}
                  placeholder={currentPrice || "21000"}
                  name={"currentPrice"}
                ></Input>
              </div>
            </div>
          </div>
          {wagerType && wagerType == "wm.highlow" ? (
            <>
              <div className="basis-1/2">
                <Label className="mb-1 mt-1 ml-1">wager: </Label>
                <Select
                  register={register}
                  name="wager"
                  options={HIGHLOW_OPTIONS}
                  className="mb-2"
                  defaultValue={"1"}
                  onSelect={(option: SelectOption) => {
                    setValue("wager", option?.value as string);
                    //setWagerType(option?.value as string);
                  }}
                />
              </div>
            </>
          ) : (
            <div className="basis-1/2">
              <Label className="mb-1 mt-1 ml-1">wager target: </Label>
              <Input
                className={`mb-2 ${
                  formState.errors && formState.errors.wager
                    ? "border-red-500 focus:border-red-500 focus:border-[1px] focus:ring-0 focus:outline-none"
                    : ""
                }`}
                register={register}
                placeholder={currentPrice}
                name={"wager"}
              ></Input>
              {formState.errors && formState.errors.wager && (
                <>
                  <Label className="mt-1 ml-1 text-red-500 text-xs">
                    {formState.errors.wager.message || ""}
                  </Label>
                </>
              )}
            </div>
          )}
        </div>
      </fieldset>
    </div>
  );
};
