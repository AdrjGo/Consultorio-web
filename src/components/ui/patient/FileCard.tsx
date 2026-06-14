import type { FileType } from "@types";
import dayjs from "dayjs";

type FileCardProps = {
  file: FileType;
  onClick?: (file: FileType) => void;
};

function FileCard({ file, onClick }: FileCardProps) {
  return (
    <div
      className="rounded-lg border border-gray-300 dark:border-none dark:bg-dark-tertiary bg-card text-card-foreground shadow-2xs overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={() => onClick?.(file)}
    >
      <div className="aspect-square relative ">
        <img
          src={file.externalReference}
          alt={file.id}
          className="size-full max-md:size-svw object-cover transition-transform"
        />
      </div>
      <section className="p-3">
        <p className="text-sm font-medium line-clamp-1">{file.description}</p>
        <article className="flex items-center justify-between mt-2 [&>p]:text-xs">
          <p className="text-gray-500 dark:text-gray-400">
            {dayjs(file.createdAt).format("DD/MM/YYYY HH:mm")}
          </p>
          <p className="text-blue-500">{file.monitoringNomenclature}</p>
        </article>
      </section>
    </div>
  );
}

export default FileCard;
