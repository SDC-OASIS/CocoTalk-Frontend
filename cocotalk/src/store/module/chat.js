import createPersistedState from "vuex-persistedstate";

const chat = {
	namespaced: true,
	plugins: [createPersistedState()],
	state: {
		roomStatus: {
			chatPage: "chat",
			roomId: "111",
		},
		friends: [
			{
				name: "권희은",
				statusMessage: "오늘도 좋은 하루",
				profile: "https://media.bunjang.co.kr/product/150007679_1_1616845509_w360.jpg",
				background: "https://ifh.cc/g/CgiChn.jpg",
			},
			{
				name: "고병학",
				statusMessage: "햇빛이 쨍쨍",
			},
			{
				name: "김민정",
				statusMessage: "룰루~~ 신나는 오늘~",
				profile: "https://media.bunjang.co.kr/product/150007679_1_1616845509_w360.jpg",
				background: "https://ifh.cc/g/qKgD7C.png",
			},
			{
				name: "황종훈",
				statusMessage: "얍얍 오늘도 화이팅",
				background: "https://ifh.cc/g/CgiChn.jpg",
			},
		],
		chats: [
			{
				name: "오아시스팀",
				lastMessage: "오늘도 좋은 하루",
				roomId: "111",
				cnt: 200,
			},
			{ name: "스토브캠프", lastMessage: "햇빛이 쨍쨍", roomId: "222", cnt: 3 },
		],
		chattings: [
			{
				userInfo: {
					name: "권희은",
					profile: "https://media.bunjang.co.kr/product/150007679_1_1616845509_w360.jpg",
				},
				message: "오늘도 화이팅!",
				time: "23:00",
			},
			{
				userInfo: {
					name: "김민정",
					profile: undefined,
				},
				message: "넵넵",
				time: "23:05",
			},
			{
				userInfo: {
					name: "고병학",
					profile: undefined,
				},
				message: "화이팅!!!",
				time: "23:10",
			},
		],
	},
	mutations: {
		CHANGE_PAGE(state, payload) {
			state.roomStatus.chatPage = payload.chat;
			state.roomStatus.roomId = payload.roomId;
		},
	},
	actions: {
		changePage: function (context, payload) {
			context.commit("CHANGE_PAGE", payload);
		},
	},
	modules: {},
};

export default chat;
