import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import { PatientState } from "@constants";
import { useGet } from "@hooks";
import type { RoleType } from "@types";
import { isMobile, setUrlParams } from "@utils";
import { BrushCleaning, Search } from "lucide-react";

type Props = {
    setName: React.Dispatch<React.SetStateAction<string>>;
    setState: React.Dispatch<React.SetStateAction<string>>;
    setRole?: any;
    role?: string
    state: string
    name: string;
    title: string;
    description: string;
    activeRoles?: boolean
}

function Filters({ setName, setState, state, name, title, description, activeRoles, setRole, role }: Props) {

    const { data: roles } = useGet<RoleType[]>({
        key: ["Role"],
        urlEndpoint: `Role`,
        message: "Error al obtener datos de paciente",
    });

    return (
        <div className="flex flex-col flex-1">
            <h2 className="text-normal font-bold">{title}</h2>
            <span className="text-small text-gray-500">{description}</span>
            <div className="my-4 flex gap-5 items-center">
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
                    optionDefaultText="Todos los estados"
                    options={PatientState?.map((s) => s.label)}
                    values={PatientState?.map((s) => s.value)}
                    value={state}
                    onChange={(e) => {
                        setUrlParams({ name: "state", value: e.target.value });
                        setState(e.target.value);
                    }}
                />

                {
                    activeRoles && (
                        <Select
                            forSelect="RoleFilter"
                            optionDefaultText="Todos los roles"
                            options={roles?.map((s) => s.name)}
                            values={roles?.map((s) => s.name)}
                            value={role}
                            onChange={(e) => {
                                setUrlParams({ name: "role", value: e.target.value });
                                setRole(e.target.value);
                            }}
                        />
                    )
                }

                <Button
                    className="flex gap-2 size-fit py-2.5"
                    onClick={() => {
                        history.replaceState({}, document.title, window.location.pathname);
                        setName("");
                        setState("active");
                        setRole("");
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