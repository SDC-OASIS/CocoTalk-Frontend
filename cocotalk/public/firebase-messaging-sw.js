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

const messaging = firebase.messaging();

// push notification 뮤트 설정
var isMute = false;
const muteBroadcast = new BroadcastChannel("mute");
muteBroadcast.onmessage = (event) => {
  isMute = event.data.key;
  console.log("[sevice-worker] isMute", isMute);
};

// 백그라운드 커스텀
messaging.onBackgroundMessage((payload) => {
  console.log("[PUSH] [firebase-messaging-sw.js] Received background message ", payload);
  if (!isMute) {
    console.log("백그라운드  알림이 왔습니다. [현재 뮤트 상태] ", isMute);
    // Customize notification here
    const title = payload.data.title;
    const options = {
      body: payload.data.body,
      icon: "https://d1fwng7137yw58.cloudfront.net/common/notification.png",
    };
    self.registration.showNotification(title, options); // 새로운 알림이 작성됨, 즉 알림이 두번 울림
  }
});

// notification 클릭 이벤트
self.addEventListener("notificationclick", function (event) {
  console.log("On notification click: ", event.notification.tag);
  event.notification.close();
  console.log("click event", event.notification);
  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          // TODO: 나중에 배포 주소로 바꿀 것
          if (client.url.includes("http://localhost:8080")) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow("/");
      }),
  );
});
