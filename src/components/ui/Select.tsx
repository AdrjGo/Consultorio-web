import { twMerge } from "tailwind-merge";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  forSelect: string;
  label: string;
  errors: string | undefined;
  values?: string[] | number[];
  options?: string[];
}
function Select({
  forSelect,
  label,
  onChange,
  className,
  errors,
  values,
  options,
  ...props
}: SelectProps) {
  return (
    <div className="mb-4 grid">
      <label htmlFor={forSelect} className="text-small font-medium">
        {label}
      </label>
      <select
        id={forSelect}
        className={twMerge(
          className,
          "bg-white text-black h-10 border border-gray-300 rounded-md py-2 px-2 placeholder-gray-400 focus:border-primary focus:outline-none w-full text-small"
        )}
        onChange={onChange}
        {...props}
      >
        <option value="">Seleccione una opción</option>
        {options?.map((opt, index) => (
          <option key={index} value={values?.[index]}>
            {opt}
          </option>
        ))}
      </select>
      {errors && <p className="text-red-500 text-small mt-1">{errors}</p>}
    </div>
  );
}

export default Select;
