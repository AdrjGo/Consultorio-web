import { useState } from "react";

interface ComboBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: string;
  options: string[];
  values: string[];
  label?: string;
  forInput?: string;
}

const ComboBox = ({
  errors,
  options,
  values,
  label,
  forInput,
  placeholder,
  ...props
}: ComboBoxProps) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Filtra las opciones según el texto
  const filteredIndexes = options
    .map((opt, idx) => ({ opt, idx }))
    .filter(({ opt }) => opt.toLowerCase().includes(inputValue.toLowerCase()));

  const handleSelect = (index: number) => {
    setSelectedValue(values[index]);
    setInputValue(options[index]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <label htmlFor={forInput} className="text-small font-medium">
        {label}
      </label>
      <input
        id={forInput}
        name={forInput}
        placeholder={placeholder}
        {...props}
        type="text"
        value={selectedValue ?? ""}
        onFocus={() => setIsOpen(true)}
        className="w-full h-10 bg-white border border-gray-300 rounded-md text-black py-2 px-2 placeholder-gray-400 focus:border-primary focus:outline-none text-small"
      />
      {errors && <p className="text-red-500 text-small mt-1">{errors}</p>}

      {isOpen && filteredIndexes.length > 0 && (
        <ul className="absolute w-full border border-gray-300 bg-white z-50 max-h-32 overflow-y-auto">
          {filteredIndexes.map(({ opt, idx }) => (
            <li
              key={values[idx]} // usamos el value como key
              onClick={() => handleSelect(idx)}
              className={`p-2 cursor-pointer text-small ${
                selectedValue === values[idx] ? "bg-gray-200" : "bg-white"
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;
