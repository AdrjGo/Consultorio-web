import Button from "@components/ui/Button";
import Modal from "@components/ui/Modal";
import Pagination from "@components/ui/table/Pagination";
import { useModal } from "@hooks";
import { Eye, SquarePen, Trash } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  className?: string;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  pagination?: any;
  handleEdit: (id: string) => void;
  urlPageEdit?: string;
  viewButton?: boolean;
  editButton?: boolean;
  deleteButton?: boolean;
  handleDelete?: () => void;
  deleteTitle?: string;
  deleteDesc?: string;
  customButtons?: (row: T) => React.ReactNode;
};

function Table<T>({
  columns,
  data,
  className,
  setPage,
  pagination,
  handleEdit,
  urlPageEdit,
  viewButton,
  editButton,
  deleteButton,
  handleDelete,
  deleteDesc,
  deleteTitle,
  customButtons,
}: TableProps<T>) {
  const navigate = useNavigate();
  const handleProfile = (id: string) => {
    navigate(urlPageEdit ? `${urlPageEdit}/${id}` : "/odis/404");
  };

  const modal = useModal();

  return (
    <div>
      <table
        className={twMerge(
          className,
          `w-full md:px-4 border-separate border-spacing-y-1`
        )}
      >
        <thead>
          <tr className="text-left border-b border-gray-300">
            {columns.map((col, index) => (
              <th
                key={index}
                className={twMerge(col.className, `text-small py-2`)}
              >
                {col.label}
              </th>
            ))}
            <th className="text-small py-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="[&>tr]:border-b [&>tr]:border-gray-200">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="text-left text-small [&>td]:border-b [&>td]:border-gray-200 [&>td]:md:px-1 [&>td]:py-1.5 [&>td]:nth-3:max-md:text-center  border-l-4 "
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </td>
              ))}

              {/* Acciones */}
              <td className="[&>button]:w-fit [&>button]:bg-transparent [&>button]:hover:bg-gray-200 flex gap-2 justify-center">
                {viewButton && (
                  <Button
                    className="max-md:hidden text-blue-600"
                    onClick={() => handleProfile((row as any).id)}
                  >
                    <Eye className="size-4" /> Ver
                  </Button>
                )}
                {editButton && (
                  <Button
                    className="max-md:hidden text-amber-500"
                    onClick={() => handleEdit((row as any).id)}
                  >
                    <SquarePen className="size-4" /> Editar
                  </Button>
                )}
                {deleteButton && (
                  <Button
                    className="max-md:hidden text-red-600"
                    onClick={() => modal.open()}
                  >
                    <Trash className="size-4" /> Eliminar
                  </Button>
                )}
                {customButtons && customButtons(row)}
              </td>
            </tr>
          )) ?? "No hay resultados"}
        </tbody>
      </table>

      <Modal
        title={deleteTitle ?? "Eliminar"}
        desc={deleteDesc ?? "Está seguro que desea eliminar?"}
        openModal={modal.isOpen}
        setOpenModal={modal.close}
      >
        <div className="flex justify-between gap-3 [&>button]:bg-white [&>button]:text-black [&>button]:border-gray-200 [&>button]:rounded-md [&>button]:p-2 [&>button]:text-small [&>button]:font-semibold [&>button]:hover:bg-gray-200 [&>button]:border [&>button]:focus:bg-gray-100 mt-4">
          <Button className="text-small bg-white" onClick={() => modal.close()}>
            Salir
          </Button>
          <Button
            className="text-white! bg-red-500!"
            onClick={() => handleDelete?.()}
          >
            Confirmar
          </Button>
        </div>
      </Modal>

      {pagination && <Pagination data={pagination} setPage={setPage} />}
    </div>
  );
}

export const TableMemo = React.memo(Table<any>);
