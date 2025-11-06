export const environment = {
  production: true,

  // Firebase (mismo proyecto por ahora; si usás otro, cambiá acá)
  firebase: {
    apiKey: "AIzaSyDLTvts5XrV6ivx_vdGNXb_KsD9N7jXyRw",
    authDomain: "minimarket-c92c5.firebaseapp.com",
    projectId: "minimarket-c92c5",
    storageBucket: "minimarket-c92c5.appspot.com",
    messagingSenderId: "24123520011",
    appId: "1:24123520011:web:116dae06a0b41ec7465f0e"
  },

  // OIDC (reemplazá por tu IdP en prod si no es localhost)
  // Si por ahora seguís con WSO2 local en pruebas de prod, dejalo igual.
  oidcIssuer: "https://tu-dominio-idp/oauth2",      // p.ej. "https://idp.tuapp.com/oauth2"
  oidcClientId: "REEMPLAZAR_CLIENT_ID_PROD",
  wso2RegisterUrl: "https://tu-dominio-idp/myaccount/register",

  // URL pública del frontend en prod
  appBaseUrl: "https://tu-dominio-frontend"
};
