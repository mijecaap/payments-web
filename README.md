# payments‑web

Frontend React (Next.js 14) para la app de pagos con referidos y sistema de comisiones.

## 🗺️ Contenido
1. [Stack](#stack)
2. [Requisitos](#requisitos)
3. [Instalación local](#instalación-local)
4. [Variables de entorno](#variables-de-entorno)
5. [Scripts npm](#scripts-npm)
6. [Estructura de carpetas](#estructura-de-carpetas)
7. [CI / CD](#ci--cd)
8. [Despliegue en Vercel](#despliegue-en-vercel)
9. [Convenciones](#convenciones)

---

## Stack
- **Next.js** 14 (App Router + Server Actions)
- **TypeScript**
- **Tailwind CSS**
- **React‑Hook‑Form** + **zod** para validación de formularios
- **Zustand** para manejo de estado global
- **Headless UI** para componentes accesibles
- **React Icons** para iconografía consistente
- **Sonner** para notificaciones
- **JS-Cookie** para manejo de cookies

## Requisitos
- Node.js 18.x o superior
- Git
- Navegador moderno con soporte para ES6+
- Cuenta en Vercel para despliegue

## Instalación local

```cmd
git clone https://github.com/mijecaap/payments-web
cd payments-web
npm install
npm run dev         :: http://localhost:3000
```

## Variables de entorno
Crea **.env.local**:

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```
> Sustituye por la URL pública de Railway al desplegar.

## Scripts npm

| Script | Finalidad |
| ------ | --------- |
| `dev` | Dev server con hot‑reload |
| `build` | Compilación de producción |
| `start` | Servir la build (`next start`) |
| `lint` | ESLint + Prettier |
| `lint:fix` | Corregir errores de linting |
| `format` | Verificar formato de código |
| `format:write` | Formatear código automáticamente |
| `typecheck` | Verificación de tipos TypeScript |

## Estructura de carpetas

```
/src
  /app                 :: Páginas y rutas (App Router)
    /auth             :: Autenticación
    /commissions      :: Vista de comisiones
    /contacts         :: Gestión de contactos
    /history         :: Historial de transacciones
    /home            :: Dashboard principal
  /components         :: Componentes reutilizables
    /auth            :: Componentes de autenticación
    /home            :: Componentes del dashboard
    /icons           :: Iconos personalizados
    /layout          :: Componentes de estructura
  /contexts          :: Contextos de React
  /hooks             :: Hooks personalizados
  /schemas           :: Esquemas de validación zod
  /services          :: Servicios y API calls
  /stores            :: Estados globales (Zustand)
  /types             :: Tipos TypeScript
  /utils             :: Utilidades y helpers
```

## CI / CD
Workflow `ci.yml` (GitHub Actions):

1. Checkout del código
2. Setup Node.js 18|20
3. Instalación de dependencias (`npm ci`)
4. Verificación de tipos (`npm run typecheck`)
5. Linting y formato (`npm run lint`)
6. Build de producción (`npm run build`)

## Despliegue en Vercel
1. **Import Project** → conecta el repositorio `payments-web`
2. Configura _Environment Variables_:
   - `NEXT_PUBLIC_API_URL`: URL de la API en producción
3. Ajusta la configuración de build si es necesario
4. Deploy y asigna dominio personalizado o usa `*.vercel.app`

> Para CI manual: configura `VERCEL_TOKEN` como GitHub Secret y usa `vercel --prod`

## Convenciones
- **Arquitectura**: Basada en características (feature-based)
- **Componentes**: 
  - Reutilizables en `/components`
  - Específicos de feature junto a sus rutas
- **Estado**: 
  - Global con Zustand en `/stores`
  - Local con React hooks
- **Datos**: 
  - Server Actions para mutaciones
  - API calls centralizados en `/services`
- **Validación**:
  - Esquemas zod en `/schemas`
  - Integración con React Hook Form
- **Estilos**:
  - Tailwind CSS para todo el styling
  - Componentes UI base de Headless UI

## 🌟 Características Destacadas

1. **Arquitectura Moderna y Escalable**
   - Implementación completa de Next.js 14 con App Router
   - Server Actions para operaciones del servidor optimizadas
   - Estructura de carpetas organizada por características para mejor mantenibilidad

2. **Gestión de Estado Robusta**
   - Zustand para estado global con stores especializados
   - Manejo eficiente de caché y estado del servidor
   - Persistencia de datos con cookies y almacenamiento local

3. **Experiencia de Usuario Optimizada**
   - Sistema de carga progresiva con skeletons de carga
   - Notificaciones en tiempo real con Sonner
   - Navegación fluida entre páginas con prefetching

4. **Seguridad y Validación**
   - Validación de formularios end-to-end con Zod
   - Protección de rutas con middleware
   - Manejo seguro de tokens y autenticación

5. **Componentes Reutilizables**
   - Biblioteca de componentes UI accesibles con Headless UI
   - Diseño consistente con Tailwind CSS
   - Componentes modulares para tablas, formularios y modales

6. **Gestión de Datos Eficiente**
   - Servicios centralizados para llamadas a la API
   - Paginación infinita para listas grandes
   - Manejo optimizado de caché y revalidación

7. **Testing y Calidad**
   - Configuración completa de ESLint y Prettier
   - Tipado estricto con TypeScript
   - Estructura preparada para pruebas e2e con Playwright

8. **Optimización de Rendimiento**
   - Carga diferida de componentes y rutas
   - Optimización automática de imágenes
   - Bundling y code-splitting inteligente

9. **CI/CD y Despliegue**
   - Integración continua con GitHub Actions
   - Despliegue automatizado en Vercel
   - Variables de entorno gestionadas correctamente

10. **Características de Negocio**
    - Sistema completo de gestión de pagos
    - Programa de referidos con comisiones
    - Panel de administración de transacciones
    - Gestión de contactos frecuentes y referidos