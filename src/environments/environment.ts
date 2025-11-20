export const environment = {
  production: false,

  // Firebase
  firebase: {
    apiKey: "AIzaSyDLTvts5XrV6ivx_vdGNXb_KsD9N7jXyRw",
    authDomain: "minimarket-c92c5.firebaseapp.com",
    projectId: "minimarket-c92c5",
    storageBucket: "minimarket-c92c5.appspot.com",
    messagingSenderId: "24123520011",
    appId: "1:24123520011:web:116dae06a0b41ec7465f0e"
  },

  // WSO2 Identity Server (Asgardeo) - configuración para entorno local
  oidcIssuer: "https://localhost:9443/oauth2",
  oidcClientId: "o2B5f_ZslC19ctDZvL9tYxKUUNoa",
  wso2RegisterUrl: "https://localhost:9443/myaccount/register",

  // URL pública del frontend en desarrollo
  appBaseUrl: "http://localhost:4200",


  // APIs externas
  geoapifyKey: '5a638551f02a436ab9c89ec428babe70',
  orsKey: 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImM0NWM5NjEwYmQ0YTRlOTBiZmFjMjBjNDc0MTI0YWZmIiwiaCI6Im11cm11cjY0In0=',
  postcoderKey: 'PCWVS-RSSMT-QCQ6G-3AA8V'
};
