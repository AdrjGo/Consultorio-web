import { CustomTabs } from "@components/ui/form/CustomTabs";
import Modal from "@components/ui/Modal";
import FormRoles from "@components/ui/user/RolModal/FormRoles";
import FormState from "@components/ui/user/RolModal/FormState";
import { useGet } from "@hooks";
import { type RoleFormValues, type StateFormValues } from "@schemas";
import type { RoleType, UserRoleType } from "@types";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type RolModalProps = {
    modalSecurity: any;
    userId: string | null;
};

function RolModal({ modalSecurity, userId }: RolModalProps) {
    const [activeTab, setActiveTab] = useState(1);

    const { data: roles } = useGet<RoleType[]>({
        key: ["roles"],
        urlEndpoint: "Role",
        message: "Error al obtener datos de roles",
        enabled: userId ? true : false,
    });

    const { data: userRoles } = useGet<UserRoleType[]>({
        key: ["userRoles", userId ?? ""],
        urlEndpoint: `UserRole/${userId}`,
        message: "Error al obtener datos de roles",
        enabled: userId ? true : false,
    });

    const { data: user } = useGet<StateFormValues>({
        key: ["user", userId ?? ""],
        urlEndpoint: `User/${userId}/data`,
        message: "Error al obtener datos de usuario",
        enabled: userId ? true : false,
    });

    const methods = useForm<RoleFormValues | StateFormValues>()

    useEffect(() => {
        if (modalSecurity.isOpen && userId && userRoles) {
            methods.reset({ roleIds: userRoles.map(r => r.roleId) });
        }
    }, [modalSecurity.isOpen, userRoles, userId]);



    useEffect(() => {
        if (modalSecurity.isOpen && user) {
            methods.reset({
                state: user.state,
            });
        }
    }, [user, modalSecurity.isOpen]);

    console.log(methods.watch())

    if (!roles || !userRoles) return "Cargando roles...";

    return (
        <Modal
            title="Gestionar permisos"
            desc={`Asigna y gestiona roles para controlar sus permisos en el sistema`}
            openModal={modalSecurity.isOpen}
            setOpenModal={modalSecurity.close}
        >
            <CustomTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={[
                    {
                        value: 1,
                        label: "Roles",
                        content: (
                            <FormProvider {...methods} key={userId ?? "newUser"}>
                                <FormRoles
                                    roles={roles}
                                    userId={userId}
                                    modalSecurity={modalSecurity}
                                    userRoles={userRoles}
                                />
                            </FormProvider>
                        ),
                    },
                    {
                        value: 2,
                        label: "Estado",
                        content: (
                            <FormProvider {...methods}>
                                <FormState
                                    userId={userId}
                                    modalSecurity={modalSecurity}
                                />
                            </FormProvider>
                        )
                    },
                ]}
            />
        </Modal>
    );
}

export default RolModal;
