import Button from "@components/ui/Button";
import DeleteModal from "@components/ui/DeleteModal";
import Pagination from "@components/ui/table/Pagination";
import { useModal } from "@hooks";
import { Eye, Grid2x2Plus, SquarePen, Trash } from "lucide-react";
import React, { useState } from "react";
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
  handleDelete?: (id: string) => void;
  deleteTitle?: string;
  deleteDesc?: string;
  customButtons?: (row: T) => React.ReactNode;
  textButton?: boolean;
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
  textButton,
}: TableProps<T>) {
  const navigate = useNavigate();
  const handleProfile = (id: string) => {
    navigate(urlPageEdit ? `${urlPageEdit}/${id}` : "/odis/404");
  };
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const modal = useModal();

  return (
    <div className="w-full overflow-x-auto">
      <table
        className={twMerge(
          className,
          "min-w-max w-full border-separate border-spacing-x-4 border-spacing-y-1",
        )}
      >
        <thead>
          <tr className="text-left">
            {columns?.map((col, index) => (
              <th
                key={index}
                className={twMerge(col?.className, `text-small py-2`)}
              >
                {col?.label}
              </th>
            ))}
            {(viewButton || editButton || deleteButton || customButtons) && (
              <th className="text-small py-2 text-center">Acciones</th>
            )}
          </tr>
        </thead>
        <tbody className="[&>tr]:border-b [&>tr]:border-gray-200">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <tr
                key={rowIndex}
                className="text-left text-small [&>td]:border-b [&>td]:border-gray-200 dark:[&>td]:border-dark-fourth [&>td]:md:px-1 [&>td]:py-1.5 [&>td]:nth-3:max-md:text-center  border-l-4 "
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {col?.render ? col?.render(row) : (row as any)[col?.key]}
                  </td>
                ))}

                {/* Acciones */}
                {(viewButton ||
                  editButton ||
                  deleteButton ||
                  customButtons) && (
                    <td className="[&>button]:bg-transparent [&>button]:hover:bg-gray-200 flex gap-2 justify-center">
                      {viewButton && (
                        <Button
                          className="text-blue-600 dark:text-blue-400 dark:bg-blue-300/10!"
                          onClick={() => handleProfile((row as any).id)}
                        >
                          <Eye className="size-4" /> {textButton ? "Ver" : null}
                        </Button>
                      )}
                      {editButton && (
                        <Button
                          className="text-blue-900 dark:bg-blue-300/10! dark:text-white"
                          onClick={() => handleEdit((row as any).id)}
                        >
                          <SquarePen className="size-4" />{" "}
                          {textButton ? "Editar" : null}
                        </Button>
                      )}
                      {deleteButton && (
                        <Button
                          className="text-red-600 dark:text-red-400 dark:bg-red-500/10!"
                          onClick={() => {
                            setDeleteId((row as any).id);
                            modal.open();
                          }}
                        >
                          <Trash className="size-4" />{" "}
                          {textButton ? "Eliminar" : null}
                        </Button>
                      )}
                      {customButtons && customButtons(row)}
                    </td>
                  )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="flex flex-col items-center justify-center gap-2 py-10 text-gray-500">
                  <Grid2x2Plus size={40} className="text-gray-300" />
                  <span className="text-small dark:text-gray-300">
                    No hay datos para mostrar
                  </span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <DeleteModal
        modal={modal}
        handleDelete={handleDelete ?? (() => { })}
        deleteTitle={deleteTitle}
        deleteDesc={deleteDesc}
        deleteId={deleteId ?? ""}
      />

      {pagination && <Pagination data={pagination} setPage={setPage} />}
    </div>
  );
}

export const TableMemo = React.memo(Table<any>);
