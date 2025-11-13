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
  oidcIssuer: "https://api.asgardeo.io/t/minimarket/oauth2",      // p.ej. "https://idp.tuapp.com/oauth2"
  oidcClientId: "mi0f3E91B2locagnWe5fzu7IIG8a",
  wso2RegisterUrl: "https://miniecommercearqweb.netlify.app/myaccount/register",

  // URL pública del frontend en prod
  appBaseUrl: "https://miniecommercearqweb.netlify.app",

  // 🔑 APIs externas
  geoapifyKey: '5a638551f02a436ab9c89ec428babe70',
  orsKey: 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImM0NWM5NjEwYmQ0YTRlOTBiZmFjMjBjNDc0MTI0YWZmIiwiaCI6Im11cm11cjY0In0=',
  postcoderKey: 'PCWVS-RSSMT-QCQ6G-3AA8V'
};
