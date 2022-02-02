import VueAxios from "axios";
import store from "@/store";

const axios = VueAxios.create({
	// MSA 구조로 요청 주소가 각기 달라 향후 통합가능한 부분이 있으면 수정 예정
	// baseURL: 'http://....',
	headers: {
		"Content-type": "application/json",
	},
});

//요청) 요청 직전 인자값 : axios config / 요청 에러 : error
axios.interceptors.request.use(
	function (config) {
		config.headers["X-ACCESS-TOKEN"] = store.getters["userStore/accessToken"];
		// config.headers["X-REFRESH-TOKEN"] = state.refreshToken;
		console.log("헤더넣기 완료");
		console.log(store.getters["userStore/accessToken"]);
		return config;
	},
	function (error) {
		console.log(error);
		return Promise.reject(error);
	},
);

//응답) 요청 직전 인자값 : axios config / 요청 에러 : error
axios.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		console.log(error);
	},
);

export default axios;