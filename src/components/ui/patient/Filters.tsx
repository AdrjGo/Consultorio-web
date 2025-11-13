import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import { PatientState } from "@constants";
import { isMobile, setUrlParams } from "@utils";
import { BrushCleaning, Search } from "lucide-react";

type Props = {
    setName: React.Dispatch<React.SetStateAction<string>>;
    setState: React.Dispatch<React.SetStateAction<string>>;
    name: string;
}

function Filters({ setName, setState, name }: Props) {
    return (
        <div className="flex flex-col flex-1">
            <h2 className="text-normal font-bold">Lista de Pacientes</h2>
            <span className="text-small text-gray-500">
                Lista de todos los pacientes registrados
            </span>
            <div className="my-5 flex gap-5">
                <Input
                    forInput="nameSearch"
                    type="text"
                    icon={<Search className="text-gray-400 size-5" />}
                    placeholder="Buscar por nombre o apellido..."
                    className="w-full flex-1"
                    value={name}
                    maxLength={22}
                    onChange={(e) => {
                        setUrlParams({ name: "search", value: e.target.value });
                        setName(e.target.value);
                    }}
                    autoComplete="off"
                />

                <Select
                    forSelect="stateFilter"
                    optionDefaultText="Todos"
                    options={PatientState?.map((s) => s.label)}
                    values={PatientState?.map((s) => s.value)}
                    onChange={(e) => {
                        setUrlParams({ name: "state", value: e.target.value });
                        setState(e.target.value);
                    }}
                />

                <Button
                    className="flex gap-2 size-fit py-2.5"
                    onClick={() => {
                        setUrlParams({ name: "search", value: "" });
                        setUrlParams({ name: "state", value: "" });
                        setName("");
                        setState("");
                    }}
                >
                    <BrushCleaning className="size-4" />
                    {isMobile ? "" : "Limpiar Filtros"}
                </Button>
            </div>
        </div>
    )
}

export default Filters