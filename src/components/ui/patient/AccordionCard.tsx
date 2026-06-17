import { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";

type AccordionCardProps = {
  title: string;
  subtitle?: string;
  count?: number;
  children: React.ReactNode;
  color?: string;
  textColor?: string;
};

export function AccordionCard({
  title,
  subtitle,
  count,
  children,
  color,
  textColor,
}: AccordionCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border dark:border-none border-gray-200 rounded-xl bg-white dark:bg-dark">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span
            className={`flex items-center justify-center w-9 h-9 rounded-lg ${
              color ?? "bg-blue-100"
            } ${textColor ?? "text-blue-600"}`}
          >
            <FileText size={18} />
          </span>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-gray-500 dark:text-gray-300">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {typeof count === "number" && (
            <span className="text-xs text-gray-500 dark:text-gray-300">
              {count} contrato(s)
            </span>
          )}

          <ChevronDown
            size={18}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {open && (
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden px-4 pb-4">{children}</div>
        </div>
      )}
    </div>
  );
}
