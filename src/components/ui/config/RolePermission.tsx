import { SectionLayout } from "@components/layout";
import Button from "@components/ui/Button";
import CreateRolModal from "@components/ui/config/RolePersmissonModal/CreateRoleModal";
import { TableMemo } from "@components/ui/table/Table";
import { useGet, useModal } from "@hooks";
import type { RoleType } from "@types";
import { Lock } from "lucide-react";

function RolePermission() {
  const { data: roles } = useGet<RoleType[]>({
    key: ["role"],
    urlEndpoint: `Role`,
    message: "Error al obtener datos de rol",
  });

  const modalFormRole = useModal();

  return (
    <>
      <SectionLayout
        title="Gestión de Roles"
        description="Administra los roles y permisos del sistema"
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
          handleEdit={() => {}}
          deleteButton
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
          customButtons={(row) => (
            <Button
              className="max-md:hidden"
              // onClick={() => handleSecurity(row.id)}
            >
              <Lock className="size-5 text-blue-500" />
            </Button>
          )}
        />
      </SectionLayout>

      {modalFormRole.isOpen && <CreateRolModal modalFormRole={modalFormRole} />}
    </>
  );
}

export default RolePermission;
