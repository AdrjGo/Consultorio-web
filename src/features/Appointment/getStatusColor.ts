// Función para obtener el color de un estado de cita
export function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "confirmado":
      return "oklch(79.2% 0.209 151.711)";
    case "programado":
      return "#2563eb";
    case "reprogramado":
      return "#9333ea";
    case "pendiente":
      return "#ca8a04";
    case "cancelado":
      return "#dc2626";
    case "completado":
      return "#00A63E";
    default:
      return "#9ca3af";
  }
}
