import { Calendar, User, UserRoundCog, Bolt } from "lucide-react";

export const SideTabsManagement = [
  { icon: Calendar, text: "Calendario", to: "/odis/calendar" },
  { icon: User, text: "Pacientes", to: "/odis/patients" },
];

export const SideTabsAdmin = [
  { icon: UserRoundCog, text: "Gestión de usuarios", to: "/odis/users" },
  { icon: Bolt, text: "Configuración", to: "/odis/settings" },
];
