import { PageWrapper } from "@components/layout/PageWrapper"
import { Filters, TableMemo } from "@components/ui"
import { useGet } from "@hooks";
import type { UserType } from "@types";
import { useState } from "react";
import { useDebounce } from "use-debounce";

function UserManagement({ tab }: { tab: string }) {
    const [name, setName] = useState("");
    const [state, setState] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [debouncedName] = useDebounce(name, 750);

    const { data: users } = useGet<UserType[]>({
        key: ["patient", state, debouncedName, role],
        urlEndpoint: `User?search=${debouncedName}&state=${state}&role=${role}`,
        message: "Error al obtener datos de paciente",
    });

    console.log(users)

    const userColumns = [
        {
            key: "name",
            label: "Nombre Completo",
            render: (user: UserType) => `${user.person.name} ${user.person.lastName}`,
        },
        {
            key: "email",
            label: "Email",
            render: (user: UserType) => user.person.email,
        },
        {
            key: "roles",
            label: "Roles",
            render: (user: UserType) => user.roles.map((role: any) => role.name).join(", "),
        },
        {
            key: "Estado",
            label: "Estado",
            render: (user: UserType) => (
                <span className={`rounded-full p-1 px-2 font-semibold ${user.state === "ACTIVE" ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-500"}`}>
                    {user.state}
                </span>
            )
        }
    ]

    return (
        <PageWrapper tab={tab} title="Gestiona los usuarios" desc="Administra las cuentas del personal clínico">
            <section className="bg-white border border-gray-200 rounded-lg p-3 md:p-5 md:w-full w-[93svw] max-md:mb-4">
                <Filters
                    title="Usuarios del Sistema"
                    description="Todos los usuarios registrados en el sistema"
                    setName={setName}
                    setState={setState}
                    setRole={setRole}
                    role={role}
                    state={state}
                    name={name}
                    activeRoles
                />
                <TableMemo
                    columns={userColumns}
                    data={users || []}
                    className={`[&>thead>tr>th]:nth-last-[1]:text-center`}
                    handleEdit={() => { }}
                />
            </section>
        </PageWrapper>
    )
}

export default UserManagement