import React, { ReactNode } from "react";
import { Dialog } from "@headlessui/react";
import { Cross2Icon } from "@radix-ui/react-icons";

interface IInfoModal {
  isOpen: boolean;
  setIsOpen: (state: boolean) => any;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

export default function InfoModal({
  isOpen = false,
  setIsOpen,
  title,
  description,
  children,
}: IInfoModal) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 bg-slate-950 bg-opacity-80"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="fixed top-1/2 left-1/2 w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-md p-6 bg-blue-50 focus:outline-none">
          <Dialog.Title className="text-brand-primary font-bold mt-4 text-lg">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-brand-secondary mt-3 mb-5 leading-normal">
            {description}
          </Dialog.Description>
          {children}

          <button
            className="hover:bg-blue-100 focus:shadow-blue-400/50 absolute top-3 right-3 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
            onClick={() => setIsOpen(false)}
          >
            <Cross2Icon />
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
