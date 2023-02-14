import { useState } from "react";
import { Button, Label, Input } from "../common";
import { WAGER_FORM_TYPE } from "./WagerForm";
import { Modal } from "../common";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import copyLinkIcon from "../../public/copyLink.svg";
import externalLinkIcon from "../../public/externalLink.svg";
import { images } from "../../public/success";
import { TransactionReceipt } from "@ethersproject/providers";
import { ethers } from "ethers";

const DEFAULT_CONTACT_US_TITLE = "Wager submission";
const DEFAULT_CONTACT_US_SUBHEADER =
  "Plz ensure your wager details are correct";

type WagerConfirmProps = {
  onClose: () => void;
  isOpen?: boolean;
  title?: string;
  subheader?: string;
  children: React.ReactElement<any>;
  wager: WAGER_FORM_TYPE;
};

export const WagerConfirmationModal = ({
  isOpen = true,
  title = DEFAULT_CONTACT_US_TITLE,
  subheader = DEFAULT_CONTACT_US_SUBHEADER,
  onClose = () => {},
  children,
  wager,
}: WagerConfirmProps) => {
  const [open, setIsOpen] = useState(isOpen);
  const [data, setData] = useState<TransactionReceipt | undefined>(undefined);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  children = {
    ...children,
    props: {
      ...children.props,
      successCallback: (data: TransactionReceipt) => {
        setData(data);
      },
    },
  };

  return (
    <Modal isOpen={open} backdrop={true} handleClose={handleClose}>
      <div className="w-200 p-5 flex flex-col text-white bg-purple-800 text-center">
        <Dialog.Title className="text-2xl font-bold">{title}</Dialog.Title>
        {!data && <p className="text-sm mb-2 mt-2">{subheader}</p>}
        <div className="m-4 sm:basis-full md:basis-1/2 lg:basis-1/2 p-2 rounded-lg bg-purple-800">
          {data && (
            <div className="items-center">
              <h2 className="font-bold p-2">
                Success!{" "}
                <a
                  target={"_blank"}
                  href={
                    "https://goerli.etherscan.io/tx/" + data.transactionHash
                  }
                  rel="noreferrer"
                >
                  <Image width={17} height={17} src={externalLinkIcon}></Image>
                </a>
              </h2>
              <Image
                objectFit="fill"
                src={
                  images[Math.floor(Math.random() * (5 - 0 + 1) + 0).toString()]
                }
              ></Image>
            </div>
          )}
          {!data && (
            <>
              <table className="w-full border-separate border-spacing-x-0 border-spacing-y-2 text-black">
                <>
                  <tr className="bg-gray-200 text-left h-[40px]">
                    <td className="p-1 font-bold border rounded-l-md">
                      Creator
                    </td>
                    <td className="p-1 text-right border rounded-r-md">
                      {
                        <span className="p-1 bg-gray-400 border-gray-400 rounded-md">
                          {wager.partyOne.slice(0, 6)}
                        </span>
                      }
                    </td>
                  </tr>
                  <tr className="bg-gray-200 text-left h-[40px]">
                    <td className="p-1 font-bold border rounded-l-md">Wager</td>
                    <td className="p-1 text-right border rounded-r-md">
                      {wager.wager}
                    </td>
                  </tr>
                  <tr className="bg-gray-200 text-left h-[40px]">
                    <td className="p-1 font-bold border rounded-l-md">
                      Amount
                    </td>
                    <td className="p-1 text-right border rounded-r-md">
                      {wager.wagerAmount}E
                    </td>
                  </tr>
                  <tr className="bg-gray-200 text-left h-[40px]">
                    <td className="border p-1 font-bold border rounded-l-md">
                      Type
                    </td>
                    <td className="border p-1 text-right border rounded-r-md">
                      {wager.wagerType.replace("wm.", "")} ({wager.wagerTicker})
                    </td>
                  </tr>
                  <tr className="bg-gray-200 text-left h-[40px]">
                    <td className="p-1 font-bold border rounded-l-md">
                      Expiration Block
                    </td>
                    <td className="p-1 text-right border rounded-r-md">
                      {wager.wagerExpirationBlock}
                      {
                        <a
                          target={"_blank"}
                          href={
                            "https://goerli.etherscan.io/block/" +
                            wager.wagerExpirationBlock
                          }
                          rel="noreferrer"
                        >
                          <Image
                            width={17}
                            height={17}
                            src={externalLinkIcon}
                          ></Image>
                        </a>
                      }
                    </td>
                  </tr>
                </>
              </table>
              <span className="text-bold text-sm mt-2 mb-2">
                Note: All wagers execute at midnight UTC daily if they&apos;ve
                reached maturity. For more volatile wagers & precise
                settlements, feel free to manually settle the wager once it
                expires.
              </span>
            </>
          )}
        </div>
        {children}
        {data && (
          <div className="grid justify-items-center">
            <div
              className="flex flex-auto mt-2 p-4 rounded-3xl cursor-pointer w-[250px] rounded-md font-bold text-black p-3 bg-gray-200"
              onClick={() =>
                navigator.clipboard.writeText(
                  "https://1v1-bet.vercel.app/wager/" +
                    ethers.utils.defaultAbiCoder
                      .decode(["uint256"], data.logs[0].topics[2])[0]
                      .toString()
                )
              }
            >
              <div className="p-2 flex-1">Share</div>
              <Image src={copyLinkIcon} alt=" right" width={25} height={25} />
            </div>
          </div>
        )}
        {!data && (
          <span className="text-bold text-xs m-5 pl-2 pr-2">
            By clicking confirm, you acknowledge that the integrity of the data
            used for settlement is reliant on the wager&apos;s oracle.
          </span>
        )}
      </div>
    </Modal>
  );
};
