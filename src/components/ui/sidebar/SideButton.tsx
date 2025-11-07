import { NavLink } from "react-router";

type Props = {
  icon: React.ElementType;
  text: string;
  to: string;
} & React.HTMLAttributes<HTMLButtonElement>;

function SideButton({ icon: Icon, text, to }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "group flex items-center p-2 rounded gap-2 transition-colors",
          isActive
            ? "bg-blue-50 text-blue-500"
            : "hover:bg-blue-50 text-gray-500 hover:text-blue-500",
        ].join(" ")
      }
    >
      <Icon className="size-4 transition-colors" />
      <span className="text-tiny font-medium transition-colors">{text}</span>
    </NavLink>
  );
}

export default SideButton;
