import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Modal from "@components/ui/Modal";
import { useGet, usePost } from "@hooks";
import type { RoleWithPermissionsFormValues } from "@schemas";
import type { ModalState, RolePermissionsType } from "@types";
import { useForm, useWatch, type Control } from "react-hook-form";

type CreateRolModalProps = {
  modalFormRole: ModalState;
};

function CreateRoleModal({ modalFormRole }: CreateRolModalProps) {
  const {
    handleSubmit,
    register,
    control,
    // watch,
    formState: { errors, isSubmitting },
  } = useForm<RoleWithPermissionsFormValues>();

  const { data: rolePermissions } = useGet<RolePermissionsType[]>({
    key: "roles",
    urlEndpoint: "Permission",
    message: "Error al obtener datos de roles",
  });
  // console.log(watch());

  const { post } = usePost<RoleWithPermissionsFormValues, unknown>({
    url: "Role/createWithPermissions",
    setOpenModal: modalFormRole.close,
  });

  const onSubmit = (data: RoleWithPermissionsFormValues) => {
    post(data);
    console.log(data);
  };

  return (
    <Modal
      openModal={modalFormRole.isOpen}
      setOpenModal={modalFormRole.close}
      classNames="p-0 !h-3/4 !w-3/4 overflow-hidden"
    >
      <form
        className="grid grid-rows-1 h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-2 w-full">
          <section className="grid gap-4 p-4 w-[30%] h-fit">
            <span className="border-b border-gray-200 pb-3">
              <h2 className="text-normal font-semibold">Crear nuevo Rol</h2>
              <p className="text-small text-gray-500">
                Define la información básica del rol
              </p>
            </span>

            <Input
              forInput="roleName"
              label="Nombre del Rol"
              placeholder="Ejemplo: Administrador"
              maxLength={20}
              errors={errors.role?.name}
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

            <div className="bg-[#EDFAF9] border border-[#baf9f3] p-4 rounded-lg">
              <span className="text-small text-gray-500 font-bold">
                VISTA PREVIA
              </span>
              <PreviewWatched control={control} />
            </div>
          </section>

          <section className="bg-[#f9fafb] p-4 border-l border-gray-100 w-[70%] h-full  grid gap-4 overflow-hidden">
            <span className="border-b border-gray-300 pb-3">
              <h2 className="text-normal font-semibold">Asignar Permisos</h2>
              <p className="text-small text-gray-500">
                Define los permisos del nuevo rol (pueden ser modificados)
              </p>
              <Input
                forInput="searchPermissions"
                placeholder="Buscar permisos..."
              />
            </span>
            <div className="grid gap-6 size-full overflow-y-scroll pr-1">
              {rolePermissions?.map((rolePermission, index) => (
                <div
                  className="grid border-b border-gray-200 pb-4 transition-colors"
                  key={index}
                >
                  <span className="text-normal font-semibold">
                    {rolePermission.key}
                  </span>
                  <section className="grid grid-cols-3 gap-4 ">
                    {rolePermission.permissions.map((permission, index) => (
                      <article
                        key={index}
                        className="bg-white flex items-start gap-3 p-2 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue transition-colors"
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
                          className="flex-1 cursor-pointer text-small font-bold"
                        >
                          <span className="font-bold text-small">
                            {permission.name}
                          </span>
                          <p className="text-tiny text-gray-600">
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

        <div className="flex gap-4">
          <Button
            children="Cancelar"
            onClick={() => modalFormRole.close()}
            type="button"
            disabled={isSubmitting}
          />
          <Button children="Guardar" disabled={isSubmitting} />
        </div>
      </form>
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
    name: "rolePermissions",
    defaultValue: [],
  });

  const countPermission = selectedPermissions.length;

  return (
    <div>
      <h2 className="text-normal font-bold">{name}</h2>
      <p className="text-small text-gray-500">{description}</p>
      <div className="w-full border-b border-gray-200 my-2"></div>
      <span className="text-green-800 text-small font-medium">
        {countPermission} Permisos seleccionados
      </span>
    </div>
  );
}
