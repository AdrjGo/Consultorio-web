import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  forInput: string;
  label: string;
  errors: string | undefined;
}
function Input({
  forInput,
  label,
  onChange,
  placeholder,
  className,
  errors,
  ...props
}: InputProps) {
  return (
    <div className="mb-4 grid">
      <label htmlFor={forInput} className="text-normal font-medium">
        {label}
      </label>
      <input
        id={forInput}
        type={forInput}
        placeholder={placeholder}
        className={twMerge(
          className,
          "bg-white text-black h-10 border border-gray-300 rounded-md py-2 px-3 placeholder-gray-400 focus:border-primary focus:outline-none w-full text-normal"
        )}
        {...props}
      />
      {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
    </div>
  );
}

export default Input;
