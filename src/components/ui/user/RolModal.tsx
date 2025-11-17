import Button from "@components/ui/Button";
import { CustomTabs } from "@components/ui/form/CustomTabs";
import Modal from "@components/ui/Modal"
import { zodResolver } from "@hookform/resolvers/zod";
import { useGet, usePost } from "@hooks";
import { roleSchema, type RoleFormValues } from "@schemas";
import type { RoleType } from "@types";
import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type RolModalProps = {
    modalRoles: any;
    userId: string | null;
}

type AssignRoleBody = {
    userId: string;
    roleId: string;
};

function RolModal({ modalRoles, userId }: RolModalProps) {
    const [activeTab, setActiveTab] = useState(1);


    const { data: roles } = useGet<RoleType[]>({
        key: ["roles"],
        urlEndpoint: "Role",
        message: "Error al obtener datos de roles",
    });
    // console.log(roles)

    const { handleSubmit, reset, register, formState: { errors } } = useForm<RoleFormValues>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            roleIds: [],
        }
    });
    console.log(errors)

    const { post } = usePost<any, unknown>({
        url: "UserRole",
        setOpenModal: modalRoles.close,
    });


    const onSubmit = (data: RoleFormValues) => {
        const body = data.roleIds.map(roleId => ({
            roleId,
            userId
        }));

        post(body);
        console.log("Body enviado:", body);
    };

    return (
        <Modal
            title="Gestionar permisos"
            desc={`Asigna y gestiona roles para controlar sus permisos en el sistema`}
            openModal={modalRoles.isOpen}
            setOpenModal={modalRoles.close}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
                {
                    roles?.map((role, index) => (
                        <section className="flex items-start gap-3 p-2 rounded-lg border border-gray-200 hover:bg-blue-50 transition-colors" key={index} >
                            <input id={role.id} type="checkbox" className="text-blue mt-2" {...register("roleIds")} value={role.id} />
                            <div className="flex-1">
                                <label htmlFor={role.id} className="text-small font-bold cursor-pointer">{role.name}</label>
                                <p className="text-tiny text-gray-600">{role.description}</p>
                            </div>
                        </section>
                    ))
                }
                <Button><Save className="size-4" /> Guardar Roles</Button>
            </form>
        </Modal>
    )
}

export default RolModal