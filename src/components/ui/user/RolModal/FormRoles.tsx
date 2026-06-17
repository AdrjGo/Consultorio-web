import Button from "@components/ui/Button";
import { useUpdate } from "@hooks";
import type { UserRoleFormValues } from "@schemas";
import type { ModalState, RoleType, UserRoleType } from "@types";
import { Save } from "lucide-react";
import { useFormContext } from "react-hook-form";

type FormRolesProps = {
  roles: RoleType[];
  userId: string | null;
  userRoles: UserRoleType[];
  modalSecurity: ModalState;
};

function FormRoles({
  roles,
  userId,
  userRoles,
  modalSecurity,
  ...props
}: FormRolesProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<UserRoleFormValues>();

  const { update } = useUpdate<any, unknown>({
    method: "PATCH",
    url: `UserRole`,
    setOpenModal: modalSecurity.close,
    queryKeyToInvalidate: [["users"], ["userRoles"]],
  });

  const onSubmit = (data: UserRoleFormValues) => {
    const body = data.roleIds.map((roleId) => ({ roleId, userId }));
    update(body);
    console.log("Body enviado:", body);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-3"
      key={userId ?? "newUser"}
      {...props}
    >
      {roles?.map((role) => (
        <section
          key={role.id}
          className="flex items-start gap-3 p-2 rounded-lg border dark:border-none border-gray-200 dark:bg-dark hover:bg-blue-50 dark:hover:bg-dark-fourth transition-colors"
        >
          <input
            id={role.id}
            type="checkbox"
            value={role.id}
            className="mt-2"
            {...register("roleIds")}
          />
          <label
            htmlFor={role.id}
            className="flex-1 cursor-pointer text-small font-bold"
          >
            <span className="font-bold text-small dark:text-white">
              {role.name}
            </span>
            <p className="text-tiny text-gray-600 dark:text-gray-300">
              {role.description}
            </p>
          </label>
        </section>
      ))}
      {errors.roleIds && (
        <p className="text-red-500 text-small mt-1">{errors.roleIds.message}</p>
      )}
      <Button>
        <Save className="size-4" /> Guardar Roles
      </Button>
    </form>
  );
}

export default FormRoles;
