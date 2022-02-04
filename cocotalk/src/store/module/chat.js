import createPersistedState from "vuex-persistedstate";
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import axios from "../../utils/axios";

const chat = {
	namespaced: true,
	plugins: [createPersistedState()],
	state: {
		socket: {
			client: undefined,
		},
		roomStatus: {
			mainPage: "",
			chatPage: "chat",
			roomId: "111",
		},
		// friends: [
		// 	{
		// 		username: "권희은",
		// 		statusMessage: "오늘도 좋은 하루",
		// 		profile: "https://media.bunjang.co.kr/product/150007679_1_1616845509_w360.jpg",
		// 		background: "https://ifh.cc/g/CgiChn.jpg",
		// 	},
		// 	{
		// 		username: "고병학",
		// 		statusMessage: "햇빛이 쨍쨍",
		// 	},
		// 	{
		// 		username: "김민정",
		// 		statusMessage: "룰루~~ 신나는 오늘~",
		// 		profile: "https://media.bunjang.co.kr/product/150007679_1_1616845509_w360.jpg",
		// 		background: "https://ifh.cc/g/qKgD7C.png",
		// 	},
		// 	{
		// 		username: "황종훈",
		// 		statusMessage: "얍얍 오늘도 화이팅",
		// 		background: "https://ifh.cc/g/CgiChn.jpg",
		// 	},
		// 	{
		// 		username: "김김김",
		// 		statusMessage: "오늘도 좋은 하루",
		// 		profile: "https://media.bunjang.co.kr/product/150007679_1_1616845509_w360.jpg",
		// 		background: "https://ifh.cc/g/CgiChn.jpg",
		// 	},
		// 	{
		// 		username: "박박박",
		// 		statusMessage: "햇빛이 쨍쨍",
		// 	},
		// 	{
		// 		username: "리리리",
		// 		statusMessage: "룰루~~ 신나는 오늘~",
		// 		profile: "https://media.bunjang.co.kr/product/150007679_1_1616845509_w360.jpg",
		// 		background: "https://ifh.cc/g/qKgD7C.png",
		// 	},
		// 	{
		// 		username: "황황황",
		// 		statusMessage: "얍얍 오늘도 화이팅",
		// 		background: "https://ifh.cc/g/CgiChn.jpg",
		// 	},
		// 	{
		// 		username: "김김김",
		// 		statusMessage: "오늘도 좋은 하루",
		// 		profile: "https://media.bunjang.co.kr/product/150007679_1_1616845509_w360.jpg",
		// 		background: "https://ifh.cc/g/CgiChn.jpg",
		// 	},
		// 	{
		// 		username: "박박박",
		// 		statusMessage: "햇빛이 쨍쨍",
		// 	},
		// 	{
		// 		username: "리리리",
		// 		statusMessage: "룰루~~ 신나는 오늘~",
		// 		profile: "https://media.bunjang.co.kr/product/150007679_1_1616845509_w360.jpg",
		// 		background: "https://ifh.cc/g/qKgD7C.png",
		// 	},
		// 	{
		// 		username: "황황황",
		// 		statusMessage: "얍얍 오늘도 화이팅",
		// 		background: "https://ifh.cc/g/CgiChn.jpg",
		// 	},
		// 	{
		// 		username: "김김김",
		// 		statusMessage: "오늘도 좋은 하루",
		// 		profile: "https://media.bunjang.co.kr/product/150007679_1_1616845509_w360.jpg",
		// 		background: "https://ifh.cc/g/CgiChn.jpg",
		// 	},
		// 	{
		// 		username: "박박박",
		// 		statusMessage: "햇빛이 쨍쨍",
		// 	},
		// 	{
		// 		username: "리리리",
		// 		statusMessage: "룰루~~ 신나는 오늘~",
		// 		profile: "https://media.bunjang.co.kr/product/150007679_1_1616845509_w360.jpg",
		// 		background: "https://ifh.cc/g/qKgD7C.png",
		// 	},
		// 	{
		// 		username: "황황황",
		// 		statusMessage: "얍얍 오늘도 화이팅",
		// 		background: "https://ifh.cc/g/CgiChn.jpg",
		// 	},
		// ],
		chats: [
			{
				chatname: "오아시스팀",
				lastMessage: "오늘도 좋은 하루",
				roomId: "111",
				cnt: 200,
			},
			{ chatname: "스토브캠프", lastMessage: "햇빛이 쨍쨍", roomId: "222", cnt: 3 },
			{
				chatname: "오아시스팀",
				lastMessage: "오늘도 좋은 하루",
				roomId: "111",
				cnt: 200,
			},
			{ chatname: "스토브캠프", lastMessage: "햇빛이 쨍쨍", roomId: "222", cnt: 3 },
			{
				chatname: "오아시스팀",
				lastMessage: "오늘도 좋은 하루",
				roomId: "111",
				cnt: 200,
			},
			{ chatname: "스토브캠프", lastMessage: "햇빛이 쨍쨍", roomId: "222", cnt: 3 },
			{
				chatname: "오아시스팀",
				lastMessage: "오늘도 좋은 하루",
				roomId: "111",
				cnt: 200,
			},
			{ chatname: "스토브캠프", lastMessage: "햇빛이 쨍쨍", roomId: "222", cnt: 3 },
			{
				chatname: "오아시스팀",
				lastMessage: "오늘도 좋은 하루",
				roomId: "111",
				cnt: 200,
			},
			{ chatname: "스토브캠프", lastMessage: "햇빛이 쨍쨍", roomId: "222", cnt: 3 },
			{
				chatname: "오아시스팀",
				lastMessage: "오늘도 좋은 하루",
				roomId: "111",
				cnt: 200,
			},
			{ chatname: "스토브캠프", lastMessage: "햇빛이 쨍쨍", roomId: "222", cnt: 3 },
			{
				chatname: "오아시스팀",
				lastMessage: "오늘도 좋은 하루",
				roomId: "111",
				cnt: 200,
			},
			{ chatname: "스토브캠프", lastMessage: "햇빛이 쨍쨍", roomId: "222", cnt: 3 },
			{
				chatname: "오아시스팀",
				lastMessage: "오늘도 좋은 하루",
				roomId: "111",
				cnt: 200,
			},
			{ chatname: "스토브캠프", lastMessage: "햇빛이 쨍쨍", roomId: "222", cnt: 3 },
			{
				chatname: "오아시스팀",
				lastMessage: "오늘도 좋은 하루",
				roomId: "111",
				cnt: 200,
			},
			{ chatname: "스토브캠프", lastMessage: "햇빛이 쨍쨍", roomId: "222", cnt: 3 },
			{
				chatname: "오아시스팀",
				lastMessage: "오늘도 좋은 하루",
				roomId: "111",
				cnt: 200,
			},
			{ chatname: "스토브캠프", lastMessage: "햇빛이 쨍쨍", roomId: "222", cnt: 3 },
		],
		chattings: [
			{
				userInfo: {
					username: "권희은",
					profile: "https://media.bunjang.co.kr/product/150007679_1_1616845509_w360.jpg",
				},
				message: "오늘도 화이팅!sakldfjlkasjfkasl;fjsjkfals;jflkasjfljas;lfjk;sjdfklakjsljdflasjdfl;asj;f",
				time: "23:00",
			},
			{
				userInfo: {
					username: "김민정",
					profile: undefined,
				},
				message: "넵넵",
				time: "23:05",
			},
			{
				userInfo: {
					username: "고병학",
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
		CHANGE_MAIN_PAGE(state, payload) {
			state.roomStatus.mainPage = payload;
		},
		SET_CHATLIST(state, payload) {
			state.chats = payload;
		},
		SET_CONNECTION(state, payload) {
			state.socket.client = payload;
		},
	},
	actions: {
		changePage: function (context, payload) {
			context.commit("CHANGE_PAGE", payload);
		},
		changeMainPage: function (context, payload) {
			context.commit("CHANGE_MAIN_PAGE", payload);
		},
		getChatList: function (context) {
			axios.get("http://138.2.88.163:8000/chat/rooms").then((res) => {
				console.log("채팅방목록 가져오기");
				console.log(res);
				let chatList = res.data.data;
				chatList.forEach((e) => {
					if (e.img == "string") {
						delete e["img"];
					}
				});
				context.commit("SET_CHATLIST", res.data.data);
			});
		},
		startConnection: function (context) {
			const serverURL = "http://138.2.88.163:8000/chat/stomp";
			let socket = new SockJS(serverURL);
			this.stompClient = Stomp.over(socket);
			this.stompClient.connect(
				{},
				(frame) => {
					// 소켓 연결 성공
					// this.connected = true;
					console.log("소켓 연결 성공", frame);
					// 서버의 메시지 전송 endpoint를 구독
					// 이런형태를 pub sub 구조라고 함
					// this.stompClient.subscribe("/sub/chat/room/" + this.roomId, (res) => {
					// 	console.log("구독으로 받은 메시지 입니다.", res.body);
					// 	// 받은 데이터를 json으로 파싱하고 리스트에 넣어줌
					// 	this.recvList.push(JSON.parse(res.body));
					// });
					// const msg = {
					// 	type: "JOIN",
					// 	roomId: this.roomId,
					// 	sender: this.userName,
					// };
					// this.stompClient.send("/pub/chat/message", JSON.stringify(msg), {});
				},
				(error) => {
					// 소켓 연결 실패
					console.log("소켓 연결 실패", error);
					// this.connected = false;
				},
			);
			context.commit("SET_CONNECTION", this.stompClient);
			console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);
		},
		getChat(context, payload) {
			console.log("chat");
			console.log(payload);
			console.log(context);
		},
		createChat(context, payload) {
			console.log("chatCreate");
			console.log(payload);
			axios.post("http://138.2.88.163:8000/chat/rooms", payload).then((res) => {
				console.log("채팅방생성!!!!");
				console.log(res);
				// let chatList = res.data.data;
				// chatList.forEach((e) => {
				// 	if (e.img == "string") {
				// 		delete e["img"];
				// 	}
				// });
				// context.commit("SET_CHATLIST", res.data.data);
			});
		},
	},
	modules: {},
};

export default chat;
