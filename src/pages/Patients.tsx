import { PageWrapper } from "@components/layout/PageWrapper";
import {
  Button,
  FormContact,
  FormPerson,
  FormResponsable,
  Input,
  Modal,
  PatientFormMemo,
  Select,
  TableMemo,
} from "@components/ui";
import { columns, PatientState } from "@constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGet, usePost } from "@hooks";
import { patientSchema, type PatientFormValues } from "@schemas";
import type { Pagination, PatientType } from "@types";
import { getUrlParams, isMobile, setUrlParams } from "@utils";
import dayjs from "dayjs";
import { BrushCleaning, Search, UserRoundPlus } from "lucide-react";
import { use, useEffect, useMemo, useState } from "react";
import { get, useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";

function Patients({ tab }: { tab: string }) {
  const [page, setPage] = useState(1);
  const [name, setName] = useState(getUrlParams({ name: "search" }) || "");
  const [debouncedName] = useDebounce(name, 750);
  const [state, setState] = useState<string>(
    getUrlParams({ name: "state" }) || ""
  );
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [responsible, setResponsible] = useState(false);

  const columnsInMobile = [0, 3, 4, 7];
  const filteredColumns = useMemo(() => {
    return isMobile ? columnsInMobile.map((i) => columns[i]) : columns;
  }, [isMobile]);

  const { data } = useGet<Pagination<PatientType>>({
    key: ["patient", page, state, debouncedName],
    urlEndpoint: `Patient?pageNumber=${page}&search=${debouncedName}&state=${state}`,
    message: "Error al obtener datos de paciente",
  });

  // useEffect(() => {
  //   console.log("Patients renderizado o actualizado");
  // });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PatientFormValues>({
    mode: "onBlur",
    resolver: zodResolver(patientSchema),
    defaultValues: {
      address: "",
      zone: "",
      city: "",
      homePhone: "",
      occupation: "",
      placeOccupation: "",
      sender: "",
      nit: "",
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
      responsible: responsible ? {
        parentage: "",
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
      } : null,
    }
  });

  const { post } = usePost<PatientFormValues, unknown>({
    url: `Patient`,
    setOpenModal: setOpenModal,
  });

  const onSubmit = (data: PatientFormValues) => {
    post(data);
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
    }
  ], [register, errors]);

  console.log(errors)
  console.log(watch())

  return (
    <PageWrapper
      tab={tab}
      title="Pacientes"
      desc="Gestiona la información de todos los pacientes"
      extraComponent={
        <Button
          className="text-small text-white! px-5 bg-green "
          onClick={() => setOpenModal(!openModal)}
        >
          <UserRoundPlus className="size-4 mr-2" />
          Agregar Paciente
        </Button>
      }
    >
      <section className="bg-white border border-gray-200 rounded-lg p-3 md:p-5 md:w-full w-[93svw] mt-6 max-md:mb-4">
        <div className="flex flex-col flex-1">
          <h2 className="text-normal font-bold">Lista de Pacientes</h2>
          <span className="text-small text-gray-500">
            Lista de todos los pacientes registrados
          </span>
          <div className="my-5 flex gap-5">
            <Input
              forInput="nameSearch"
              type="text"
              icon={<Search className="text-gray-400 size-5" />}
              placeholder="Buscar por nombre o apellido..."
              className="w-full flex-1"
              value={name}
              maxLength={22}
              onChange={(e) => {
                setUrlParams({ name: "search", value: e.target.value });
                setName(e.target.value);
              }}
              autoComplete="off"
            />

            <Select
              forSelect="stateFilter"
              optionDefaultText="Todos"
              options={PatientState?.map((s) => s.label)}
              values={PatientState?.map((s) => s.value)}
              onChange={(e) => {
                setUrlParams({ name: "state", value: e.target.value });
                setState(e.target.value);
              }}
            />

            <Button
              className="flex gap-2 size-fit py-2.5"
              onClick={() => {
                setUrlParams({ name: "search", value: "" });
                setUrlParams({ name: "state", value: "" });
                setName("");
                setState("");
              }}
            >
              <BrushCleaning className="size-4" />
              {isMobile ? "" : "Limpiar Filtros"}
            </Button>
          </div>
        </div>

        <TableMemo
          columns={filteredColumns}
          data={data?.items || []}
          className={`[&>thead>tr>th]:nth-last-[1]:text-center`}
          setPage={setPage}
          pagination={data}
        />
      </section>

      <Modal
        classNames="w-[50svw]!"
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="Agregar Paciente Nuevo"
        desc="Completa los datos del paciente. Los campos marcados con * son obligatorios."
      >
        <PatientFormMemo
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          tabs={responsible ? tabs : tabs.slice(0, 2)}
        />
        {activeTab === 1 && (
          <div className="flex gap-2 my-2">
            <input
              type="checkbox"
              id="responsible"
              checked={responsible}
              onChange={() => setResponsible(!responsible)}
            />
            <label htmlFor="responsible" className="text-small">
              El paciente es menor de edad
            </label>
          </div>
        )}
      </Modal>
    </PageWrapper>
  );
}

export default Patients;
