import type React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  className,
  children,
  type,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "bg-blue text-small! text-white rounded-md p-2 shadow-md w-full text-nowrap flex items-center justify-center",
        props.disabled ? "bg-secondary" : "",
        className
      )}
      type={type}
      onClick={props.onClick}
      disabled={props.disabled}
      {...props}
    >
      {children}
    </button>
  );
}
