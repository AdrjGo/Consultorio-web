import { PageWrapper } from "@components/layout/PageWrapper";
import { Button, Filters, Modal, TableMemo, UserModal } from "@components/ui";
import RolModal from "@components/ui/user/UserRoleModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGet, useModal, usePost, useUpdate } from "@hooks";
import { userSchema, type UserFormValues } from "@schemas";
import type { UserType } from "@types";
import { getUrlParams, parseDate } from "@utils";
import { ShieldUser, UserStar } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";

function UserManagement({ tab }: { tab: string }) {
  const [name, setName] = useState(getUrlParams({ name: "search" }) || "");
  const [state, setState] = useState<string>(
    getUrlParams({ name: "state" }) || "",
  );
  const [role, setRole] = useState<string>(
    getUrlParams({ name: "role" }) || "",
  );
  const [debouncedName] = useDebounce(name, 750);
  const [viewPassword, setViewPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const { data: users } = useGet<UserType[]>({
    key: ["users", state, debouncedName, role],
    urlEndpoint: `User?search=${debouncedName}&state=${state}&role=${role}`,
    message: "Error al obtener datos de paciente",
  });

  const { data: user } = useGet<UserFormValues>({
    key: ["user", userId ?? ""],
    urlEndpoint: `User/${userId}/data`,
    message: "Error al obtener datos de paciente",
    enabled: userId ? true : false,
  });

  // console.log(users)

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
      render: (user: UserType) =>
        user.roles.map((role: any) => role.name).join(", "),
    },
    {
      key: "Estado",
      label: "Estado",
      render: (user: UserType) => (
        <span
          className={`rounded-full p-1 px-2 font-semibold ${
            user.state === "ACTIVE"
              ? "bg-green-100 text-green-600"
              : "bg-gray-200 dark:bg-dark-tertiary text-gray-500 dark:text-white"
          }`}
        >
          {user.state}
        </span>
      ),
    },
  ];

  const modalUser = useModal();
  const modalSecurity = useModal();

  const defaultValuesUser = (isEditing: boolean) =>
    isEditing
      ? {
          person: {
            name: "",
            lastName: "",
            birthDate: "",
            sex: "",
            profession: "",
            phone: "",
            ci: "",
            email: "",
          },
        }
      : {
          password: "",
          person: {
            name: "",
            lastName: "",
            birthDate: "",
            sex: "",
            profession: "",
            phone: "",
            ci: "",
            email: "",
          },
        };

  const handleNewUser = () => {
    setIsEditing(false);
    reset(defaultValuesUser(isEditing));
    modalUser.open();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: defaultValuesUser(isEditing),
  });

  const { post } = usePost<UserFormValues, unknown>({
    url: "User/create",
    setOpenModal: modalUser.close,
  });

  const { update } = useUpdate<UserFormValues, unknown>({
    method: "PATCH",
    url: `User/${userId}`,
    successMessage: "Cita actualizada con éxito",
    setOpenModal: modalUser.close,
  });

  const onSubmit = (data: UserFormValues) => {
    isEditing ? update(data) : post(data);
  };

  const handleEdit = (id: string) => {
    setUserId(id);
    setIsEditing(true);
    modalUser.open();
  };

  useEffect(() => {
    if (user) {
      reset({
        person: {
          name: user.person.name,
          lastName: user.person.lastName,
          birthDate: parseDate(user.person.birthDate),
          sex: user.person.sex,
          profession: user.person.profession,
          phone: user.person.phone,
          ci: user.person.ci,
          email: user.person.email,
        },
      });
    }
  }, [user]);

  const handleSecurity = (id: string) => {
    setUserId(id);
    setIsEditing(false);
    modalSecurity.open();
  };

  return (
    <PageWrapper
      tab={tab}
      title="Gestiona los usuarios"
      desc="Administra las cuentas del personal clínico"
      extraComponent={
        <Button
          className="text-small text-white! px-5 bg-green"
          onClick={() => handleNewUser()}
        >
          <UserStar className="size-4" />
          Agregar Usuario
        </Button>
      }
    >
      <section className="bg-white dark:bg-dark-secondary border border-gray-200 rounded-lg p-3 md:p-5 md:w-full w-[93svw] max-md:mb-4">
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
          editButton
          // deleteButton
          columns={userColumns}
          data={users || []}
          className={`[&>thead>tr>th]:nth-last-[1]:text-center`}
          handleEdit={handleEdit}
          customButtons={(row) => (
            <Button
              className="max-md:hidden text-green-600"
              onClick={() => handleSecurity(row.id)}
            >
              <ShieldUser className="size-4" /> Seguridad
            </Button>
          )}
        />
      </section>
      {modalUser.isOpen && (
        <UserModal
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          userId={userId}
          setUserId={setUserId}
          modal={modalUser}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          viewPassword={viewPassword}
          setViewPassword={setViewPassword}
        />
      )}

      {modalSecurity.isOpen && (
        <RolModal modalSecurity={modalSecurity} userId={userId} />
      )}
    </PageWrapper>
  );
}

export default UserManagement;
