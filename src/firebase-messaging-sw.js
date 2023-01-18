// proper initialization
if( 'function' === typeof importScripts) {
  importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js');
firebase.initializeApp({
  apiKey: 'AIzaSyBchP5X8DGlp1X_9j6NL4_IrTlBJMXPByM',
    authDomain: 'xtract-e1440.firebaseapp.com',
    projectId: 'xtract-e1440',
    storageBucket: 'xtract-e1440.appspot.com',
    messagingSenderId: '286092783550',
    appId: '1:286092783550:web:2ed630b452aed4813313ef',
    measurementId: 'G-K707KM9DTF',
});
const messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler(function(payload) {
//   console.log('asd',payload);
//   const sender = JSON.parse(payload.data.message);
//   const notificationTitle = 'New CometChat message';
//   const notificationOptions = {
//     body: payload.data.alert,
//     icon: sender.data.entities.sender.entity.avatar,
//   };
//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions,
//   );
// });

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}

}


