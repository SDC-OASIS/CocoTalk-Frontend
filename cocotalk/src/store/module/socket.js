import createPersistedState from "vuex-persistedstate";
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import store from "@/store";
import axios from "@/utils/axios";
import router from "../../router";

const socket = {
  plugins: [createPersistedState()],
  namespaced: true,
  state: {
    stompChatListClient: null,
    stompChatListConnected: false,
    stompChatRoomClient: null,
    stompChatRoomConnected: false,
    createChatRoomStatus: false,
    newPrivateRoomStatus: false,
  },
  mutations: {
    setStompChatListClient(state, stompChatListClient) {
      state.stompChatListClient = stompChatListClient;
    },
    setStompChatRoomClient(state, stompChatRoomClient) {
      state.stompChatRoomClient = stompChatRoomClient;
    },
    setStompChatListConnected(state, payload) {
      state.stompChatListConnected = payload;
    },
    setStompChatRoomConnected(state, stompChatRoomConnected) {
      state.stompChatRoomConnected = stompChatRoomConnected;
    },
    setStompChatListDisconnect(state) {
      state.stompChatListConnected = false;
    },
    setCreateChatRoomStatus(state, payload) {
      state.createChatRoomStatus = payload;
    },
    setNewPrivateRoomStatus(state, payload) {
      state.newPrivateRoomStatus = payload;
    },
  },
  actions: {
    chatListConnect(context) {
      const serverURL = "http://138.2.93.111:8080/stomp";
      let socket = new SockJS(serverURL);
      context.commit("setStompChatListClient", Stomp.over(socket));
      context.state.stompChatListClient.connect(
        { view: "chatList", userId: store.getters["userStore/userInfo"].id },
        (frame) => {
          this.connected = true;
          context.commit("setStompChatListConnected", true);
          console.log("소켓 연결 성공", frame);
        },
        (error) => {
          console.log("소켓 연결 실패", error);
          this.connected = false;
          context.commit("setStompChatListConnected", false);
        },
      );
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);
    },
    createChat(context, data) {
      console.log("채팅방생성");
      context.state.stompChatListClient.send("/simple/chatroom/new", JSON.stringify(data), (res) => {
        console.log("생성결과");
        console.log(res);
      });
      store.dispatch("modal/closeRoomNameEditModal");
      context.commit("setCreateChatRoomStatus", true);
    },
    startPrivateChat(context, friend) {
      console.log("개인톡방 체크");
      console.log(friend);
      axios.get(`chat/rooms/private/${friend.friend.id}`).then((res) => {
        console.log("개인톡방 있나요?");
        console.log(res);
        if (res.data.data.id) {
          console.log("방있지룽");
        } else {
          console.log("방없어융");
          context.commit("setNewPrivateRoomStatus", true);
          router.push({ name: store.getters["chat/roomStatus"].mainPage + "Chat", params: { chat: "chat", roomId: "private" } }).catch(() => {});
        }
        // let friends = res.data.data;
        // // 친구가 1명이라도 존재하는 경우 STRING jSON 파싱
        // if (friends.length) {
        //   friends.forEach((e) => {
        //     e.friend.profile = JSON.parse(e.friend.profile);
        //     console.log("친구프로필데이터 파싱완료");
        //   });
        // }
        // context.commit("GET_FRIENDS", friends);
        // console.log(friends);
      });
    },
  },
  modules: {},
};

export default socket;
