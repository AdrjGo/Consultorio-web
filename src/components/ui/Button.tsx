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
        className,
        "bg-primary text-white rounded-lg p-2 shadow-md w-full"
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
