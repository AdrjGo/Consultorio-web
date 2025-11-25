# Convención de Commits

## Formato

`<tipo>(<módulo>): <descripción>`

Relacionado con `<referencia>` (Ejemplo: `RF-XXX` para requerimientos funcionales, `INC-YYY` para incidencias)

## Tipos permitidos

- **feat**: Nueva funcionalidad
- **fix**: Corrección de bug
- **docs**: Documentación
- **test**: Tests
- **refactor**: Refactorización de código sin cambio de comportamiento
- **style**: Cambios que no afectan el significado del código (espacios en blanco, formato, puntos y comas, etc.)
- **chore**: Cambios en el proceso de compilación, herramientas auxiliares y librerías externas.
- **perf**: Cambios de código que mejoran el rendimiento
- **build**: Cambios que afectan el sistema de construcción o dependencias externas
- **ci**: Cambios en nuestros archivos y scripts de configuración de CI

## Ejemplos

- `feat(auth): Añadir login con Google`
- `fix(user): Corregir error al actualizar perfil - RF-123`
- `docs(readme): Actualizar sección de instalación`
- `test(product): Añadir pruebas para la creación de productos`

---

## Directrices Adicionales

- **Descripción:** La descripción debe ser concisa (máximo 72 caracteres) y explicar qué hace el commit. Utiliza el imperativo ("Añadir", "Corregir", en lugar de "Añadido", "Corregido").
- **Módulo (opcional):** El módulo entre paréntesis indica la parte del sistema afectada. Si el cambio es global o no aplica a un módulo específico, puedes omitirlo.
- **Cuerpo del commit (opcional):** Si el cambio es complejo y la descripción no es suficiente, puedes añadir un cuerpo más detallado después de una línea en blanco.
- **Referencias:** Si el commit está relacionado con un requisito funcional, una incidencia, una tarea, etc., asegúrate de añadir la referencia adecuada.
