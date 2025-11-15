import { PageWrapper } from "@components/layout/PageWrapper";
import {
  Button,
  Filters,
  FormContact,
  FormPerson,
  FormResponsable,
  Modal,
  PatientFormMemo,
  TableMemo,
} from "@components/ui";
import { columns } from "@constants";
import { defaultValuesPatient } from "@features";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDelete, useGet, useModal, usePost, useUpdate } from "@hooks";
import { patientSchema, type PatientFormValues } from "@schemas";
import type { Pagination, PatientType } from "@types";
import { getUrlParams, isMobile, parseDate, setUrlParams } from "@utils";
import { UserRoundPlus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Outlet, useParams } from "react-router";
import { useDebounce } from "use-debounce";

function Patients({ tab }: { tab: string }) {
  const [page, setPage] = useState(1);
  const [name, setName] = useState(getUrlParams({ name: "search" }) || "");
  const [debouncedName] = useDebounce(name, 750);
  const [state, setState] = useState<string>(getUrlParams({ name: "state" }) || "active");
  const [activeTab, setActiveTab] = useState(1);
  const [responsible, setResponsible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const modal = useModal();

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PatientFormValues>({
    mode: "onBlur",
    resolver: zodResolver(patientSchema),
    defaultValues: defaultValuesPatient(responsible),
  });

  const { post } = usePost<PatientFormValues, unknown>({
    url: `Patient`,
    setOpenModal: modal.close,
  });

  const { update } = useUpdate<PatientFormValues, unknown>({
    method: "PATCH",
    url: `Patient/${patientId}`,
    successMessage: "Cita actualizada con éxito",
    setOpenModal: modal.close,
  });

  const onSubmit = (data: PatientFormValues) => {
    isEditing ? update(data) : post(data);
    console.log(data);
  };

  const tabs = useMemo(() => [
    {
      value: 1,
      label: "Datos Personales",
      content: <FormPerson register={register} errors={errors} field="person" />,
    },
    {
      value: 2,
      label: "Contacto",
      content: <FormContact register={register} errors={errors} />,
    },
    {
      value: 3,
      label: "Responsable",
      content: <FormResponsable register={register} errors={errors} field="responsible.person" responsible={responsible} setResponsible={setResponsible} />,
    },
  ], [register, errors]);

  const handleEdit = (id: string) => {
    // console.log(patient)
    setUrlParams({ name: "patientId", value: id });
    setActiveTab(1);
    setIsEditing(true);
    modal.open()
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
        responsible: patient.responsible != null ? {
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
        } : null,
      });
    }
  }, [patient]);

  const columnsInMobile = [0, 3, 4, 7];
  const filteredColumns = useMemo(() => {
    return isMobile ? columnsInMobile.map((i) => columns[i]) : columns;
  }, [isMobile]);

  const handleNewPatient = useCallback(() => {
    setActiveTab(1);
    setIsEditing(false);
    reset(defaultValuesPatient(responsible));
    modal.open()
  }, [reset]);

  const { id } = useParams<{ id: string }>();


  // const { deleteItem } = useDelete({
  //   url: `Patient/${id}`,
  //   successMessage: "Cita eliminada con éxito",
  //   setOpenModal: modal.close,
  // });

  // const handleDelete = (id: string) => {
  //   setUrlParams({ name: "patientId", value: id });
  //   deleteItem({ state: "INACTIVE" });
  // }

  return (
    <>
      {
        !id ? (
          <PageWrapper
            tab={tab}
            title="Pacientes"
            desc="Gestiona la información de todos los pacientes"
            extraComponent={
              <Button
                className="text-small text-white! px-5 bg-green "
                onClick={() => handleNewPatient()}
              >
                <UserRoundPlus className="size-4 mr-2" />
                Agregar Paciente
              </Button>
            }
          >
            <section className="bg-white border border-gray-200 rounded-lg p-3 md:p-5 md:w-full w-[93svw] max-md:mb-4">
              <Filters
                title="Lista de Pacientes"
                description="Todos los pacientes registrados en el sistema"
                setName={setName}
                setState={setState}
                state={state}
                name={name}
              />
              <TableMemo
                viewButton
                editButton
                deleteButton
                // handleDelete={handleDelete}
                deleteTitle="Eliminar Paciente"
                deleteDesc="El paciente cambiará de estado a Inactivo"
                columns={filteredColumns}
                data={data?.items || []}
                className={`[&>thead>tr>th]:nth-last-[1]:text-center`}
                setPage={setPage}
                pagination={data}
                handleEdit={handleEdit}
                urlPageEdit={`/odis/patients/patient-profile`}
              />
            </section>

            <Modal
              classNames="md:w-[50svw]! w-full"
              openModal={modal.isOpen}
              setOpenModal={modal.close}
              title={isEditing ? "Editar Paciente" : "Agregar Paciente Nuevo"}
              desc="Completa los datos del paciente. Los campos marcados con * son obligatorios."
              onClickOutside={() => setUrlParams({ name: "patientId", value: "" })}
            >
              <PatientFormMemo
                key={patientId ?? "new"}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                tabs={responsible ? tabs : tabs.slice(0, 2)}
                responsible={responsible}
                setResponsible={setResponsible}
              />
            </Modal>
          </PageWrapper>
        ) : (<Outlet />)
      }

    </>
  );
}

export default Patients;
