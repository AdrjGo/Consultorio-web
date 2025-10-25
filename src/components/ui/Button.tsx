import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function Button({
  className,
  text,
  type,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "bg-primary text-white rounded-lg p-2 shadow-md w-full focus:bg-secondary",
        className,
        props.disabled ? "bg-secondary" : ""
      )}
      type={type}
      onClick={props.onClick}
      disabled={props.disabled}
      {...props}
    >
      {text}
    </button>
  );
}
