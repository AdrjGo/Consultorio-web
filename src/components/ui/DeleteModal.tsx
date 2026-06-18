import Button from "@components/ui/Button";
import Modal from "@components/ui/Modal";
import type { ModalState } from "@types";

type DeleteModalProps = {
  modal: ModalState;
  handleDelete: (id: string) => void;
  deleteTitle?: string;
  deleteDesc?: string;
  deleteId?: string;
};

function DeleteModal({
  modal,
  handleDelete,
  deleteTitle,
  deleteDesc,
  deleteId,
}: DeleteModalProps) {
  return (
    <Modal
      title={deleteTitle ?? "Eliminar"}
      desc={
        deleteDesc ??
        "Está seguro que desea eliminar? Es probable que no se puedan recuperar los datos"
      }
      openModal={modal.isOpen}
      setOpenModal={modal.close}
    >
      <div className="flex justify-between gap-3 [&>button]:bg-white [&>button]:text-black [&>button]:border-gray-200 [&>button]:rounded-md [&>button]:p-2 [&>button]:text-small [&>button]:font-semibold [&>button]:hover:bg-gray-200 [&>button]:border [&>button]:focus:bg-gray-100 mt-4">
        <Button className="text-small bg-white" onClick={() => modal.close()}>
          Salir
        </Button>
        <Button
          className="text-white! bg-red-500!"
          onClick={() => {
            handleDelete?.(deleteId ?? "");
            modal.close();
          }}
        >
          Confirmar
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteModal;
