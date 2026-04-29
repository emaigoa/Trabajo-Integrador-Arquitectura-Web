# Mini E-Commerce

Aplicacion web de mini market desarrollada con Angular. Permite consultar un catalogo de
productos, filtrar por categorias, aplicar promociones, gestionar un carrito, iniciar sesion y
calcular un envio antes de confirmar la compra.

## Sitio desplegado

```text
https://miniecommercearqweb.netlify.app
```

## Tecnologias

- Angular 20
- TypeScript
- Bootstrap 5
- Firebase / Firestore
- Angular OAuth2 OIDC
- Angular SSR
- Netlify

## Funcionalidades

- Catalogo de productos obtenido desde Firestore.
- Filtro por categoria y busqueda por nombre.
- Promociones por categoria, incluyendo descuentos porcentuales y 2x1.
- Carrito persistido en `localStorage`.
- Flujo de envio con busqueda de direccion, geolocalizacion y cotizacion.
- Autenticacion OIDC con WSO2 / Asgardeo.
- Login simulado para pruebas locales.

## Requisitos

- Node.js compatible con Angular 20.
- npm.
- Angular CLI instalado globalmente o ejecutado con `npx`.

## Instalacion

```bash
npm install
```

## Desarrollo

```bash
npm start
```

La aplicacion queda disponible en:

```text
http://localhost:4200
```

## Build

```bash
npm run build
```

Los archivos compilados se generan en `dist/mini-e-commerce/`.

## SSR

Despues de compilar, se puede levantar el servidor SSR con:

```bash
npm run serve:ssr:mini-e-commerce
```

## Tests

```bash
npm test
```

## Configuracion

La configuracion de Firebase, OIDC y APIs externas esta en:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

Para desarrollo local, revisar especialmente:

- `oidcIssuer`
- `oidcClientId`
- `appBaseUrl`
- claves de APIs externas

## Despliegue

El proyecto incluye configuracion para Netlify:

- `netlify.toml`
- `public/_redirects`

URL de produccion:

```text
https://miniecommercearqweb.netlify.app
```

El directorio publicado configurado es:

```text
dist/mini-e-commerce/browser
```

## Estructura principal

```text
src/app/componentes   Componentes reutilizables
src/app/pages         Pantallas de la aplicacion
src/app/servicios     Servicios de negocio, datos, autenticacion y envio
src/environments      Configuracion por entorno
public                Assets publicos y redirects
```
