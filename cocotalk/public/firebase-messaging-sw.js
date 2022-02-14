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

/*

현재 : 커스텀이 안먹어서 백그라운드 일 때만 들어옴 (그것도 크롬만 들어옴)

---------------
edge로 테스트 했을 때
포그라운드 -> 알람도 뜨고, 로그도 뜨고 커스텀도 먹음 *완벽 (테스트용 API, 서버 API 둘 다 커스텀 됨)

(완전히 꺼졌을 때 푸시 쌓이는 줄 알았으나 안쌓임, 근데 전에 분명 쌓였음)
백그라운드 -> (테스트 API) 알람 커스텀 완벽히 먹음, 단 완전히 껐을 때 푸시는 떠도 로그 쌓이진 않음
백그라운드 -> (서버 API) 알람은 뜨고, 커스텀안먹음(로그도 못찍음) 

chrome으로 테스트 했을 때
포그라운드 -> 테스트용 API, 서버 API 둘 다 로그는 뜨는데 알람은 안뜸

백그라운드 코드는 firebase-messaging에만 있어야하고 index.html에 있으면 무시됨

포그라운드는 명시적으로 해줘야함
백그라운드는 핸들러 없이도 안해줘도 알아서 옴 (만약 webpush가 있다면 webpus로 설정먹고, 없으면 그냥 noti로 먹음)

원래 앱이 foreground 상태가 아닐때는 백그라운드 핸들러 없이도 push notification이 잘 와야 정상 (앳지 기준으로 오긴 옴, 핸들러가 완됨)
*/
