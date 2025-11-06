// Función para obtener el color de un estado de cita
export function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "confirmado":
      return "#16a34a";
    case "programado":
      return "#2563eb";
    case "reprogramado":
      return "#9333ea";
    case "pendiente":
      return "#ca8a04";
    case "cancelado":
      return "#dc2626";
    default:
      return "#9ca3af";
  }
}
