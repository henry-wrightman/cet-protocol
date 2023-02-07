import { useState, useCallback, useEffect } from "react";
import { useContractRead, useNetwork } from "wagmi";
import {
  ORACLES,
  ORACLE_TYPES,
  MODULES,
  NETWORK,
  TICKERS,
} from "../../utils/constants";
import { ethers, utils } from "ethers";
import EAC_ABI from "../../../../subgraph/contractDeployments/0/EACAggregatorProxy.json";
import { Button, Input, Label, Select } from "../common";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateWager, WagerOptions, WagerConfirmationButton } from "./";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import useDebounce from "../../hooks/useDebounce";
import moment from "moment";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const WAGER_FORM_SCHEMA = zod.object({
  partyOne: zod.string(),
  partyTwo: zod.string(),
  wager: zod.string().regex(/^(0|[1-9]\d*)(\.\d+)?$/, "plz valid wager"),
  wagerTwo: zod.string().min(1, "plz valid wager"),
  wagerAmount: zod.string().regex(/^(0|[1-9]\d*)(\.\d+)?$/, "plz valid amount"),
  wagerType: zod.string(),
  wagerExpirationBlock: zod.number(),
  wagerTicker: zod.string(),
});

export type WAGER_FORM_TYPE = zod.infer<typeof WAGER_FORM_SCHEMA>;

export type SelectOption = {
  label: string;
  value: string | number;
};

export type OracleRoundResponse = {
  roundId: number;
  answer: number;
  startedAt: number;
  updatedAt: number;
  answeredInRound: number;
};

export type OracleDecimalsResponse = {
  decimals: number;
};

export const constructWagerData = (
  _type: string,
  _wager: any[],
  decimals: number
) => {
  switch (_type) {
    case "wm.highlow":
      return utils.defaultAbiCoder.encode(
        ["uint", "uint"],
        [_wager[0], BigInt(_wager[1] * 10 ** decimals)]
      );
    case "wm.nearest":
      return utils.defaultAbiCoder.encode(
        ["uint256"],
        [BigInt(_wager[0] * 10 ** decimals)]
      );

    default:
      return null;
  }
};

export const WagerForm = ({ signerAddress }: { signerAddress: string }) => {
  const [expirationDate, setExpirationDate] = useState(Date.now());
  const { chain } = useNetwork();
  const form = useForm<WAGER_FORM_TYPE>({
    defaultValues: {
      wagerType: "wm.highlow",
      wagerTicker: "BTCUSD",
      wager: "1",
      partyOne: signerAddress,
    },
    resolver: zodResolver(WAGER_FORM_SCHEMA),
  });
  const { setValue, register, watch, handleSubmit, getValues, formState } =
    form;
  const isFormTouched = Object.keys(formState.touchedFields).length >= 1;
  const network =
    chain && chain?.network ? (chain?.network as NETWORK) : "goerli";
  const ticker = watch("wagerTicker") as TICKERS;

  const onSubmit: SubmitHandler<WAGER_FORM_TYPE> = async (
    data: WAGER_FORM_TYPE
  ) => {
    console.log(data);
  };

  const useOracleRead = (): [string, number] => {
    const networkD = useDebounce(network, 60000);
    const tickerD = useDebounce(ticker, 1000);

    const decimalRead = useContractRead({
      address: ORACLES["CHAINLINK"][networkD][tickerD], // chainlink oracle
      abi: EAC_ABI,
      functionName: "decimals",
    });
    const decimalReadResult: number =
      decimalRead && decimalRead.data ? (decimalRead.data as number) : 1;

    const contractRead = useContractRead({
      address: ORACLES["CHAINLINK"][networkD][tickerD], // chainlink oracle
      abi: EAC_ABI,
      functionName: "latestRoundData",
    });
    const readResult =
      contractRead && contractRead.data
        ? (contractRead.data as OracleRoundResponse)
        : null;
    let currentPrice = readResult
      ? (parseInt(readResult.answer.toString()) / 10 ** decimalReadResult)
          .toFixed(3)
          .toString()
      : "";

    console.log(currentPrice);
    return [currentPrice, decimalReadResult];
  };

  const WAGER_OPTIONS = [
    {
      value: "wm.highlow",
      label: "high/low",
    },
    {
      value: "wm.nearest",
      label: "nearest price",
    },
  ];

  let [currentPrice, decimals]: [string, number] = useOracleRead();

  const canCreateWager =
    isFormTouched &&
    watch("wager") != null &&
    watch("wagerType") != null &&
    watch("wagerExpirationBlock") != null &&
    watch("wager") != null;

  console.log(formState.errors);

  return (
    <>
      <div className="flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <fieldset className="border-[1px] w-full border-black p-1 rounded-md text-left mb-2">
            <legend className="text-xs text-black p-1">wager</legend>
            <div className="flex flex-row">
              <div className="flex-col m-2">
                <Input
                  className={`basis-1/2 ${
                    formState.errors && formState.errors.wagerAmount
                      ? "border-red-500 focus:border-red-500 focus:border-[1px] focus:ring-0 focus:outline-none"
                      : ""
                  }`}
                  register={register}
                  name={"wagerAmount"}
                  placeholder={"ETH (e.g 0.05)"}
                ></Input>
                {formState.errors && formState.errors.wagerAmount && (
                  <>
                    <Label className="mt-1 text-red-500 text-xs">
                      {formState.errors.wagerAmount.message || ""}
                    </Label>
                  </>
                )}
              </div>
              <Select
                register={register}
                name="wagerType"
                options={WAGER_OPTIONS}
                className="m-2 basis-1/2"
                defaultValue={"wm.highlow"}
                onSelect={(option: SelectOption) => {
                  setValue("wagerType", option?.value as string);
                }}
              />
            </div>
          </fieldset>

          <WagerOptions
            wagerType={watch("wagerType")}
            currentPrice={currentPrice}
            form={form}
          />
          <div className="mb-2 mt-4">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="expiration"
                className="w-full"
                value={expirationDate}
                //minDateTime={moment(moment.now()).add(30, "minutes")}
                disablePast={true}
                onChange={(newValue) => {
                  if (newValue) {
                    setExpirationDate(Date.parse(newValue?.toLocaleString()));
                  }
                }}
                onAccept={async (newValue) => {
                  if (newValue) {
                    setExpirationDate(Date.parse(newValue?.toLocaleString()));
                    const diffBlocks = Math.floor(
                      (Date.parse(newValue?.toLocaleString()) - Date.now()) /
                        1000 /
                        12
                    );
                    const curBlocks = await ethers
                      .getDefaultProvider(chain?.network || "goerli")
                      .getBlockNumber();
                    if (curBlocks) {
                      const futBlocks = curBlocks + diffBlocks;
                      console.log(futBlocks);
                      setValue("wagerExpirationBlock", futBlocks);
                    }
                  }
                }}
              />
            </LocalizationProvider>
          </div>
          <div className="sm:basis-full md:basis-1/3 lg:basis-1/3 justify-center">
            {
              <WagerConfirmationButton
                wager={getValues()}
                trigger={
                  <Button type="submit" className="w-full">
                    Create Wager
                  </Button>
                }
                ready={canCreateWager}
              >
                {canCreateWager ? (
                  <CreateWager
                    signerAddress={signerAddress}
                    wagerData={
                      constructWagerData(
                        watch("wagerType"),
                        [
                          watch("wager"),
                          parseInt(currentPrice).toFixed(0).toString(),
                        ],
                        decimals
                      ) || []
                    }
                    wagerAmount={watch("wagerAmount")}
                    wagerExpirationBlock={watch("wagerExpirationBlock")}
                    wagerModule={
                      MODULES[network].filter(
                        (x) => x.type == watch("wagerType")
                      )[0].address
                    }
                    oracleModule={
                      MODULES[network].filter(
                        (x) => x.type == "oracle.chainlink"
                      )[0].address
                    }
                    oracleSource={
                      ORACLES[ORACLE_TYPES.CHAINLINK][network][ticker]
                    }
                  />
                ) : (
                  <Label> </Label> //can't render children components w a bool, so have this weird else lol
                )}
              </WagerConfirmationButton>
            }
          </div>
          {/* <Label
            className="mt-5 text-center border-[1px] p-1 m-5 w-25 bg-white rounded-2xl border-black"
            ping={true}
          >
            oracle: ChainLink
          </Label> */}
        </form>
      </div>
    </>
  );
};
