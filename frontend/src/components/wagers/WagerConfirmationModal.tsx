import { useState } from "react";
import { Button, Label, Input } from "../common";
import { WAGER_FORM_TYPE } from "./WagerForm";
import { Modal } from "../common";
import { Dialog } from "@headlessui/react";
import { utils } from "ethers";
import { formatDistanceToNow } from "date-fns";
import externalLinkIcon from "../../public/externalLink.svg";
import Image from "next/image";

const DEFAULT_CONTACT_US_TITLE = "Wager confirmation";
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

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Modal isOpen={open} backdrop={true} handleClose={handleClose}>
      <div className="w-200 p-5 flex flex-col text-white bg-purple-800">
        <Dialog.Title className="text-2xl text-center font-bold">
          {title}
        </Dialog.Title>
        <p className="text-sm text-center mb-2 mt-2">{subheader}</p>
        <div className="m-4 sm:basis-full md:basis-1/2 lg:basis-1/2 p-2 rounded-lg bg-purple-800">
          <table className="w-full border-separate border-spacing-x-0 border-spacing-y-2 text-black">
            <>
              <tr className="bg-gray-200 text-left h-[40px]">
                <td className="p-1 font-bold border rounded-l-md">Creator</td>
                <td className="p-1 text-right border rounded-r-md">
                  {
                    <span className="p-1 bg-gray-400 border-gray-400 rounded-md">
                      {wager.creator.slice(0, 6)}
                    </span>
                  }
                </td>
              </tr>
              <tr className="bg-gray-200 text-left h-[40px]">
                <td className="p-1 font-bold border rounded-l-md">
                  Your Wager
                </td>
                <td className="p-1 text-right border rounded-r-md">
                  {wager.wager}
                </td>
              </tr>
              <tr className="bg-gray-200 text-left h-[40px]">
                <td className="p-1 font-bold border rounded-l-md">Wager</td>
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
                  {wager.wagerExpirationBlock}{" "}
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
        </div>
        {children}
      </div>
    </Modal>
  );
};
