export const environment = {
  production: false,

  // Firebase (mismo proyecto que estás usando)
  firebase: {
    apiKey: "AIzaSyDLTvts5XrV6ivx_vdGNXb_KsD9N7jXyRw",
    authDomain: "minimarket-c92c5.firebaseapp.com",
    projectId: "minimarket-c92c5",
    storageBucket: "minimarket-c92c5.appspot.com",
    messagingSenderId: "24123520011",
    appId: "1:24123520011:web:116dae06a0b41ec7465f0e"
  },

  // OIDC (WSO2 local)
  oidcIssuer: "https://localhost:9443/oauth2",
  oidcClientId: "o2B5f_ZslC19ctDZvL9tYxKUUNoa",
  wso2RegisterUrl: "https://localhost:9443/myaccount/register",

  // Útil si querés armar URLs absolutas en algún punto del cliente
  appBaseUrl: "http://localhost:4200"
};
