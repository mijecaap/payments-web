# payments‑web

Frontend React (Next.js 14) para la app de pagos con referidos.

## 🗺️ Contenido
1. [Stack](#stack)
2. [Requisitos](#requisitos)
3. [Instalación local](#instalación-local)
4. [Variables de entorno](#variables-de-entorno)
5. [Scripts npm](#scripts-npm)
6. [Estructura de carpetas](#estructura-de-carpetas)
7. [CI / CD](#ci--cd)
8. [Despliegue en Vercel](#despliegue-en-vercel)
9. [Convenciones](#convenciones)

---

## Stack
- **Next.js** 14 (App Router + Server Actions)  
- **TypeScript**  
- **Tailwind CSS**  
- **React‑Hook‑Form** + **zod** para formularios  
- **Playwright** e2e

## Requisitos
- Node LTS  
- Git  
- Navegador moderno  
- Cuenta Vercel

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
NEXT_PUBLIC_API_URL=http://localhost:3001
```
> Sustituye por la URL pública de Railway al desplegar.

## Scripts npm

| Script | Finalidad |
| ------ | --------- |
| `dev` | Dev server con hot‑reload |
| `build` | Compilación de producción |
| `start` | Servir la build (`next start`) |
| `lint` | ESLint + Prettier |
| `test:e2e` | Playwright headless |
| `typecheck` | Verificación TypeScript |

## Estructura de carpetas

```
/app
  /dashboard          :: saldo + contactos (server component)
  /transfer           :: server action
  /history            :: transacciones y comisiones
/components
/lib
/styles
```

## CI / CD
Workflow `ci.yml` (GitHub Actions):

1. Checkout  
2. Node 18|20 → `npm ci`  
3. `npm run lint`  
4. `npm run typecheck`  
5. `npm run build`

## Despliegue en Vercel
1. **Import Project** → conecta `payments-web`.  
2. _Environment Variables_ → `NEXT_PUBLIC_API_URL`.  
3. Build & preview.  
4. Domina el dominio `*.vercel.app` o custom.

> Si prefieres CI totalmente manual, añade token `VERCEL_TOKEN` como GitHub Secret y usa `vercel --prod` en un paso del workflow.

## Convenciones
- Carpetas por feature.  
- Componentes reutilizables en `/components`.  
- Hooks personalizados en `/lib/hooks`.  
- Tests e2e en `/playwright`.