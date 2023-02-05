import { Dialog, Transition } from "@headlessui/react";
import { Fragment, FC } from "react";

type ModalProps = {
  isOpen: boolean;
  backdrop?: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  showClose?: boolean;
};

export const Modal: FC<ModalProps> = ({
  isOpen,
  backdrop = false,
  handleClose,
  children,
  showClose = true,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => {}}
      >
        {backdrop && (
          <div
            className="fixed inset-0 bg-white/10 backdrop-blur-sm"
            aria-hidden="true"
          />
        )}
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is for centering the modal dialog. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block max-w-xl my-1 overflow-hidden text-left align-middle transition-all transform bg-black shadow-2xl relative rounded-lg">
              {showClose && (
                <button
                  className="absolute right-4 top-4 outline-none"
                  onClick={handleClose}
                >
                  <svg width="16" height="16" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.88546 8.00017L15.6093 2.27629C16.1307 1.75496 16.1307 0.912314 15.6093 0.390992C15.088 -0.130331 14.2454 -0.130331 13.724 0.390992L8.00017 6.11487L2.27629 0.390992C1.75496 -0.130331 0.912314 -0.130331 0.390992 0.390992C-0.130331 0.912314 -0.130331 1.75496 0.390992 2.27629L6.11487 8.00017L0.390992 13.724C-0.130331 14.2454 -0.130331 15.088 0.390992 15.6093C0.650986 15.8693 0.992313 16 1.33364 16C1.67497 16 2.01629 15.8693 2.27629 15.6093L8.00017 9.88546L13.724 15.6093C13.984 15.8693 14.3254 16 14.6667 16C15.008 16 15.3493 15.8693 15.6093 15.6093C16.1307 15.088 16.1307 14.2454 15.6093 13.724L9.88546 8.00017Z"
                      fill="white"
                    />
                  </svg>
                </button>
              )}
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
