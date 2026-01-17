import { NavLink } from "react-router";

type Props = {
  icon: React.ElementType;
  text: string;
  to: string;
  OnClick?: () => void;
} & React.HTMLAttributes<HTMLButtonElement>;

function SideButton({ icon: Icon, text, to, OnClick }: Props) {
  return (
    <div onClick={OnClick}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          [
            "group flex items-center p-2 rounded gap-2 transition-colors",
            isActive
              ? "bg-blue-50 dark:bg-dark-tertiary text-blue-500"
              : "hover:bg-blue-50 dark:hover:bg-dark-tertiary text-gray-500 dark:text-white hover:text-blue-500",
          ].join(" ")
        }
      >
        <Icon className="size-4 transition-colors" />
        <span className="text-tiny font-medium transition-colors">{text}</span>
      </NavLink>
    </div>
  );
}

export default SideButton;
