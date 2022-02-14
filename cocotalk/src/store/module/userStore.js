import router from "@/router";
import store from "@/store";
import axios from "@/utils/axios";
import createPersistedState from "vuex-persistedstate";

const userStore = {
  plugins: [createPersistedState()],
  namespaced: true,
  state: {
    screenInfo: {
      width: Number,
    },
    accessToken: "",
    refreshToken: "",
    fcmToken: "",
    userInfo: {},
    isLogin: false,
  },
  getters: {
    accessToken(state) {
      return state.accessToken;
    },
    refreshToken(state) {
      return state.refreshToken;
    },
    userInfo(state) {
      return state.userInfo;
    },
  },
  mutations: {
    GET_SCREEN(state, payload) {
      state.screenInfo.width = payload.width;
    },
    SET_ACCESS_TOKEN(state, payload) {
      state.accessToken = payload;
      console.log("[userStore] accessToken 저장");
    },
    CLEAR_ACCESS_TOKEN(state) {
      state.accessToken = "";
      console.log("[userStore] accessToken 삭제");
    },
    SET_REFRESH_TOKEN(state, payload) {
      state.refreshToken = payload;
      console.log("[userStore] refreshToken 저장");
    },
    CLEAR_REFRESH_TOKEN(state) {
      state.refreshToken = "";
      console.log("[userStore] refreshToken 삭제");
    },
    SET_FCM_TOKEN(state, payload) {
      state.fcmToken = payload;
    },
    CLEAR_FCM_TOKEN(state) {
      state.fcmToken = "";
      console.log("[userStore] fcmToken 삭제");
    },
    SET_ISLOGIN(state) {
      state.isLogin = true;
    },
    CLEAR_ISLOGIN(state) {
      state.isLogin = false;
    },
    SET_USER(state, payload) {
      state.userInfo = payload;
    },
    GO_MAINPAGE() {
      router.push({ name: "friends" }).catch(() => {});
    },
    GO_LOGINPAGE() {
      router.push({ name: "login" }).catch(() => {});
    },
  },
  actions: {
    getScreen: function (context, payload) {
      context.commit("GET_SCREEN", payload);
    },
    login: async function (context, payload) {
      const userInfo = payload;
      await axios.post("auth/signin", userInfo).then((res) => {
        console.log(res.data);
        if (res.data.isSuccess) {
          console.log("로그인 요청");
          context.commit("SET_ACCESS_TOKEN", res.data.result.accessToken);
          context.commit("SET_REFRESH_TOKEN", res.data.result.refreshToken);
          context.commit("SET_FCM_TOKEN", userInfo.fcmToken);
          context.commit("SET_ISLOGIN");
          context.commit("GO_MAINPAGE");
        } else {
          const payload = {
            status: "open",
            text: "아이디와 비밀번호를 확인해주세요.",
          };
          store.dispatch("modal/openAlert", payload, { root: true });
        }
      });
    },
    logout: async function (context) {
      console.log("로그아웃합니다");
      context.commit("CLEAR_ACCESS_TOKEN");
      context.commit("CLEAR_REFRESH_TOKEN");
      context.commit("CLEAR_ISLOGIN");
      context.commit("GO_LOGINPAGE");
      store.dispatch("chat/clearPage");
    },
    getUser: function (context) {
      axios.get("user/profile/token").then((res) => {
        console.log("유저정보 가져오기");
        console.log(res);
        let userInfo = res.data.data;
        userInfo.profile = JSON.parse(userInfo.profile);
        context.commit("SET_USER", userInfo);
        console.log(userInfo);
      });
    },
    reissue: ({ state, commit }) => {
      return new Promise((resolve, reject) => {
        console.log("[userStore/reissue] 호출", state.refreshToken);
        axios
          .get("auth/reissue", { headers: { "X-REFRESH-TOKEN": state.refreshToken } })
          .then((res) => {
            if (res.data.isSuccess) {
              console.log("[userStore/reissue] TOKEN 재발급 완료", res.data);
              commit("SET_ACCESS_TOKEN", res.data.result.accessToken);
              commit("SET_REFRESH_TOKEN", res.data.result.refreshToken);
              console.log("[VUEX] TOKEN 재설정 완료");
              resolve(res);
            } else {
              // console.log("TOKEN 재발급 실패", res.data);
              reject(res);
            }
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      }); //Promise END
    }, //reissue END
  },
  modules: {},
};

export default userStore;
