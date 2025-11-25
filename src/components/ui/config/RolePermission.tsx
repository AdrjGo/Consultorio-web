import { SectionLayout } from "@components/layout";
import Button from "@components/ui/Button";
import CreateRolModal from "@components/ui/config/RolePersmissonModal/CreateRoleModal";
import { TableMemo } from "@components/ui/table/Table";
import { useDelete, useGet, useModal } from "@hooks";
import type { RoleType } from "@types";
import { setUrlParams } from "@utils";
import { Lock } from "lucide-react";
import { useState } from "react";

function RolePermission() {
  const [idRole, setIdRole] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const modalFormRole = useModal();

  const { data: roles } = useGet<RoleType[]>({
    key: ["role"],
    urlEndpoint: `Role`,
    message: "Error al obtener datos de rol",
  });

  const { deleteItem } = useDelete({
    url: `Role/${idRole}`,
  });

  const handleDeteleRole = (id: string) => {
    setIdRole(id);
    deleteItem(id);
    // console.log(id);
  };

  const handleEdit = (id: string) => {
    setIdRole(id);
    setIsEditing(true);
    setUrlParams({ name: "role", value: id });
    // console.log(id);
    modalFormRole.open();
  };

  const closeModal = () => {
    setIsEditing(false);
    if (modalFormRole.isOpen) {
      setUrlParams({ name: "role", value: "" });
      modalFormRole.close();
    }
  };

  return (
    <>
      <SectionLayout
        title="Gestión de Roles"
        description="Administra los roles y permisos del sistema - Nota: no se puede eliminar un rol si tiene usuarios asociados"
        extraComponent={
          <Button
            className="text-small text-white! px-5 bg-green"
            onClick={() => modalFormRole.open()}
          >
            <Lock className="size-4" />
            Agregar Nuevo Rol
          </Button>
        }
      >
        <TableMemo
          editButton
          handleEdit={handleEdit}
          deleteButton
          handleDelete={(id: string) => handleDeteleRole(id)}
          columns={[
            {
              key: "name",
              label: "Nombre",
              render: (role: RoleType) => role.name,
            },
            {
              key: "description",
              label: "Descripción",
              render: (role: RoleType) => role.description,
            },
            {
              key: "users",
              label: "Usuarios",
              render: (role: RoleType) => role.usersUsingRole,
            },
            {
              key: "permissions",
              label: "Permisos",
              render: (role: RoleType) => role.permissionsOnRole,
            },
          ]}
          data={roles || []}
        />
      </SectionLayout>

      {modalFormRole.isOpen && (
        <CreateRolModal
          modalFormRole={modalFormRole}
          closeModal={closeModal}
          isEditing={isEditing}
        />
      )}
    </>
  );
}

export default RolePermission;
