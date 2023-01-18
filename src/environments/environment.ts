// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl:'http://125.99.189.179:2222/api/v2',
  // server:'http://125.99.189.179:2222',
  // server:'http://10.111.128.101:2222',
  // apiUrl:'http://10.111.128.101:2222/api/v2',
  server:  'http://192.168.10.10:2222/api/v2',// 'http://192.168.0.115:7200/api/v2' ,  //'http://127.0.0.1:8000/api/v2',       'http://125.99.189.179:2222/api/v2' ,                                     //'http://10.111.128.101:2222/api/v2',//https://xtract.in:5000
  apiUrl:   'http://192.168.10.10:2222/api/v2',//http://192.168.0.115:7200/api/v2 '' ,//http://192.168.0.115:2222/api/v2  //'http://127.0.0.1:8000/api/v2',           'http://125.99.189.179:3333/api/v2' ,                                                                //'http://10.111.128.101:2222/api/v2',
  RAZORPAY_KEY_ID: 'rzp_live_Qi8XqERZCCPMG7',
  firebase: {
    apiKey: 'AIzaSyBchP5X8DGlp1X_9j6NL4_IrTlBJMXPByM',
    authDomain: 'xtract-e1440.firebaseapp.com',
    projectId: 'xtract-e1440',
    storageBucket: 'xtract-e1440.appspot.com',
    messagingSenderId: '286092783550',
    appId: '1:286092783550:web:2ed630b452aed4813313ef',
    measurementId: 'G-K707KM9DTF'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
