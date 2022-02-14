/* eslint-disable no-undef */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: "AIzaSyAVvM4t9bfI2HR007WmjEAoT4lmBGfS4LM",
  projectId: "cocotalk-1cc7f",
  messagingSenderId: "1046572361165",
  appId: "1:1046572361165:web:a27023ed3d8eeabb365084",
});

const messaging = firebase.messaging(); //얘 아니면 메시지 안오는듯
// Background
// 서버 것이 아니라 테스트용으로 보내면 작동함
messaging.setBackgroundMessageHandler(function (payload) {
  console.log("Background", payload);
  const title = "백그라운드 서비스";
  let custombody = null;
  if (payload.data && payload.data.status) custombody = payload.data.status;
  else custombody = payload.data.message;
  const options = {
    // body: payload.data.status,
    body: custombody,
  };
  return self.registration.showNotification("고라니 타이틀/" + title, options); //service worker에서만 돌아가는 코드
});

/*
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
