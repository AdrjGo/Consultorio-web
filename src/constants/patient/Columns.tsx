// import { Button } from "@components/ui";
import type { PatientType } from "@types";
import { calculateAge } from "@utils";
// import { Eye, PencilLine, Trash } from "lucide-react";

export const columns = [
  {
    key: "name",
    label: "Nombre Completo",
    render: (patient: PatientType) => (
      <span
        className={`font-medium ${patient.state === "ACTIVE" ? "" : "text-red-500"
          }`}
      >
        {patient.patientPerson.name} {patient.patientPerson.lastName}
      </span>
    ),
  },
  {
    key: "ci",
    label: "CI",
    render: (patient: PatientType) => `${patient.patientPerson.ci}`,
  },
  { key: "nit", label: "NIT", render: (patient: PatientType) => patient.nit },
  {
    key: "phone",
    label: "Teléfono",
    render: (patient: PatientType) => patient.patientPerson.phone,
  },
  {
    key: "age",
    label: "Edad",
    render: (patient: PatientType) =>
      calculateAge(patient?.patientPerson.birthDate),
  },
  {
    key: "birthDate",
    label: "F. Nacimiento",
    render: (patient: PatientType) => patient.patientPerson.birthDate,
  },
  {
    key: "responsible",
    label: "Responsable",
    render: (patient: PatientType) => (
      <span
        className={`p-1.5 rounded-full font-semibold ${patient?.responsible
          ? "text-[#16a34a] bg-green-100"
          : "text-gray-500 bg-gray-200"
          }`}
      >
        {patient?.responsible
          ? `${patient.responsible.person.name} ${patient.responsible.person.lastName}`
          : "Mayor de edad"}
      </span>
    ),
  },
  // {
  //   key: "actions",
  //   label: "Acciones",
  //   render: () => (
  //     <div className="[&>button]:w-fit [&>button]:bg-transparent [&>button]:hover:bg-gray-200 flex gap-2 justify-center">
  //       <Button children={<Eye className="size-4 text-blue-600" />} />
  //       <Button
  //         className="max-md:hidden"
  //         children={<PencilLine className="size-4 text-gray-600" />}
  //       />
  //       <Button
  //         className="max-md:hidden"
  //         children={<Trash className="size-4 text-red-600" />}
  //       />
  //     </div>
  //   ),
  // },
];
