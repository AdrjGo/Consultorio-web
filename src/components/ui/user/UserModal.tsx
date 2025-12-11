import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Modal from "@components/ui/Modal";
import FormUserPerson from "@components/ui/user/FormUserPerson";
import { Eye, EyeClosed, Save } from "lucide-react";

type UserModalProps = {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  modal: any;
  handleSubmit: any;
  onSubmit: any;
  register: any;
  errors: any;
  viewPassword: boolean;
  setViewPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserModal = ({
  isEditing,
  userId,
  modal,
  handleSubmit,
  onSubmit,
  register,
  errors,
  viewPassword,
  setViewPassword,
}: UserModalProps) => {
  return (
    <Modal
      title={isEditing ? "Editar Usuario" : "Nuevo usuario"}
      desc="Completa los datos del nuevo usuario"
      openModal={modal.isOpen}
      setOpenModal={modal.close}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        key={userId ?? "newUser"}
        className="flex flex-col gap-3"
      >
        <span className="font-bold text-small">Datos Personales</span>
        <FormUserPerson register={register} errors={errors} field="person" />
        {!isEditing && (
          <div>
            <span className="font-bold text-small">Credenciales de Acceso</span>
            <div className="flex">
              <Input
                forInput="password"
                type={viewPassword ? "text" : "password"}
                placeholder="Ingresa una contraseña segura"
                label="Contraseña*"
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
                errors={errors.password}
                {...register("password")}
              />
            </div>
            <span className="text-tiny text-gray-400">
              Mínimo 8 caracteres con mayusculas, números y caracteres
              especiales
            </span>
          </div>
        )}
        <Button>
          <Save className="size-4" />{" "}
          {isEditing ? "Actualizar usuario" : "Crear usuario"}
        </Button>
      </form>
    </Modal>
  );
};

export default UserModal;
