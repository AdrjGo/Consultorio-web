import { useNavigate } from "react-router";

type Props = {
  icon: React.ElementType;
  text: string;
  to: string;
} & React.HTMLAttributes<HTMLButtonElement>;

function SideButton({ icon: Icon, text, to }: Props) {
  const navigate = useNavigate();
  return (
    <button
      className="group flex items-center p-2 rounded gap-2 hover:bg-blue-50"
      type="button"
      onClick={() => navigate(to)}
    >
      <Icon className="size-4 text-gray-500 group-hover:text-blue-500 transition-colors" />
      <span className="text-tiny font-medium text-gray-500 group-hover:text-blue-500 transition-colors">
        {text}
      </span>
    </button>
  );
}

export default SideButton;
