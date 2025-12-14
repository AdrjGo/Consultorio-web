/* Componentes UI */
import Input from "./Input";
import Button from "./Button";
import Sidebar from "./sidebar/Sidebar";
import Modal from "./Modal";
import Select from "./Select";
import { CustomTabs } from "./form/CustomTabs";
import Filters from "@components/ui/patient/Filters";

/* Componentes UI - Calendario */
import TodayAppoinmentCard from "./calendar/TodayAppoinmentCard";
import { TableMemo } from "./table/Table";
import Pagination from "./table/Pagination";
import DataList from "./ComboBox";
import AppointmentForm from "./calendar/AppointmentForm";

/* Componentes UI - Patientes */
import FormPerson from "@components/ui/patient/person/FormPerson";
import FormContact from "@components/ui/patient/FormContact";
import FormResponsable from "@components/ui/patient/FormResponsable";
import { PatientFormMemo } from "@components/ui/patient/PatientForm";
import Personalata from "@components/ui/patient/profile/PersonaData";
import FormUserPerson from "@components/ui/user/FormUserPerson";

/* Componentes UI - Usuarios */
import UserModal from "@components/ui/user/UserModal";
import InputFile from "@components/ui/InputFile";
import FormRoles from "@components/ui/user/RolModal/FormRoles";
import FormState from "@components/ui/user/RolModal/FormState";

/* Componentes UI - Configuración */
import DentalOffice from "@components/ui/config/DentalOffice";
import RolePermission from "@components/ui/config/RolePermission";
import CreateRolModal from "@components/ui/config/RolePersmissonModal/CreateRoleModal";
import DynamicForm from "@components/ui/config/DynamicForm";
import FormModal from "@components/ui/config/FormModal/FormModal";
import GeneralHistory from "@components/ui/patient/profile/GeneralHistory";

export {
  Input,
  Button,
  Sidebar,
  Modal,
  Select,
  TodayAppoinmentCard,
  TableMemo,
  Pagination,
  DataList,
  AppointmentForm,
  FormPerson,
  CustomTabs,
  FormContact,
  FormResponsable,
  PatientFormMemo,
  Filters,
  Personalata,
  FormUserPerson,
  UserModal,
  DentalOffice,
  InputFile,
  FormRoles,
  FormState,
  RolePermission,
  CreateRolModal,
  DynamicForm,
  FormModal,
  GeneralHistory,
};
