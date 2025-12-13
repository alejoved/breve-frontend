# +Breve Frontend (Angular)

Aplicación frontend de +Breve para gestión de suscriptores y pagos recurrentes con Wompi. Incluye vistas B2C (portal de consulta y pago), B2B (login, perfil), y páginas web (landing con demo Supademo).

## Requisitos

- Node.js 18+
- npm 9+
- Angular CLI 16/17
- Mac: usar Terminal integrado de VS Code

## Instalación

```
npm install
```

## Desarrollo local

```
npm start
```

- App servida en http://localhost:4200
- Asegura que los assets se referencien con rutas absolutas: `/assets/...`

## Build de producción

```
npm run build
```

- Salida en `dist/breve-frontend` (o `dist/breve-frontend/browser` si usas prerender).

## Despliegue en Render.com

- Servicio estático:
  - Publish directory: `dist/breve-frontend` (Angular <=15) o `dist/breve-frontend/browser` (Angular 16+ con builder moderno/prerender).
- Verifica que los archivos estáticos estén incluidos:
  - `src/assets`
  - `src/robots.txt`
  - `src/sitemap.xml`

Ejemplo de configuración en angular.json (assets):
```
"assets": [
  "src/favicon.ico",
  "src/assets",
  "src/robots.txt",
  "src/sitemap.xml"
]
```

## SEO básico

- index.html:
  - `<meta name="robots" content="index,follow">`
  - `<meta name="googlebot" content="index,follow">`
- Search Console:
  - Verifica dominio y envía `https://masbreve.com/sitemap.xml`
- Asegura que `robots.txt` permita:
```
User-agent: *
Allow: /
Sitemap: https://masbreve.com/sitemap.xml
```

### Sitemap y Robots

Coloca `sitemap.xml` y `robots.txt` en `src/` para que el build los copie a la raíz.

## Prerender/SSR (opcional, mejora indexación)

- Prerender (simple):
  - Añade target `prerender` en angular.json con rutas públicas (`/`, `/portal`, `/planes`, etc.)
  - Comando: `ng run breve-frontend:prerender`
- SSR (Angular Universal):
  - `npx ng add @nguniversal/express-engine`
  - Build: `npm run build:ssr`
  - Start: `npm run serve:ssr` en Render como servicio web Node.

## Integración con Wompi

- `index.html` ya incluye el script de widget:
```
<script type="text/javascript" src="https://checkout.wompi.co/widget.js"></script>
```
- Usa servicios en Angular para iniciar pagos y manejar callbacks desde tu backend.

## Envío de correos (Brevo)

No expongas claves en Angular; usa backend:

- Render (servicio web) con variable `BREVO_API_KEY`.
- SDK: `@sendinblue/client` y endpoint `/api/send-email`.
- Desde Angular, llama tu endpoint con `HttpClient`.

## Diseño y estilos

- Evita depender de utilidades Tailwind si no está configurado en producción.
- Usa clases propias de componente (`*.component.css`), con:
  - Centrado vertical en móviles: `min-height: 100dvh/100svh;`
  - Cards con borde redondeado: `border-radius`, `overflow: hidden`.
- Assets: usa rutas absolutas `/assets/...` para evitar problemas en despliegue.

## Demo Supademo

- Usa URL de embed y parámetros para ocultar UI:
```
[src]="'https://app.supademo.com/embed/DEMO_ID?hide_toolbar=1&hide_sidebar=1&hide_title=1&autoplay=1' | sanitizeUrl"
```
- Degradado radial con blur detrás del demo:
  - Overlay absoluto en el `section` y foco extra alrededor del contenedor del iframe.
  - Ajusta `filter: blur(500px)`, `opacity`, y tamaño según el diseño.

## Problemas comunes

- Imagen visible por URL pero no en la página:
  - Revisa que usas `/assets/...`, no `src/assets/...`
  - Publica el directorio correcto en Render.
- Fondo/gradiente desplaza el contenido:
  - Coloca overlays como `position: fixed` o `absolute` con `pointer-events: none`.
- Estado de navegación perdido en rutas directas:
  - Acepta also query params (ej. `?customerId=`) si lees `router.getCurrentNavigation()?.extras.state`.

## Scripts útiles

```
npm start              # dev
npm run build          # prod build
# opcional si agregas prerender
npm run prerender
npm run build:prerender
```

## Licencia

© MasBreve S.A.S. Todos los derechos reservados.