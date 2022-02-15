/* eslint-disable no-undef */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyAVvM4t9bfI2HR007WmjEAoT4lmBGfS4LM",
  authDomain: "cocotalk-1cc7f.firebaseapp.com",
  projectId: "cocotalk-1cc7f",
  storageBucket: "cocotalk-1cc7f.appspot.com",
  messagingSenderId: "1046572361165",
  appId: "1:1046572361165:web:a27023ed3d8eeabb365084",
  measurementId: "G-GR9JM30497",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// 백그라운드
// messaging.onBackgroundMessage((payload) => {
//   console.log("[PUSH] [firebase-messaging-sw.js] Received background message ", payload);
//   // Customize notification here
//   if (!(self.Notification && self.Notification.permission === "granted")) {
//     return;
//   }
//   const title = "Background Message Title";
//   const options = {
//     body: "text",
//     icon: "https://cocotalk.s3.ap-northeast-2.amazonaws.com/common/notification.png",
//   };
//   self.registration.showNotification(title, options); // 기존 알림에 추가돼서 작성됨, 즉 알림이 두번 울림
// });
