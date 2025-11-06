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
  oidcIssuer: "hhttps://miniecommercearqweb.netlify.app/oauth2",      // p.ej. "https://idp.tuapp.com/oauth2"
  oidcClientId: "o2B5f_ZslC19ctDZvL9tYxKUUNoa",
  wso2RegisterUrl: "https://miniecommercearqweb.netlify.app/myaccount/register",

  // URL pública del frontend en prod
  appBaseUrl: "https://miniecommercearqweb.netlify.app"
};
