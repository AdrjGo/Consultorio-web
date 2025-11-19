import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import InputFile from "@components/ui/InputFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { dentalOfficeSchema, type DentalOfficeFormValues } from "@schemas";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGet, useModal, usePost, useUpdate } from "@hooks";
import { supabase } from "@store";
import Select from "@components/ui/Select";
import type { clinicType, UserType } from "@types";
import { Toast } from "@utils";
import { set } from "zod";

type Props = {
    children: React.ReactNode;
    title: string;
    description: string;
};

const SectionLayout = ({ children, title, description }: Props) => {
    return (
        <section className="bg-white border border-gray-300 rounded-md p-5 grid gap-4">
            <div>
                <h2 className="text-subtitle font-bold">{title}</h2>
                <p className="text-small text-gray-500">{description}</p>
            </div>
            {children}
        </section>
    );
};

function DentalOffice() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const modal = useModal();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 1000000) {
            Toast.error("El archivo es demasiado grande (máx 1MB)");
            return;
        }

        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const { data: clinic } = useGet<clinicType>({
        key: "clinic",
        urlEndpoint: "Clinic",
        message: "Error al obtener datos de usuario",
    });

    console.log(clinic);

    const { data: users } = useGet<UserType[]>({
        key: ["users", "Admin"],
        urlEndpoint: `User?role=Admin`,
        message: "Error al obtener datos de paciente",
    });

    console.log(users)

    const {
        handleSubmit,
        register,
        reset,
        watch,
        formState: { errors },
    } = useForm<DentalOfficeFormValues>({
        resolver: zodResolver(dentalOfficeSchema),
        defaultValues: {
            name: "",
            address: "",
            phone: "",
            cellPhone: "",
            email: "",
            logoRef: "",
            logoUrl: "https://oxbezrteqsgdufcohcjl.supabase.co/storage/v1/object/public/logo/Logo",
            managerId: "",
        },
    });

    useEffect(() => {
        if (!clinic || !users) return;
        reset({
            name: clinic.name,
            address: clinic.address,
            phone: clinic.phone,
            cellPhone: clinic.cellPhone,
            email: clinic.email,
            logoRef: clinic.logoRef,
            logoUrl: clinic.logoUrl,
            managerId: clinic.managerId ?? "",
        });

    }, [users, clinic, reset]);

    const { post } = usePost<DentalOfficeFormValues, unknown>({
        url: "Clinic/create",
        setOpenModal: modal.close,
    });

    const { update } = useUpdate<DentalOfficeFormValues, unknown>({
        method: "PATCH",
        url: `Clinic/${clinic?.id}`,
        successMessage: "Cita actualizada con éxito",
        setOpenModal: modal.close,
    });

    const onSubmit = async (formData: DentalOfficeFormValues) => {
        try {
            setLoading(true);
            setEdit(false);

            if (selectedFile) {
                const fileName = "Logo";

                const { error: uploadError } = await supabase.storage
                    .from("logo")
                    .upload(fileName, selectedFile, { upsert: true });

                if (uploadError) {
                    const { error: updateError } = await supabase.storage
                        .from("logo")
                        .update(fileName, selectedFile, { upsert: true });

                    if (updateError) throw updateError;
                }
                const { data: publicUrl } = supabase.storage
                    .from("logo")
                    .getPublicUrl(fileName);

                if (publicUrl?.publicUrl) {
                    formData.logoUrl = publicUrl.publicUrl;
                } else {
                    Toast.error("No se pudo obtener el enlace del logo");
                }
            }
            edit ? update(formData) : post(formData);
        } catch (err) {
            // console.error(err);
            Toast.error("Error al guardar los datos");
        } finally {
            setLoading(false);
        }
    };

    const clinicData: boolean = clinic?.name ? !edit : false;

    console.log(watch())

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
            <SectionLayout
                title="Información del Consultorio"
                description="Datos básicos del consultorio"
            >
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        forInput="nameOffice"
                        label="Nombre del Consultorio"
                        placeholder="Consultorio Dental"
                        {...register("name")}
                        errors={errors.name?.message}
                        disabled={clinicData}
                    />
                    <Input
                        forInput="phoneOffice"
                        label="Teléfono del Consultorio"
                        placeholder="446676264"
                        inputMode="numeric"
                        {...register("phone")}
                        errors={errors.phone?.message}
                        disabled={clinicData}
                    />
                    <Input
                        forInput="whatsappOffice"
                        label="Whatsapp del Consultorio"
                        placeholder="75734785"
                        inputMode="numeric"
                        {...register("cellPhone")}
                        errors={errors.cellPhone?.message}
                        disabled={clinicData}
                    />
                    <Input
                        forInput="emailOffice"
                        label="Email del Consultorio"
                        placeholder="consultorio@odis.com"
                        {...register("email")}
                        errors={errors.email?.message}
                        disabled={clinicData}
                    />
                    <Input
                        forInput="addressOffice"
                        label="Dirección del Consultorio"
                        placeholder="Av. de ejemplo, 123"
                        {...register("address")}
                        errors={errors.address?.message}
                        disabled={clinicData}
                    />
                </div>
                <div>
                    <Select
                        forSelect="idManagerOffice"
                        label="Encargado/a del Consultorio"
                        options={users?.map((u) => u.person.name + " " + u.person.lastName)}
                        values={users?.map((u) => u.id)}
                        {...register("managerId")}
                        errors={errors.managerId?.message}
                        disabled={clinicData}
                    />
                </div>
            </SectionLayout>

            <SectionLayout
                title="Logotipo del Consultorio"
                description="Carga y gestiona el logo de tu clínica"
            >
                <InputFile
                    title="Haz click para subir un logo"
                    description="SVG (Max, 1MB - 100x100px)"
                    id="logo"
                    onChange={handleFileChange}
                    disabled={clinicData}
                />
                <span className="text-tiny text-gray-500">
                    La actualización del logo puede tardar unos minutos en quedarse
                    visible dependiendo de los servidres
                </span>
                {/* <Input forInput="localLogoReference" label="URL del Logo (Referencia Local)" placeholder="files/" /> */}
                <Input
                    forInput="cloudLogoReference"
                    label="URL del Logo (Referencia Nube)"
                    placeholder="https://"
                    {...register("logoUrl")}
                    errors={errors.logoUrl?.message}
                    disabled
                />
                <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                    <p className="text-sm font-medium mb-3">Vista Previa del Logo</p>
                    <div className="flex items-center justify-center w-full h-fit bg-white border border-gray-300 rounded">
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Preview logo"
                                className="h-96 object-contain"
                            />
                        ) : (
                            <div className="text-center text-gray-400 my-5">
                                {clinic?.logoUrl ? (
                                    <img
                                        src={clinic.logoUrl}
                                        alt="Preview logo"
                                        className="h-96 object-contain"
                                    />
                                ) : (
                                    <>
                                        <Image className="size-10 mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">Subir imagen para ver preview</p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </SectionLayout>
            <div className="flex gap-4">
                {
                    clinic?.name && (
                        <Button
                            children={`${!edit ? "Editar" : "Salir de editar"}`}
                            type="button"
                            disabled={loading}
                            className="w-full mb-4 bg-white text-black border border-gray-300 rounded-md"
                            onClick={() => {
                                setEdit(!edit)
                                Toast.info(`Edición ${!edit ? "activada" : "desactivada"}`)
                            }}
                        />
                    )
                }
                <Button
                    children={loading ? "Guardando..." : "Guardar Cambios"}
                    disabled={loading}
                    className="w-full mb-4"
                />
            </div>

        </form>
    );
}

export default DentalOffice;
