import Button from "@components/ui/Button";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

type PaginationProps<T> = {
  data: any | T;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
};

function Pagination<T>({ data, setPage }: PaginationProps<T>) {
  return (
    <div className="flex bottom-0 justify-end gap-3 items-center mt-4 [&>button]:w-fit [&>button]:px-3 [&>button]:py-1 [&>button]:border [&>button]:rounded [&>button]:disabled:opacity-50">
      <span className="text-small">
        Página {data?.pageNumber ?? 1} de {data?.totalPages ?? 1}
      </span>
      <Button
        disabled={!data?.hasPrevious}
        onClick={() => (setPage ? setPage((p) => Math.max(1, p - 1)) : {})}
        children={<CircleChevronLeft className="size-4" />}
      />
      <Button
        disabled={!data?.hasNext}
        onClick={() => (setPage ? setPage((p) => p + 1) : {})}
        children={<CircleChevronRight className="size-4" />}
      />
    </div>
  );
}

export default Pagination;
