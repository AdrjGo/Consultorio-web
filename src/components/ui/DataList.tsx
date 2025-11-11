import React, { forwardRef, useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

type Option = { id: string; label: string };

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  forInput: string;
  label: string;
  nameList?: string;
  options?: Option[]; // ahora id + label
}

const DataList = forwardRef<HTMLInputElement, Props>(function DataList(
  {
    forInput,
    label,
    nameList,
    options = [],
    value,
    onChange,
    className,
    ...props
  },
  ref
) {
  // valor visible en el input
  const [display, setDisplay] = useState<string>("");

  // si el formulario controla el value (p.e. defaultValues), sincronizamos el display
  useEffect(() => {
    if (value) {
      // si value es un id, buscamos label para mostrar
      const matched = options.find((o) => o.id === value);
      setDisplay(matched ? matched.label : String(value));
    } else {
      setDisplay("");
    }
  }, [value, options]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDisplay = e.target.value;
    setDisplay(newDisplay);

    // buscamos si coincide exactamente con alguna opción
    const matched = options.find((o) => o.label === newDisplay);

    if (matched) {
      // llamamos al onChange del register pasando el id (el form guardará el id)
      const syntheticEvent = {
        target: { value: matched.id, name: props.name },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
    } else {
      // si no coincide, propaga el texto (opcional)
      const syntheticEvent = {
        target: { value: newDisplay, name: props.name },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
    }
  };

  return (
    <div className="mb-4 grid min-w-fit">
      <label htmlFor={forInput} className="text-small font-medium">
        {label}
      </label>

      <input
        id={forInput}
        ref={ref}
        {...props}
        list={nameList}
        value={display}
        onChange={handleChange}
        className={twMerge(
          "bg-white text-black h-10 border border-gray-300 rounded-md py-2 px-2 placeholder-gray-400 focus:border-primary focus:outline-none w-full text-small",
          className
        )}
      />

      <datalist id={nameList}>
        {/* {options.map((opt) => (
          <option key={opt.id} value={opt.label} />
        ))} */}
        <option value="1">a</option>
        <option value="2">b</option>
        <option value="3">c</option>
      </datalist>
    </div>
  );
});

export default DataList;
