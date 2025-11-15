import Input from "@components/ui/Input"
import type { PatientType } from "@types"
import { BriefcaseBusiness, Building, FileText, MapPin, PhoneCall, User } from "lucide-react"

const Fieldset = ({ children }: { children: React.ReactNode }) => {
    return (
        <fieldset className="border border-gray-400 rounded p-3 grid md:grid-cols-3 gap-3 place-items-start">
            {children}
        </fieldset>
    )
}

function PersonaData({ patientInfo }: { patientInfo: PatientType | undefined }) {
    const patientData = [
        {
            title: "Datos Personales", icon: <FileText className="text-blue-500 size-4" />, data: [
                { forInput: "patientName", label: "Nombre", value: patientInfo?.patientPerson.name },
                { forInput: "patientLastName", label: "Apellido", value: patientInfo?.patientPerson.lastName },
                { forInput: "patientBirthDate", label: "Fecha de nacimiento", value: patientInfo?.patientPerson.birthDate },
                { forInput: "patientCi", label: "Cédula de identidad", value: patientInfo?.patientPerson.ci },
                { forInput: "patientNit", label: "NIT", value: patientInfo?.nit },
                { forInput: "patientGender", label: "Género", value: patientInfo?.patientPerson.sex === "FEMALE" ? "Femenino" : "Masculino" },
            ]
        },
        {
            title: "Contacto", icon: <PhoneCall className="text-green-500 size-4" />, data: [
                { forInput: "patientPhone", label: "Celular", value: patientInfo?.patientPerson.phone },
                { forInput: "patientHomePhone", label: "Teléfono", value: patientInfo?.homePhone },
                { forInput: "patientEmail", label: "Email", value: patientInfo?.patientPerson.email }
            ]
        },
        {
            title: "Dirección", icon: <MapPin className="text-red-500 size-4" />, data: [
                { forInput: "patientAddress", label: "Dirección completa", value: patientInfo?.address },
                { forInput: "patientZone", label: "Zona", value: patientInfo?.zone },
                { forInput: "patientCity", label: "Ciudad", value: patientInfo?.city },
            ]
        },
        {
            title: "Información laboral/ocupación", icon: <BriefcaseBusiness className="text-purple-500 size-4" />, data: [
                { forInput: "patientProfession", label: "Profesión", value: patientInfo?.patientPerson.profession },
                { forInput: "patientOccupation", label: "Ocupación", value: patientInfo?.occupation },
                { forInput: "patientPlaceOccupation", label: "Lugar de trabajo/ocupación", value: patientInfo?.placeOccupation },
            ]
        },
        {
            title: "información Administrativa", icon: <Building className="text-orange-500 size-4" />, data: [
                { forInput: "patientSender", label: "Remitente/Referencia", value: patientInfo?.sender },
                { forInput: "patientCreatedAt", label: "Fecha de Registro", value: patientInfo?.createdAt },
                { forInput: "patientCreatedBy", label: "Usuario registador", value: patientInfo?.createdBy },
                { forInput: "patientUpdatedAt", label: "Fecha de Actualización", value: patientInfo?.updatedAt },
                { forInput: "patientUpdatedBy", label: "Usuario actualizador", value: patientInfo?.updatedBy },
            ]
        }
    ]

    return (
        <section className="bg-white border border-gray-200 rounded-md p-4 flex flex-col max-md:max-h-[68dvh]">
            <div>
                <h3 className="text-normal font-bold">Información Personal</h3>
                <span className="text-small text-gray-500 mb-2">Información completa del paciente</span>
            </div>

            <div className="flex-1 overflow-y-auto grid md:grid-cols-2 md:gap-x-6 gap-y-3">
                {
                    patientInfo?.responsible !== null && (
                        <Fieldset key="responsible">
                            <legend className="text-normal font-bold mb-2 flex gap-1 items-center">
                                <User className="text-yellow-600 size-4" /> Responsable del menor
                            </legend>
                            {[
                                { forInput: "responsibleParentage", label: "Parentesco", value: patientInfo?.responsible?.parentage },
                                { forInput: "responsibleName", label: "Nombre", value: patientInfo?.responsible?.person.name },
                                { forInput: "responsibleLastName", label: "Apellido", value: patientInfo?.responsible?.person.lastName },
                                { forInput: "responsibleBirthDate", label: "Fecha de nacimiento", value: patientInfo?.responsible?.person.birthDate },
                                { forInput: "responsiblePhone", label: "Teléfono", value: patientInfo?.responsible?.person.phone },
                                { forInput: "responsibleEmail", label: "Email", value: patientInfo?.responsible?.person.email },
                                { forInput: "responsibleCi", label: "Cédula de identidad", value: patientInfo?.responsible?.person.ci },
                                { forInput: "responsibleProfession", label: "Profesión", value: patientInfo?.responsible?.person.profession },
                                { forInput: "responsibleGender", label: "Género", value: patientInfo?.responsible?.person.sex === "FEMALE" ? "Femenino" : "Masculino" },
                            ].map(({ label, value, forInput }) => (
                                <Input key={label} forInput={forInput} label={label} value={value ?? "Sin información"} disabled />
                            ))}
                        </Fieldset>
                    )
                }
                {
                    patientData.map(({ title, icon, data }, index) => (
                        <Fieldset key={index}>
                            <legend className="text-normal font-bold mb-2 flex gap-1 items-center">{icon} {title}</legend>
                            {data.map(({ label, value, forInput }, index) => (
                                <Input key={index} forInput={forInput} label={label} value={value ?? "Sin información"} disabled />
                            ))}
                        </Fieldset>
                    ))
                }
            </div>
        </section>
    )
}

export default PersonaData