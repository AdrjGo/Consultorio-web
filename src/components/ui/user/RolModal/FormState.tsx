import Button from "@components/ui/Button";
import Select from "@components/ui/Select"
import { useUpdate } from "@hooks";
import type { StateFormValues } from "@schemas";
import type { ModalState } from "@types";
import { Save } from "lucide-react";
import { useFormContext } from "react-hook-form";

type FormStateProps = {
    userId: string | null;
    modalSecurity: ModalState;
};

function FormState({ userId, modalSecurity }: FormStateProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useFormContext<StateFormValues>();

    const { update, isPending } = useUpdate<StateFormValues, unknown>({
        method: "PATCH",
        url: `User/${userId}/state`,
        setOpenModal: modalSecurity.close,
        queryKeyToInvalidate: ["users"],
    });

    // console.log(userId)

    const onSubmit = (data: StateFormValues) => {
        const body = { state: data.state };
        update(body);
        // console.log(body)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
            <Select
                containerClassName="w-full"
                forSelect="state"
                label="Estado del usuario"
                options={["Activo", "Inactivo"]}
                values={["ACTIVE", "INACTIVE"]}
                {...register("state")}
            />
            {errors.state && (
                <p className="text-red-500 text-small mt-1">{errors.state.message}</p>
            )}
            <Button disabled={isPending}>
                <Save className="size-4" /> {isPending ? "Guardando..." : "Cambiar Estado"}
            </Button>
        </form>
    )
}

export default FormState