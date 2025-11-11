import Pagination from "@components/ui/table/Pagination";
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
};

export function Table<T>({
  columns,
  data,
  className,
  setPage,
  pagination,
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
            </tr>
          )) ?? "No hay resultados"}
        </tbody>
      </table>

      {pagination && <Pagination data={pagination} setPage={setPage} />}
    </div>
  );
}
