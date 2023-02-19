import { useState, useCallback, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useContractRead, useNetwork } from "wagmi";
import {
  ORACLES,
  ORACLE_TYPES,
  MODULES,
  NETWORK,
  TICKERS,
  TICKER_DECIMALS,
} from "../../utils/constants";
import { ethers, utils } from "ethers";
import EAC_ABI from "../../../../subgraph/contractDeployments/0/EACAggregatorProxy.json";
import { Button, Input, Label, Select } from "../common";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateWager, WagerOptions, WagerConfirmationButton } from ".";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import useDebounce from "../../hooks/useDebounce";
import moment from "moment";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSubgraphClient } from "../../graphql/client_2";

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

const PRICE_FEED_QUERY = gql`
  query prices($first: Int!, $tickers: [String]!) {
    prices(
      where: { assetPair_in: $tickers }
      orderBy: timestamp
      first: $first
      orderDirection: desc
    ) {
      price
      assetPair {
        id
      }
    }
  }
`;

type PriceResults = {
  prices: Price[];
};

type Price = {
  price: string;
  assetPair: AssetPair;
};

type AssetPair = {
  id: string;
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
  if (!_wager[0] || !_wager[1]) return;
  try {
    switch (_type) {
      case "wm.highlow":
        return utils.defaultAbiCoder.encode(
          ["uint", "uint"],
          [_wager[0], _wager[1]]
        );
      case "wm.nearest":
        return utils.defaultAbiCoder.encode(["uint256"], [_wager[0]]);

      default:
        return null;
    }
  } catch (ex) {
    console.log(ex);
    return;
  }
};

export const WagerForm = ({ signerAddress }: { signerAddress: string }) => {
  const [expirationDate, setExpirationDate] = useState(Date.now());
  const { chain } = useNetwork();
  const form = useForm<WAGER_FORM_TYPE>({
    defaultValues: {
      wagerType: "wm.highlow",
      wagerTicker: "BTC/USD",
      partyOne: signerAddress,
    },
    resolver: zodResolver(WAGER_FORM_SCHEMA),
  });
  const {
    setValue,
    register,
    watch,
    handleSubmit,
    getValues,
    formState: { errors, touchedFields },
  } = form;
  const isFormTouched = Object.keys(touchedFields).length >= 1;
  const network =
    chain && chain?.network ? (chain?.network as NETWORK) : "goerli";
  const ticker = watch("wagerTicker") as TICKERS;
  const { data, loading, error } = useQuery<PriceResults>(PRICE_FEED_QUERY, {
    client: getSubgraphClient(chain?.id!),
    variables: { first: 1000, tickers: Object.keys(TICKERS).map((x) => x) }, // , timestamp: Date.now()
  });
  let currentPrice =
    data && data.prices.length > 0
      ? data.prices.filter((x) => x.assetPair.id == ticker)[0].price
      : "0";

  const onSubmit: SubmitHandler<WAGER_FORM_TYPE> = async (
    data: WAGER_FORM_TYPE
  ) => {
    console.log(data);
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

  const canCreateWager =
    !errors.partyOne &&
    !errors.wager &&
    !errors.wagerAmount &&
    !errors.wagerExpirationBlock &&
    watch("wager") != null &&
    watch("wagerType") != null &&
    watch("wagerExpirationBlock") != null &&
    watch("wager") != null;

  return (
    <>
      <div className="flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <fieldset className="border-[1px] w-full border-black p-1 rounded-md text-left mb-2">
            <legend className="text-xs text-black p-1">wager</legend>
            <div className="flex flex-row">
              <div className="flex-col m-2 basis-1/2">
                <Label className="mb-1 ml-1">amount: </Label>
                <Input
                  className={` ${
                    errors && errors.wagerAmount
                      ? "border-red-500 focus:border-red-500 focus:border-[1px] focus:ring-0 focus:outline-none"
                      : ""
                  }`}
                  register={register}
                  name={"wagerAmount"}
                  placeholder={"ETH (e.g 0.05)"}
                ></Input>
                {errors && errors.wagerAmount && (
                  <>
                    <Label className="mt-1 ml-1 text-red-500 text-xs">
                      {errors.wagerAmount.message || ""}
                    </Label>
                  </>
                )}
              </div>
              <div className="flex-col m-2 basis-1/2">
                <Label className="mb-1 ml-1">style: </Label>
                <Select
                  register={register}
                  name="wagerType"
                  options={WAGER_OPTIONS}
                  className="m-1"
                  defaultValue={"wm.highlow"}
                  onSelect={(option: SelectOption) => {
                    setValue("wager", "");
                    setValue("wagerType", option?.value as string);
                  }}
                />
              </div>
            </div>
          </fieldset>

          <WagerOptions
            wagerType={watch("wagerType")}
            currentPrice={(
              parseFloat(currentPrice) /
              10 ** TICKER_DECIMALS[ticker as TICKERS]["subgraph"]
            ).toLocaleString(undefined, { minimumFractionDigits: 4 })}
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
                  <Button type="submit" className="w-full mt-4">
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
                          BigInt(
                            parseFloat(watch("wager")) *
                              10 **
                                TICKER_DECIMALS[ticker as TICKERS]["oracle"] ||
                              0
                          ).toString(),
                          BigInt(
                            parseFloat(currentPrice) *
                              10 ** TICKER_DECIMALS[ticker as TICKERS]["oracle"]
                          ).toString(),
                        ],
                        TICKER_DECIMALS[ticker as TICKERS]["oracle"]
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
