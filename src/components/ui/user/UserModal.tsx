import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Modal from "@components/ui/Modal";
import NoPermission from "@components/ui/NoPermission";
import FormUserPerson from "@components/ui/user/FormUserPerson";
import type { UserFormValues } from "@schemas";
import type { ModalState } from "@types";
import { hasPermission } from "@utils";
import { Eye, EyeClosed, Save } from "lucide-react";
import { useFormState, type Control } from "react-hook-form";

type UserModalProps = {
  isEditing: boolean;
  isSaving?: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  modal: ModalState;
  handleSubmit: any;
  onSubmit: any;
  register: any;
  viewPassword: boolean;
  control: Control<UserFormValues>;
  setViewPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserModal = ({
  isEditing,
  isSaving,
  userId,
  modal,
  handleSubmit,
  onSubmit,
  control,
  register,
  viewPassword,
  setViewPassword,
}: UserModalProps) => {
  // console.log("formulario renderizado");
  const { errors } = useFormState({
    control,
  });

  return (
    <Modal
      title={isEditing ? "Editar Usuario" : "Nuevo usuario"}
      desc="Completa los datos del nuevo usuario"
      openModal={modal.isOpen}
      setOpenModal={modal.close}
    >
      {hasPermission("Crear Usuario") ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          key={userId ?? "newUser"}
          className="flex flex-col gap-3"
        >
          <span className="font-bold text-small dark:text-white">
            Datos Personales
          </span>
          <FormUserPerson
            register={register}
            control={control}
            field="person"
          />
          {!isEditing && (
            <div>
              <span className="font-bold text-small dark:text-white">
                Credenciales de Acceso
              </span>
              <div className="flex">
                <Input
                  forInput="password"
                  type={viewPassword ? "text" : "password"}
                  placeholder="Ingresa una contraseña segura"
                  label="Contraseña*"
                  maxLength={16}
                  icon={
                    <button
                      type="button"
                      className="text-small bg-transparent w-fit"
                      onClick={() => setViewPassword(!viewPassword)}
                    >
                      {viewPassword ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeClosed className="size-4" />
                      )}
                    </button>
                  }
                  {...register("password")}
                  errors={errors.password}
                />
              </div>
              <span className="text-tiny text-gray-400">
                Mínimo 8 caracteres con mayusculas, números y caracteres
                especiales
              </span>
            </div>
          )}
          <Button disabled={isSaving}>
            <Save className="size-4" />{" "}
            {isSaving ? "Guardando..." : isEditing ? "Actualizar usuario" : "Crear usuario"}
          </Button>
        </form>
      ) : (
        <NoPermission />
      )}
    </Modal>
  );
};

export default UserModal;
