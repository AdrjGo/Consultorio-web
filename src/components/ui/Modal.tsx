import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
  desc: string;
  classNames?: string;
};

function Modal({
  openModal,
  setOpenModal,
  children,
  title,
  desc,
  classNames,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (openModal) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [openModal]);

  return (
    <dialog
      ref={dialogRef}
      className={twMerge(
        classNames,
        "relative bg-white rounded-md text-black p-5 md:p-6 top-1/2 left-1/2 backdrop:bg-black/40  transform -translate-x-1/2 -translate-y-1/2 md:w-2/6"
      )}
      onClose={() => setOpenModal(false)}
    >
      <div className="grid justify-between items-center mb-4">
        <h2 className="text-body font-bold">{title}</h2>
        <span className="text-small text-gray-500">{desc}</span>

        <button
          className="text-gray-500 hover:text-gray-700 absolute right-3 top-3 flex items-center justify-center"
          onClick={() => setOpenModal(false)}
        >
          <X className="size-4" />
        </button>
      </div>
      {children}
    </dialog>
  );
}

export default Modal;
