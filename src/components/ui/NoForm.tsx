import { FileText } from "lucide-react";

type NoFormProps = {
  text: string;
};

function NoForm({ text }: NoFormProps) {
  return (
    <div className="w-full grid place-items-center gap-2">
      <FileText size={40} color="#D1D5DB" />
      <p className=" text-small text-gray-500">
        {text ?? "Formulario no dispobnible"}
      </p>
    </div>
  );
}

export default NoForm;
