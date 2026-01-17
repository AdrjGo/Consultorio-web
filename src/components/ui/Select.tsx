import type { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  forSelect: string;
  label?: string;
  errors?: FieldError | undefined;
  values?: string[] | number[];
  options?: string[];
  optionDefault?: boolean;
  optionDefaultText?: string;
  containerClassName?: string;
}
function Select({
  forSelect,
  label,
  onChange,
  className,
  errors,
  values,
  options,
  optionDefault = true,
  optionDefaultText,
  containerClassName,
  ...props
}: SelectProps) {
  return (
    <div className={twMerge(containerClassName, "grid min-w-fit")}>
      <label
        htmlFor={forSelect}
        className="text-small font-medium dark:text-white"
      >
        {label}
      </label>
      <select
        id={forSelect}
        className={twMerge(
          className,
          "bg-white dark:bg-dark text-black dark:text-white h-10 border dark:border-none border-gray-300 rounded-md py-2 px-2 placeholder-gray-400 focus:border-primary focus:outline-none w-full text-small",
        )}
        onChange={onChange}
        {...props}
      >
        {optionDefault === true && (
          <option value="">
            {optionDefaultText ?? "Seleccione una opción"}
          </option>
        )}
        {options?.map((opt, index) => (
          <option key={index} value={values?.[index]}>
            {opt}
          </option>
        ))}
      </select>
      {errors && (
        <p className="text-red-500 text-small mt-1">{errors.message}</p>
      )}
    </div>
  );
}

export default Select;
