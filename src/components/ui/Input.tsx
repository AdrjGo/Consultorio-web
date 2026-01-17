import type { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  forInput: string | undefined;
  label?: string;
  errors?: FieldError;
  icon?: React.ReactNode;
  maxLength?: number;
}
function Input({
  forInput,
  label,
  placeholder,
  className,
  errors,
  icon,
  maxLength,
  ...props
}: InputProps) {
  return (
    <div className="grid w-full">
      <label
        htmlFor={forInput}
        className="text-small font-medium dark:text-white"
      >
        {label}
      </label>
      <div
        className={`flex gap-1 items-center w-full${
          icon
            ? "bg-white dark:bg-dark text-black dark:text-white h-10 border dark:border-none border-gray-300 rounded-md py-2 px-2 placeholder-gray-400 dark:placeholder-gray-200 focus:border-primary focus:outline-none w-full text-small"
            : ""
        }`}
      >
        {icon}
        <input
          id={forInput}
          name={forInput}
          {...props}
          placeholder={placeholder}
          className={twMerge(
            `bg-white dark:bg-dark text-black dark:text-white ${
              icon ? "" : "h-10 border dark:border-none border-gray-300 "
            }  rounded-md py-2 px-2 placeholder-gray-400 dark:placeholder-gray-200 focus:border-primary focus:outline-none w-full text-small`,
            className,
          )}
          onChange={props.onChange}
          maxLength={maxLength}
          autoComplete="on"
        />
      </div>
      {errors && (
        <p className="text-red-500 text-small mt-1">{errors.message}</p>
      )}
    </div>
  );
}

export default Input;
