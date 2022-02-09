import router from "../../router";
import store from "../../store";
import axios from "../../utils/axios";
import createPersistedState from "vuex-persistedstate";

const userStore = {
	plugins: [createPersistedState()],
	namespaced: true,
	state: {
		screenInfo: {
			width: Number,
		},
		accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjogMTB9IiwiaWF0IjoxNTE2MjM5MDIyfQ.nsVZnx3lFAA52CdJmH5qei0D830M3FUmoUjFBbLrZUM",
		refreshToken: "",
		userInfo: {
			// userName: "권희은",
			// statusMessage: "오늘도 좋은 하루",
			// profile: "https://media.bunjang.co.kr/product/150007679_1_1616845509_w360.jpg",
		},
	},
	getters: {
		accessToken(state) {
			return state.accessToken;
		},
		refreshToken(state) {
			return state.refreshToken;
		},
	},
	mutations: {
		GET_SCREEN(state, payload) {
			state.screenInfo.width = payload.width;
		},
		async SET_ACCESS_TOKEN(state, payload) {
			state.accessToken = payload;
			console.log("accessToken 저장");
			// await store.dispatch("friend/getFriends");
			// await store.dispatch("userStore/getUser");
			await router.push({ name: "friends" }).catch(() => {});
		},
		SET_REFRESH_TOKEN(state, payload) {
			state.refreshToken = payload;
		},
		CLEAR_ACCESS_TOKEN(state) {
			state.accessToken = "";
			console.log("accessToken 삭제");
		},
		CLEAR_REFRESH_TOKEN(state) {
			state.refreshToken = "";
			console.log("refreshToken 삭제");
		},
		SET_USER(state, payload) {
			state.userInfo = payload;
		},
		// TEST() {
		// 	store.dispatch("friend/getFriends");
		// 	store.dispatch("userStore/getUser");
		// 	router.push({ name: "friends" }).catch(() => {});
		// },
	},
	actions: {
		getScreen: function (context, payload) {
			context.commit("GET_SCREEN", payload);
		},
		login: function (context, payload) {
			const userInfo = payload;
			axios
				.post("http://138.2.88.163/auth/signin", userInfo)
				.then((res) => {
					console.log("로그인 요청");
					context.commit("SET_ACCESS_TOKEN", res.data.result.accessToken);
					context.commit("SET_REFRESH_TOKEN", res.data.result.refreshToken);
				})
				.catch(() => {
					const payload = {
						status: "open",
						text: "아이디와 비밀번호를 확인해주세요.",
					};
					store.dispatch("modal/openAlert", payload, { root: true });
				});
			// ===================================[원래코드]
			// context.commit("TEST");
			// console.log("무시하세요" + payload);
		},
		logout: function (context) {
			console.log("로그아웃합니다");
			context.commit("CLEAR_ACCESS_TOKEN");
			context.commit("CLEAR_REFRESH_TOKEN");
		},
		getUser: function (context) {
			axios.get("http://138.2.88.163/user/token").then((res) => {
				console.log("유저정보 가져오기");
				console.log(res);
				let userInfo = res.data.data;
				userInfo.profile = JSON.parse(userInfo.profile);
				context.commit("SET_USER", userInfo);
				console.log(userInfo);
			});
		},
	},
	modules: {},
};

export default userStore;
