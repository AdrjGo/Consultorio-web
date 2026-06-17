import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Modal from "@components/ui/Modal";
import NoPermission from "@components/ui/NoPermission";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGet, usePost, useUpdate } from "@hooks";
import {
  roleWithPermissionsSchema,
  type RoleWithPermissionsFormValues,
} from "@schemas";
import type {
  ModalState,
  RolePermissionsType,
  roleWithPermissions,
} from "@types";
import { getError, getUrlParams, hasPermission } from "@utils";
import { useEffect } from "react";
import { useForm, useWatch, type Control } from "react-hook-form";

type CreateRolModalProps = {
  modalFormRole: ModalState;
  closeModal: () => void;
  isEditing: boolean;
};

function CreateRoleModal({
  modalFormRole,
  closeModal,
  isEditing,
}: CreateRolModalProps) {
  const {
    handleSubmit,
    register,
    control,
    reset,
    // watch,
    formState: { errors, isSubmitting },
  } = useForm<RoleWithPermissionsFormValues>({
    resolver: zodResolver(roleWithPermissionsSchema),
    defaultValues: {
      role: {
        name: "",
        description: "",
      },
      permissions: [],
    },
  });

  // console.log(errors);

  // console.log(watch());

  const { data: rolePermissions } = useGet<RolePermissionsType[]>({
    key: "roles",
    urlEndpoint: "Permission",
    message: "Error al obtener datos de roles",
  });

  const idRole = getUrlParams({ name: "role" });

  const { data: roleWithPermission } = useGet<roleWithPermissions>({
    key: ["roleWithPermission", idRole ?? ""],
    urlEndpoint: `Role/${idRole}/permissions`,
    message: "Error al obtener datos de roles",
    enabled: Boolean(idRole),
  });

  useEffect(() => {
    if (roleWithPermission && isEditing) {
      reset({
        role: {
          name: roleWithPermission.name,
          description: roleWithPermission.description,
        },
        permissions: roleWithPermission.permissions,
      });
    }
  }, [reset, roleWithPermission, idRole]);

  // console.log(roleWithPermission);

  const { post } = usePost<RoleWithPermissionsFormValues, unknown>({
    url: "Role/createWithPermissions",
    setOpenModal: modalFormRole.close,
    queryKeyToInvalidate: [["role"]],
  });

  const { update } = useUpdate<RoleWithPermissionsFormValues, unknown>({
    method: "PATCH",
    url: `Role/${idRole}/updateWithPermissions`,
    successMessage: "Role actualizado con éxito",
    setOpenModal: modalFormRole.close,
    queryKeyToInvalidate: [["role"]],
  });

  const onSubmit = (data: RoleWithPermissionsFormValues) => {
    isEditing ? update(data) : post(data);
    console.log(data);
  };

  if (isEditing && !roleWithPermission) return null;

  return (
    <Modal
      openModal={modalFormRole.isOpen}
      setOpenModal={closeModal}
      classNames="p-0 !h-3/4 !w-3/4 overflow-hidden"
    >
      {hasPermission(isEditing ? "Actualizar Rol" : "Crear Rol") ? (
        <form
          className="grid grid-rows-1 h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-2 w-full">
            <section className="grid gap-4 p-4 w-[30%] h-fit">
              <span className="border-b border-gray-200 dark:border-dark-fourth pb-3">
                <h2 className="text-normal font-semibold dark:text-white">
                  {isEditing ? "Editar Rol" : "Crear nuevo Rol"}
                </h2>
                <p className="text-small text-gray-500 dark:text-gray-300">
                  Define la información básica del rol
                </p>
              </span>

              <Input
                forInput="roleName"
                label="Nombre del Rol"
                placeholder="Ejemplo: Administrador"
                maxLength={20}
                errors={getError(errors, "role.name")}
                {...register("role.name")}
              />
              <Input
                forInput="roleDescription"
                label="Descripción del Rol"
                placeholder="Describe las responsabilidades y caracteríasticas de este rol"
                maxLength={100}
                errors={errors.role?.description}
                {...register("role.description")}
              />

              <div className="bg-[#EDFAF9] dark:bg-dark border dark:border-none border-[#baf9f3] p-4 rounded-lg">
                <span className="text-small text-gray-500 dark:text-gray-300 font-bold">
                  VISTA PREVIA
                </span>
                <PreviewWatched control={control} />
              </div>
            </section>

            <section className="bg-background dark:bg-dark p-4 rounded-md border-l dark:border-none border-gray-100 w-[70%] h-full  grid gap-4 overflow-hidden">
              <span className="border-b border-gray-300 dark:border-dark-fourth pb-3">
                <h2 className="text-normal font-semibold dark:text-white">
                  {isEditing ? "Editar" : "Asignar"} Permisos
                </h2>
                <p className="text-small text-gray-500 dark:text-gray-300">
                  Define los permisos del rol (pueden ser modificados en el
                  futuro)
                </p>
                {/* <Input
                forInput="searchPermissions"
                placeholder="Buscar permisos..."
                /> */}
              </span>
              <div className="grid gap-6 size-full overflow-y-scroll pr-1">
                {errors && (
                  <p className="text-red-500 text-small mt-1">
                    {errors.permissions?.message}
                  </p>
                )}
                {rolePermissions?.map((rolePermission, index) => (
                  <div
                    className="grid border-b border-gray-200 dark:border-dark-fourth pb-4 transition-colors"
                    key={index}
                  >
                    <span className="text-normal font-semibold dark:text-white">
                      {rolePermission.key}
                    </span>
                    <section className="grid grid-cols-3 gap-4 ">
                      {rolePermission.permissions.map((permission, index) => (
                        <article
                          key={index}
                          className="bg-white dark:bg-dark-tertiary flex items-start gap-3 p-2 rounded-lg border dark:border-none border-gray-200 hover:bg-blue-50 dark:hover:bg-dark-fourth hover:border-blue transition-colors"
                        >
                          <input
                            id={permission.id}
                            type="checkbox"
                            value={permission.id}
                            className="mt-2"
                            {...register("permissions")}
                          />
                          <label
                            htmlFor={permission.id}
                            className="flex-1 cursor-pointer text-small font-bold dark:text-white"
                          >
                            <span className="font-bold text-small">
                              {permission.name}
                            </span>
                            <p className="text-tiny text-gray-600 dark:text-gray-400">
                              {permission.description}
                            </p>
                          </label>
                        </article>
                      ))}
                    </section>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="flex gap-4 mt-4">
            <Button
              className="bg-transparent dark:bg-dark-tertiary text-black dark:text-white border dark:border-none border-back"
              children="Cancelar"
              onClick={() => modalFormRole.close()}
              type="button"
              disabled={isSubmitting}
            />
            <Button children="Guardar" disabled={isSubmitting} />
          </div>
        </form>
      ) : (
        <NoPermission />
      )}
    </Modal>
  );
}

export default CreateRoleModal;

function PreviewWatched({ control }: { control: Control<any> }) {
  const name = useWatch({
    control,
    name: "role.name",
    defaultValue: "Nuevo Rol",
  });

  const description = useWatch({
    control,
    name: "role.description",
    defaultValue: "Descripción del rol",
  });

  const selectedPermissions = useWatch({
    control,
    name: "permissions",
    defaultValue: [],
  });

  const countPermission = selectedPermissions.length;
  // console.log(countPermission);

  return (
    <div>
      <h2 className="text-normal font-bold dark:text-white">{name}</h2>
      <p className="text-small text-gray-500 dark:text-gray-300">
        {description}
      </p>
      <div className="w-full border-b border-gray-200 dark:border-dark-fourth my-2"></div>
      <span className="text-green-800 dark:text-green-500 text-small font-medium">
        {countPermission} Permisos seleccionados
      </span>
    </div>
  );
}
