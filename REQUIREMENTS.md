# 📋 Requisitos Funcionales y Contexto del Proyecto

Este documento resume los requisitos funcionales (RF) y no funcionales (RNF) principales del sistema. Proporciona el contexto de negocio esencial para guiar el desarrollo, priorizando la **Arquitectura Limpia** y el **Modelado DDD** para una gestión de datos sanitarios robusta.

---

## 1. Módulo de Gestión de Usuarios y Roles (Administración)

| ID      | Nombre del Requerimiento | Descripción Clave                                                                                | Entradas Principales                            | Prioridad |
| :------ | :----------------------- | :----------------------------------------------------------------------------------------------- | :---------------------------------------------- | :-------- |
| **RF1** | Crear Usuarios           | Registrar nuevos usuarios con credenciales únicas. **Restringido a administradores.**            | Nombre, Apellido, CI, Correo, Contraseña, etc.  | Alta      |
| **RF2** | Editar Usuarios          | Modificar datos de usuarios existentes. Requiere registro en el sistema de auditoría (**RNF7**). | Nombre, Apellido, CI, Correo, Contraseña, etc.  | Alta      |
| **RF3** | Crear Roles              | Definir nuevos roles con nombre, descripción y lista de permisos asociados.                      | Nombre del Rol, Descripción, Lista de Permisos. | Alta      |
| **RF4** | Asignar Roles            | Vincular roles a usuarios, permitiendo múltiples roles. **Restringido a administradores.**       | Usuario Existente, Rol(es) a Asignar.           | Alta      |

> **RNF Clave:** **RNF2 (Seguridad)** y **RNF7 (Auditabilidad)** son críticos para la gestión de acceso y la trazabilidad de cambios en esta sección.

---

## 2. Módulo de Gestión de Pacientes y Responsables

Esta es la base de datos principal del sistema, y la unicidad y la confiabilidad son esenciales.

| ID      | Nombre del Requerimiento      | Descripción Clave                                                                                                    | Entradas Principales                                     | Prioridad |
| :------ | :---------------------------- | :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- | :-------- |
| **RF5** | Registrar Paciente            | Registrar datos personales y de contacto. Debe validar la **unicidad del CI** para evitar duplicados.                | Nombre, Apellido, CI, Correo, Dirección, Ocupación, etc. | Alta      |
| **RF6** | Registrar Responsable/Tutor   | Registrar datos de tutores legales para pacientes menores, permitiendo asociación 1:N (un tutor a varios pacientes). | Nombre, Apellido, CI, Correo, Parentesco, etc.           | Alta      |
| **RF7** | Actualizar Datos del Paciente | Modificar la información personal del paciente registrado.                                                           | (Mismas entradas que RF5)                                | Alta      |
| **RF8** | Consultar Pacientes           | Visualizar información completa de los pacientes mediante criterios de búsqueda (Nombre o Apellido).                 | Criterios de búsqueda (Nombre o Apellido).               | Alta      |

---

## 3. Módulo de Historial Clínico y Tratamientos

| ID       | Nombre del Requerimiento         | Descripción Clave                                                              | Entradas Clave                                     | Prioridad |
| :------- | :------------------------------- | :----------------------------------------------------------------------------- | :------------------------------------------------- | :-------- |
| **RF9**  | Registrar Historial Clínico      | Registrar antecedentes médicos, diagnósticos, tratamientos y observaciones.    | Datos Clínicos (Preguntas, Examen Bucal, Hábitos). | Alta      |
| **RF10** | Actualizar Historial Clínico     | Modificar información del historial clínico según la necesidad del odontólogo. | (Mismas entradas que RF9)                          | Media     |
| **RF18** | Registrar Tratamiento            | Registrar el plan de tratamiento (Diagnóstico, Objetivo, Plan, Pronóstico).    | Datos del Resumen (Diagnóstico, Plan, Etapas).     | Alta      |
| **RF19** | Actualizar Avance de Tratamiento | Registrar el seguimiento clínico y los avances en cada sesión.                 | Fecha, Nomenclatura, Tratamiento.                  | Alta      |
| **RF20** | Consultar Tratamientos           | Visualizar el estado y progreso de los tratamientos registrados.               | N/A                                                | Alta      |

---

## 4. Módulo de Formularios Dinámicos y Recursos

Este módulo requiere un diseño flexible, idealmente usando una estructura **JSON** para definir la versión del formulario.

| ID       | Nombre del Requerimiento         | Descripción Clave                                                                          | Entradas Clave                                     | Prioridad |
| :------- | :------------------------------- | :----------------------------------------------------------------------------------------- | :------------------------------------------------- | :-------- |
| **RF12** | Crear Formularios Personalizados | Permitir a administradores crear formularios clínicos dinámicos.                           | Nombre, Descripción, Versión, **Estructura JSON**. | Alta      |
| **RF13** | Versionar Formularios            | Mantener la trazabilidad de los cambios en los formularios dinámicos.                      | Id del formulario, Versión, Estructura JSON.       | Alta      |
| **RF14** | Completar Formularios Clínicos   | Llenar y almacenar formularios dinámicos asociados a un paciente y tratamiento específico. | Id Paciente, Id Submódulo, Respuestas.             | Alta      |
| **RF16** | Almacenar Imágenes Clínicas      | Subir y asociar imágenes clínicas al historial del paciente.                               | Formato, Url/Path de Referencia, Descripción.      | Alta      |
| **RF17** | Visualizar Imágenes Clínicas     | Permitir visualizar y gestionar las imágenes asociadas al paciente.                        | N/A                                                | Alta      |

---

## 5. Módulo de Citas y Financiero

| ID       | Nombre del Requerimiento           | Descripción Clave                                                         | Prioridad |
| :------- | :--------------------------------- | :------------------------------------------------------------------------ | :-------- |
| **RF21** | Crear Citas                        | Registrar citas con horarios de inicio y fin, tipo y razón.               | Alta      |
| **RF22** | Modificar Citas                    | Reprogramar citas ajustando la disponibilidad (Calendario).               | Alta      |
| **RF23** | Modificar Estado de Citas          | Cambiar el estado de las citas (ej., Cancelada, Realizada).               | Alta      |
| **RF25** | Registrar Pagos                    | Registrar pagos realizados por el paciente, vinculándolos al tratamiento. | Alta      |
| **RF26** | Calcular Cuotas Pendientes         | Calcular automáticamente los montos pendientes de pago según el contrato. | Alta      |
| **RF27** | Gestionar Contratos de Tratamiento | Crear contratos de tratamiento y presupuesto asociados a cada paciente.   | Alta      |

---

## 6. Módulo de Reportes y Búsqueda

| ID       | Nombre del Requerimiento     | Descripción Clave                                                                                        | Prioridad |
| :------- | :--------------------------- | :------------------------------------------------------------------------------------------------------- | :-------- |
| **RF28** | Generar Reportes Clínicos    | Generar reportes (historial, tratamientos) en formato **PDF**.                                           | Alta      |
| **RF29** | Generar Reportes Financieros | Generar reportes (pagos, cuotas, estados de cuenta) en formato **PDF**.                                  | Alta      |
| **RF30** | Buscar Información           | Buscar y filtrar información de pacientes, citas, tratamientos o pagos mediante criterios configurables. | Media     |

---
