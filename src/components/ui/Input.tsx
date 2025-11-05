import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  forInput: string;
  label?: string;
  errors?: string | undefined;
  icon?: React.ReactNode;
}
function Input({
  forInput,
  label,
  onChange,
  placeholder,
  className,
  errors,
  icon,
  ...props
}: InputProps) {
  return (
    <div className="mb-4 grid w-full">
      <label htmlFor={forInput} className="text-small font-medium">
        {label}
      </label>
      <div
        className={`flex gap-1 items-center w-full${
          icon
            ? "bg-white text-black h-10 border border-gray-300 rounded-md py-2 px-2 placeholder-gray-400 focus:border-primary focus:outline-none w-full text-small"
            : ""
        }`}
      >
        {icon}
        <input
          id={forInput}
          {...props}
          placeholder={placeholder}
          className={twMerge(
            `bg-white text-black ${
              icon ? "" : "h-10 border border-gray-300 "
            }  rounded-md py-2 px-2 placeholder-gray-400 focus:border-primary focus:outline-none w-full text-small`,
            className
          )}
        />
      </div>
      {errors && <p className="text-red-500 text-small mt-1">{errors}</p>}
    </div>
  );
}

export default Input;
