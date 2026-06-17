import { Calendar, User, UserRoundCog, Settings } from "lucide-react";

export const SideTabsManagement = [
  { icon: Calendar, text: "Calendario", to: "/odis/calendar" },
  { icon: User, text: "Pacientes", to: "/odis/patients" },
];

export const SideTabsAdmin = [
  {
    icon: UserRoundCog,
    text: "Gestión de usuarios",
    to: "/odis/user-management",
  },
  { icon: Settings, text: "Configuración", to: "/odis/settings" },
];
