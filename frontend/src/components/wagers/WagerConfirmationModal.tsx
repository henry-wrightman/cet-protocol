import { useState } from "react";
import { Button, Label, Input } from "../common";
import { WAGER_FORM_TYPE } from "./WagerForm";
import { Modal } from "../common";
import { Dialog } from "@headlessui/react";
import { utils, Transaction as T } from "ethers";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import externalLinkIcon from "../../public/externalLink.svg";
import { images } from "../../public/success";

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
  const [data, setData] = useState("");

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  children = {
    ...children,
    props: {
      ...children.props,
      successCallback: (data: string) => {
        setData(data);
      },
    },
  };

  return (
    <Modal isOpen={open} backdrop={true} handleClose={handleClose}>
      <div className="w-200 p-5 flex flex-col text-white bg-purple-800">
        <Dialog.Title className="text-2xl text-center font-bold">
          {title}
        </Dialog.Title>
        <p className="text-sm text-center mb-2 mt-2">{subheader}</p>
        <div className="m-4 sm:basis-full md:basis-1/2 lg:basis-1/2 p-2 rounded-lg bg-purple-800">
          {data.length > 0 && (
            <div className="items-center text-center">
              <h2 className="font-bold p-2">
                Success!{" "}
                <a
                  target={"_blank"}
                  href={"https://goerli.etherscan.io/tx/" + data}
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
                          {wager.creator.slice(0, 6)}
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
        <span className="text-bold text-center text-xs m-5 pl-2 pr-2">
          By clicking confirm, you acknowledge that the integrity of the data
          used for settlement is reliant on the wager&apos;s oracle.
        </span>
      </div>
    </Modal>
  );
};
