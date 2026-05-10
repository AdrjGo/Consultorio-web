/* Componentes UI */
import Input from "./Input";
import Button from "./Button";
import Sidebar from "./sidebar/Sidebar";
import Modal from "./Modal";
import Select from "./Select";
import { CustomTabs } from "./form/CustomTabs";
import Filters from "@components/ui/patient/Filters";
import DeleteModal from "@components/ui/DeleteModal";
import NoForm from "@components/ui/NoForm";
import ToggleThemeButton from "@components/ui/ToggleThemeButton";
import NoPermission from "@components/ui/NoPermission";

/* Componentes UI - Calendario */
import TodayAppoinmentCard from "./calendar/TodayAppoinmentCard";
import { TableMemo } from "./table/Table";
import Pagination from "./table/Pagination";
import DataList from "./ComboBox";
import AppointmentForm from "./calendar/AppointmentForm";

/* Componentes UI - Usuarios */
import UserModal from "@components/ui/user/UserModal";
import InputFile from "@components/ui/InputFile";
import FormRoles from "@components/ui/user/RolModal/FormRoles";
import FormState from "@components/ui/user/RolModal/FormState";

/* Componentes UI - Configuración */
import DentalOffice from "@components/ui/config/DentalOffice";
import RolePermission from "@components/ui/config/RolePermission";
import CreateRolModal from "@components/ui/config/RolePersmissonModal/CreateRoleModal";

/* Componentes UI - Paciente */
import FormPerson from "@components/ui/patient/person/FormPerson";
import FormContact from "@components/ui/patient/FormContact";
import FormResponsable from "@components/ui/patient/FormResponsable";
import { PatientFormMemo } from "@components/ui/patient/PatientForm";
import Personalata from "@components/ui/patient/profile/PersonaData";
import FormUserPerson from "@components/ui/user/FormUserPerson";
import DynamicForm from "@components/ui/config/DynamicForm";
import FormModal from "@components/ui/config/FormModal/FormModal";
import GeneralHistory from "@components/ui/patient/profile/GeneralHistory";
import PretreatmentExam from "@components/ui/patient/profile/PretreatmentExam";
import CreatePretreatmentModal from "@components/ui/patient/CreatePretreatmentModal";
import TreatmentProcessModal from "@components/ui/patient/TreatmentProcessModal";
import ClinicHistory from "@components/ui/patient/profile/ClinicHistory";
import TreatmentSummary from "@components/ui/patient/profile/TreatmentSummary";
import Contracts from "@components/ui/patient/profile/Contracts";
import { AccordionCard } from "@components/ui/patient/AccordionCard";
import Monitoring from "@components/ui/patient/profile/Monitoring";
import MonitoringModal from "@components/ui/patient/MonitoringModal";
import Files from "@components/ui/patient/profile/Files";
import FileCard from "@components/ui/patient/FileCard";
import FileModal from "@components/ui/patient/FileModal";
import Payment from "@components/ui/patient/profile/Payment";
import ContractModal from "@components/ui/config/Contract/ContractModal";
import PaymentModal from "@components/ui/config/Payment/PaymentModal";

export {
  Input,
  Button,
  Sidebar,
  Modal,
  Select,
  NoForm,
  DeleteModal,
  ToggleThemeButton,
  NoPermission,
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
  PretreatmentExam,
  CreatePretreatmentModal,
  TreatmentProcessModal,
  ClinicHistory,
  TreatmentSummary,
  Contracts,
  AccordionCard,
  Monitoring,
  MonitoringModal,
  Files,
  FileCard,
  FileModal,
  Payment,
  ContractModal,
  PaymentModal,
};
