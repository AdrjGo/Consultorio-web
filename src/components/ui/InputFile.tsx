import { Plus } from "lucide-react"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    title: string;
    description: string;
    id: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputFile({ title, description, id, onChange, ...props }: Props) {
    return (
        <label htmlFor={id} className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Plus className="text-blue-500 size-10" />
                <p className="text-sm text-blue-600 font-medium">{title}</p>
                <p className="text-xs text-blue-500">{description}</p>
            </div>
            <input id={id} name={id} onChange={onChange} type="file" className="hidden" accept="image/svg+xml" {...props} />
        </label>
    )
}

export default InputFile