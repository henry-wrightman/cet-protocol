import { Label, Select, Input } from "../common";
import { SelectOption } from "./WagerForm";
import { TICKERS } from "../../utils/constants";

const HIGHLOW_OPTIONS = [
  {
    value: "1",
    label: "higher",
  },
  {
    value: "0",
    label: "lower",
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
  register,
  watch,
  setValue,
}: {
  wagerType: string;
  currentPrice: string;
  ticker?: TICKERS;
  register: any;
  watch: any;
  setValue: any;
}) => {
  console.log(ticker);
  return (
    <div className="flex flex-row">
      <fieldset className="border-[1px] border-black p-3 rounded-md text-left mb-2 w-full">
        <legend className="text-xs text-black p-1">
          options ({wagerType})
        </legend>
        <Label className="mt-2 mb-1">ticker: </Label>
        <Select
          register={register}
          name="wagerTicker"
          disabled={ticker ? true : false}
          options={TICKER_OPTIONS}
          className="mb-2"
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
        {wagerType && wagerType == "wm.highlow" ? (
          <>
            <div className="basis-1/2">
              <Label className="mt-2 mb-1">current price: </Label>
              <Input
                className="mt-2 mb-1"
                disabled={true}
                register={register}
                placeholder={currentPrice || "21000"}
                name={"currentPrice"}
              ></Input>
            </div>
            <div className="basis-1/2">
              <Label className="mt-2 mb-1">wager: </Label>
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
          <>
            <Label className="mt-2">wager target: </Label>
            <Input
              className="mt-2 mb-2"
              register={register}
              placeholder={currentPrice}
              name={"wager"}
            ></Input>
          </>
        )}
      </fieldset>
    </div>
  );
};
