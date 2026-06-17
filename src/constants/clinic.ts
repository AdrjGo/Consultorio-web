export const CLINIC_INFO = {
  address: "Calle Mercado #555",
  phone: "445-5666",
  email: "clinica@lipciacatacora.com",
  city: "Cbba - Bolivia",
};

export function formatClinicFooter(): string {
  return [
    CLINIC_INFO.address,
    `Tel. ${CLINIC_INFO.phone}`,
    `e-mail: ${CLINIC_INFO.email}`,
    CLINIC_INFO.city,
  ].join(", ");
}