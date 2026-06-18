import { PageWrapper } from "@components/layout/PageWrapper";
import {
  Button,
  Filters,
  FormContact,
  FormPerson,
  FormResponsable,
  Modal,
  NoPermission,
  PatientFormMemo,
  TableMemo,
} from "@components/ui";
import { columns } from "@constants";
import { defaultValuesPatient } from "@features";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useDelete, useGet, useModal, usePost, useUpdate } from "@hooks";
import { getToken, Toast } from "@utils";
import { API_URL } from "@config";
import { patientSchema, type PatientFormValues } from "@schemas";
import { useResponsibleStore } from "@store";
import type { Pagination, PatientType } from "@types";
import {
  getUrlParams,
  hasPermission,
  isMobile,
  parseDate,
  setUrlParams,
} from "@utils";
import { RotateCcw, UserRoundPlus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Outlet, useParams } from "react-router";
import { useDebounce } from "use-debounce";

function Patients({ tab }: { tab: string }) {
  const [page, setPage] = useState(1);
  const [name, setName] = useState(getUrlParams({ name: "search" }) || "");
  const [debouncedName] = useDebounce(name, 750);
  const [state, setState] = useState<string>(
    getUrlParams({ name: "state" }) || "active",
  );
  const [activeTab, setActiveTab] = useState(1);
  const [isEditing, setIsEditing] = useState(false);

  const modal = useModal();
  const { responsible, setResponsible } = useResponsibleStore();

  const { data } = useGet<Pagination<PatientType>>({
    key: ["patient", page, state, debouncedName],
    urlEndpoint: `Patient?pageNumber=${page}&search=${debouncedName}&state=${state}`,
    message: "Error al obtener datos de paciente",
  });

  const patientId = getUrlParams({ name: "patientId" });

  const { data: patient } = useGet<PatientType>({
    key: ["patient", patientId ?? ""],
    urlEndpoint: `Patient/${patientId}/data`,
    message: "Error al obtener datos de paciente",
    enabled: patientId ? true : false,
  });

  const { register, handleSubmit, reset, control } = useForm<PatientFormValues>(
    {
      mode: "onBlur",
      resolver: zodResolver(patientSchema),
      defaultValues: defaultValuesPatient(responsible),
    },
  );

  const { post, isPending: isPosting } = usePost<PatientFormValues, unknown>({
    url: `Patient`,
    setOpenModal: modal.close,
    queryKeyToInvalidate: ["patient"],
  });

  const { update, isPending: isUpdating } = useUpdate<PatientFormValues, unknown>({
    method: "PATCH",
    url: `Patient/${patientId}`,
    successMessage: "Cita actualizada con éxito",
    setOpenModal: modal.close,
    queryKeyToInvalidate: ["patient"],
  });

  const isSaving = isPosting || isUpdating;

  const onSubmit = (data: PatientFormValues) => {
    isEditing ? update(data) : post(data);
  };

  const tabs = useMemo(
    () => [
      {
        value: 1,
        label: "Datos Personales",
        content: (
          <FormPerson register={register} control={control} field="person" />
        ),
      },
      {
        value: 2,
        label: "Contacto",
        content: <FormContact register={register} control={control} />,
      },
      {
        value: 3,
        label: "Responsable",
        content: (
          <FormResponsable
            register={register}
            control={control}
            field="responsible.person"
          />
        ),
      },
    ],
    [register, control, responsible],
  );

  const handleEdit = (id: string) => {
    // console.log(patient)
    setUrlParams({ name: "patientId", value: id });
    setActiveTab(1);
    setIsEditing(true);
    modal.open();
  };

  useEffect(() => {
    if (patient) {
      // console.log(patient)
      setResponsible(patient.responsible != null);
      reset({
        address: patient.address,
        zone: patient.zone,
        city: patient.city,
        homePhone: patient.homePhone,
        occupation: patient.occupation,
        placeOccupation: patient.placeOccupation,
        sender: patient.sender,
        nit: patient.nit,
        person: {
          name: patient.patientPerson.name,
          lastName: patient.patientPerson.lastName,
          birthDate: parseDate(patient.patientPerson.birthDate),
          sex: patient.patientPerson.sex,
          profession: patient.patientPerson.profession,
          phone: patient.patientPerson.phone,
          ci: patient.patientPerson.ci,
          email: patient.patientPerson.email,
        },
        responsible:
          patient.responsible != null
            ? {
                parentage: patient.responsible.parentage,
                person: {
                  name: patient.responsible.person.name,
                  lastName: patient.responsible.person.lastName,
                  birthDate: parseDate(patient.responsible.person.birthDate),
                  sex: patient.responsible.person.sex,
                  profession: patient.responsible.person.profession,
                  phone: patient.responsible.person.phone,
                  ci: patient.responsible.person.ci,
                  email: patient.responsible.person.email,
                },
              }
            : null,
      });
    }
  }, [patient]);

  // const columnsInMobile = [0, 3, 4, 7];
  // const filteredColumns = useMemo(() => {
  //   return isMobile ? columnsInMobile.map((i) => columns[i]) : columns;
  // }, [isMobile]);

  const handleNewPatient = useCallback(() => {
    setActiveTab(1);
    setResponsible(false);
    setIsEditing(false);
    reset(defaultValuesPatient(responsible));
    modal.open();
  }, [reset]);

  const { id } = useParams<{ id: string }>();

  const { deleteItem, isDeleting } = useDelete({
    url: (id: string) => `Patient/${id}`,
  });

  const handleDelete = (id: string) => {
    deleteItem(id);
  };

  const queryClient = useQueryClient();
  const [isRestoring, setIsRestoring] = useState(false);
  const handleRestore = async (id: string) => {
    setIsRestoring(true);
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/Patient/${id}/restore`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      Toast.success("Paciente restaurado");
      queryClient.invalidateQueries({ queryKey: ["patient"] });
    } catch (err: any) {
      Toast.error(err.message);
    } finally {
      setIsRestoring(false);
    }
  };

  const closeModal = () => {
    setUrlParams({ name: "patientId", value: "" });
    modal.close();
  };

  // console.log(isMobile);

  return (
    <>
      {!id ? (
        <PageWrapper
          tab={tab}
          title="Pacientes"
          desc="Gestiona la información de todos los pacientes"
          extraComponent={
            hasPermission("Crear Paciente") && (
              <Button
                className="text-small text-white! px-5 bg-green "
                onClick={() => handleNewPatient()}
              >
                <UserRoundPlus className="size-4 mr-2" />
                Agregar Paciente
              </Button>
            )
          }
        >
          <section className="bg-white dark:bg-dark-secondary border dark:border-none border-gray-200 rounded-lg p-3 md:p-5 md:w-full max-md:mb-4">
            <Filters
              title="Lista de Pacientes"
              description="Todos los pacientes registrados en el sistema"
              setName={setName}
              setState={setState}
              state={state}
              name={name}
            />
            <TableMemo
              viewButton={hasPermission("Leer Paciente")}
              editButton={hasPermission("Actualizar Paciente")}
              deleteButton={(row: PatientType) =>
                row.state === "ACTIVE" && hasPermission("Eliminar Paciente")
              }
              textButton={!isMobile}
              handleDelete={(id: string) => handleDelete(id)}
              isDeleting={isDeleting}
              deleteTitle="Eliminar Paciente"
              deleteDesc="El paciente cambiará de estado a Inactivo"
              columns={columns}
              data={data?.items || []}
              className={`[&>thead>tr>th]:nth-last-[1]:text-center`}
              setPage={setPage}
              pagination={data}
              handleEdit={handleEdit}
              urlPageEdit={`/odis/patients/patient-profile`}
              customButtons={(row: PatientType) =>
                row.state !== "ACTIVE" && hasPermission("Actualizar Paciente") ? (
                  <Button
                    className="text-green-600! dark:text-green-400! dark:bg-green-500/10!"
                    disabled={isRestoring}
                    onClick={() => handleRestore(row.id)}
                  >
                    <RotateCcw className="size-4" />
                    {isMobile ? "" : "Restaurar"}
                  </Button>
                ) : undefined
              }
            />
          </section>

          <Modal
            classNames="md:w-[50svw]! w-full"
            openModal={modal.isOpen}
            setOpenModal={closeModal}
            title={isEditing ? "Editar Paciente" : "Agregar Paciente Nuevo"}
            desc="Completa los datos del paciente. Los campos marcados con * son obligatorios."
            onClickOutside={() =>
              setUrlParams({ name: "patientId", value: "" })
            }
          >
            {hasPermission(
              isEditing ? "Actualizar Paciente" : "Crear Paciente",
            ) ? (
              <PatientFormMemo
                key={patientId ?? "new"}
                isSaving={isSaving}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                tabs={responsible ? tabs : tabs.slice(0, 2)}
                responsible={responsible}
              />
            ) : (
              <NoPermission />
            )}
          </Modal>
        </PageWrapper>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default Patients;
