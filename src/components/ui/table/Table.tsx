import Button from "@components/ui/Button";
import Pagination from "@components/ui/table/Pagination";
import type { PatientType } from "@types";
import { Eye, PencilLine, Trash } from "lucide-react";
import React from "react";
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
};

function Table<T>({
  columns,
  data,
  className,
  setPage,
  pagination,
  handleEdit,
}: TableProps<T>) {
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
            <th className="text-small py-2">
              Acciones
            </th>
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
              <td className="[&>button]:w-fit [&>button]:bg-transparent [&>button]:hover:bg-gray-200 flex gap-2 justify-center" >
                <Button children={<Eye className="size-4 text-blue-600" />} />
                <Button
                  className="max-md:hidden"
                  children={<PencilLine className="size-4 text-gray-600" />}
                  onClick={() => handleEdit((row as any).id)}
                />

                <Button
                  className="max-md:hidden"
                  children={<Trash className="size-4 text-red-600" />}
                />
              </td>
            </tr>

          )) ?? "No hay resultados"}
        </tbody>
      </table>

      {pagination && <Pagination data={pagination} setPage={setPage} />}
    </div >
  );
}

export const TableMemo = React.memo(Table<PatientType>);
