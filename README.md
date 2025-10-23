# Sistema de Consultorio Dental LCV

## Tecnologías

- React
- TypeScript
- Vite
- Tailwind
- Zustand
- React Query
- React Router
- React PDF
- React Hook Form
- React Toastify
- React PDF
- Json Schema Form
- Zod
- Lucide
- Material UI

## Principios SOLID

<img src="https://ascinfo.dev/images/blog/solid.webp" width="700" />

## Estructura de directorios

```
src/
├── components/ # Componentes reutilizables y de presentación
│ ├── ui/ # Botones, inputs, modales, tablas, etc.
│ ├── layout/ # Layouts generales (Dashboard, Auth, etc.)
│ └── feedback/ # Toasters, loaders, confirm dialogs
│
├── features/ # Módulos funcionales (cada uno cumple SRP)
│ ├── patients/
│ │ ├── components/ # Componentes específicos de pacientes
│ │ ├── hooks/ # Hooks para lógica local o de UI
│ │ ├── services/ # Servicios que aíslan API o lógica
│ │ ├── types/ # Tipos y modelos de dominio del feature
│ │ └── index.ts # Punto de entrada del módulo
│ ├── appointments/
│ └── payments/
│
├── hooks/ # Hooks globales reutilizables (auth, forms, etc.)
│
├── services/ # Lógica global (API, auth, almacenamiento)
│ ├── api/ # Configuración de Axios o React Query
│ ├── auth/ # Autenticación, tokens
│ └── storage/ # LocalStorage, Firestore, etc.
│
├── store/ # Estado global (Zustand o Redux)
│
├── types/ # Tipos globales y DTOs
│
├── utils/ # Funciones puras (validación, formateo, etc.)
│
├── routes/ # Definición de rutas y navegación
│
├── pages/ # Páginas principales que ensamblan features
│
├── assets/ # Imágenes, íconos, fuentes
│
├── styles/ # Tailwind y estilos globales
│
├── config/ # Variables de entorno, endpoints, constantes
│
└── main.tsx / index.tsx # Entrada de la aplicación
```
