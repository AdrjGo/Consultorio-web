import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title?: string;
  desc?: string;
  classNames?: string;
  onClickOutside?: () => void;
};

function Modal({
  openModal,
  setOpenModal,
  children,
  title,
  desc,
  classNames,
  onClickOutside,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  /* Abrir modal */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (openModal) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [openModal]);

  /* Cerrar modal click outside*/
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClickOutside = (event: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.bottom &&
        rect.left <= event.clientX &&
        event.clientX <= rect.right;

      if (!isInDialog) {
        onClickOutside?.();
        setOpenModal(false);
      }
    };

    dialog.addEventListener("click", handleClickOutside);
    return () => dialog.removeEventListener("click", handleClickOutside);
  }, [setOpenModal, onClickOutside]);

  return (
    <dialog
      ref={dialogRef}
      className={twMerge(
        classNames,
        "relative bg-white rounded-md text-black p-5 md:p-6 top-1/2 left-1/2 backdrop:bg-black/40  transform -translate-x-1/2 -translate-y-1/2 md:w-2/6"
      )}
      onClose={() => setOpenModal(false)}
    >
      <div className="grid justify-between items-center">
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
