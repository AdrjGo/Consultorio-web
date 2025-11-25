## 1. Disciplina Arquitectónica

La arquitectura actual del proyecto sigue los principios de **Arquitectura Limpia (Clean Architecture)** con patrones de diseño como **DDD (Domain-Driven Design)**. Es esencial adherirse a esta estructura.

- **🚫 Restricción de Complejidad Externa:** **No se permite** la introducción de arquitecturas o patrones de diseño complejos externos (ej., nuevas implementaciones de Service Mesh, Tangle, nuevos buses de eventos, etc.) que no hayan sido previamente aprobados por el arquitecto principal.
  - **Propósito:** Evitar la fragmentación, el sobre-diseño (_over-engineering_) y la deuda técnica innecesaria.
- **✅ Coherencia con la Arquitectura Existente:** Todas las nuevas funcionalidades y refactorizaciones deben integrarse de forma natural dentro de los límites y capas ya definidas (Domain, Application, Infrastructure).

---

## 2. Gestión de Features y Cambios

La colaboración debe ser proactiva y bien informada para evitar trabajos duplicados o soluciones incompatibles.

- **💬 Consulta Obligatoria para Features Nuevas:** **Nunca** se debe comenzar el desarrollo de una nueva funcionalidad (`feat` en el commit convention) o un cambio significativo de diseño (`refactor` mayor) sin haberlo discutido y obtenido la aprobación previa del equipo o del _Product Owner_.
  - Un Pull Request (PR) que introduzca una `feat` sin un _Issue_ de soporte y aprobación será rechazado.
- **🧠 Contexto Completo del Proyecto:** Antes de realizar cualquier cambio, el contribuidor es responsable de:
  - Tener una comprensión completa del **contexto de negocio** y los requerimientos funcionales (`RF`) asociados.
  - Revisar el código base relevante para entender el patrón de persistencia, el modelado de datos y los flujos de la aplicación que se verán afectados.
- **🛠️ PRs Pequeños e Incrementales:** Los Pull Requests deben ser lo más pequeños y enfocados posible (principio de responsabilidad única). Un PR debe resolver una única tarea o `fix`.

---

## 3. Buenas Prácticas de Desarrollo (Clean Code)

- **Patrones y Librerías:** Usar preferentemente los patrones de persistencia (`Repository`, `Unit of Work`) y las librerías (`React`, `.NET`, `EF Core`) ya establecidas en el proyecto.
- **Tests:** Toda funcionalidad nueva o corrección de bug debe venir acompañada de los **tests unitarios y/o de integración** correspondientes.
- **Documentación:** Asegúrese de que los cambios en las APIs internas o públicas estén correctamente documentados (ej., con XML comments en .NET o JSDoc en React).

## 4. Evitar el uso de emojis

- El uso de emojis en los mensajes de commit puede ser confuso para los usuarios de GitHub, especialmente si no están familiarizados con ellos.
