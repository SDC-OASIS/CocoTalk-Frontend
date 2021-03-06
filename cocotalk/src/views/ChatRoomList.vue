<template>
  <div class="chat-room-list-outer-container">
    <!-- 상단바 -->
    <div class="header row">
      <span>채팅</span>
      <div class="header-icon-container row">
        <div style="dispaly: inline-block" @click="filterOn">
          <span class="iconify" data-icon="ant-design:search-outlined" style="color: #aaaaaa"></span>
        </div>
        <div style="dispaly: inline-block" @click="openChatCreationModal">
          <span class="iconify" data-icon="mdi:chat-plus-outline" style="color: #aaaaaa"></span>
        </div>
      </div>
    </div>
    <div v-if="filterStatus" class="chat-list-search row">
      <input placeholder="이름을 입력하세요." maxlength="20" @input="filter = $event.target.value" @keyup="setFilter" />
    </div>
    <!-- 채팅방 목록 -->
    <transition-group class="chat-room-list-container" @before-enter="beforeEnter" @after-enter="afterEnter" @enter-cancelled="afterEnter">
      <div class="chat-room-item-container row" v-for="(chat, idx) in chatsFiltered" :key="chat.room.id" :data-index="idx">
        <div style="dispaly: inline-block; text-align: center">
          <!-- 채팅방 멤버수에 따라 다른 형태의 프로필 모양 -->
          <div v-if="chat.room.members.length == 1">
            <profile-img :imgUrl="chat.room.members[0].profile.profile" width=" 50px" />
          </div>
          <div v-if="chat.room.members.length == 2" style="width: 50px; height: 60px">
            <div style="position: relative">
              <div v-if="!chat.img">
                <profile-img :imgUrl="chat.room.members[0].profile.profile" class="two-friends-first-img" width="30px" :radius="3" />
                <profile-img :imgUrl="chat.room.members[1].profile.profile" width=" 30px" class="two-friends-second-img" :radius="3" />
              </div>
              <div v-else>
                <profile-img :imgUrl="'https://ifh.cc/g/qKgD7C.png'" width=" 30px" />
              </div>
            </div>
          </div>
          <div v-if="chat.room.members.length == 3" style="width: 50px; height: 50px">
            <div style="position: relative">
              <profile-img :imgUrl="chat.room.members[0].profile.profile" class="three-friends-first-img" width=" 25px" />
              <profile-img :imgUrl="chat.room.members[1].profile.profile" width=" 25px" class="three-friends-second-img" :radius="4" />
              <profile-img :imgUrl="chat.room.members[2].profile.profile" width=" 25px" class="three-friends-third-img" :radius="4" />
            </div>
          </div>
          <div v-if="chat.room.members.length >= 4" style="width: 50px; height: 50px">
            <div style="position: relative">
              <profile-img :imgUrl="chat.room.members[0].profile.profile" class="four-friends-first-img" width=" 21px" />
              <profile-img :imgUrl="chat.room.members[1].profile.profile" width=" 21px" class="four-friends-second-img" :radius="5" />
              <profile-img :imgUrl="chat.room.members[2].profile.profile" width=" 21px" class="four-friends-third-img" :radius="5" />
              <profile-img :imgUrl="chat.room.members[3].profile.profile" width=" 21px" class="four-friends-forth-img" :radius="5" />
            </div>
          </div>
        </div>
        <!--채팅방 정보 : 채팅방이름과 마지막 메세지, 안읽은 메세지수 -->
        <div class="chat-info-container row" @click="goChat(chat)">
          <chat-list-info :chatInfo="chat" />
          <div class="box row chat-detail-info">
            <div class="received-time">{{ messageSentTime(chat.recentChatMessage.sentAt) }}</div>
            <div v-show="chat.unreadNumber" class="message-cnt box">{{ chat.unreadNumber }}</div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProfileImg from "@/components/common/ProfileImg.vue";
import ChatListInfo from "@/components/chats/ChatListInfo.vue";
import Hangul from "hangul-js";

export default {
  name: "ChatList",
  components: {
    ProfileImg,
    ChatListInfo,
  },
  data() {
    return {
      filter: "",
      chatsFiltered: [],
      filterStatus: false,
    };
  },
  created() {
    this.chatsFiltered = this.chats;
    this.$store.dispatch("chat/changeMainPage", "chats", { root: true });
  },
  computed: {
    ...mapState("chat", ["roomStatus"]),
    ...mapState("userStore", ["userInfo"]),
    ...mapState("socket", ["stompChatListClient", "stompChatListConnected", "createChatRoomStatus", "chats"]),
  },
  methods: {
    openChatCreationModal() {
      this.$store.dispatch("modal/openChatCreationModal", "open", { root: true });
    },
    goChat(chat) {
      this.$store.dispatch("socket/goChat", chat, { root: true });
    },

    messageSentTime(time) {
      return this.$moment(time).format("LT");
    },
    // 트랜지션 시작에서 인덱스*100ms 만큼의 딜레이 부여
    beforeEnter(el) {
      this.$nextTick(() => {
        if (!this.addEnter) {
          // 추가가 아니라면 딜레이 적용
          el.style.transitionDelay = 100 * parseInt(el.dataset.index, 10) + "ms";
        } else {
          // 추가라면 플래그 제거만
          this.addEnter = false;
        }
      });
    },
    // 트랜지션을 완료하거나 취소할 때는 딜레이를 제거합니다.
    afterEnter(el) {
      el.style.transitionDelay = "";
    },
    // 목록에서 삭제시 애니메이션을 보기위한 테스트 함수입니다.
    deleteMessage(id) {
      const idx = this.chats.findIndex(function (item) {
        return item.room.id == id;
      });
      this.chats.splice(idx, 1);
    },
    // 채팅방 검색 필터
    filterOn() {
      this.filterStatus = !this.filterStatus;
    },
    setFilter() {
      let filteredChats = [];
      if (this.filter != "") {
        this.chats.forEach((e) => {
          if (Hangul.search(e.room.roomname, this.filter) >= 0) {
            filteredChats.push(e);
          }
        });
        return (this.chatsFiltered = filteredChats);
      }
      return (this.chatsFiltered = this.chats);
    },
  },
};
</script>
<style scoped>
/* 최상단 컨테이너 */
.chat-room-list-outer-container {
  display: block;
  padding-top: 20px;
  background-color: #ffffff;
  border-left: 2px solid #9eac95;
  border-right: 2px solid #9eac95;
  font-size: 15px;
}

/* 상단바 */
.header {
  justify-content: space-between;
}
.header-icon-container {
  width: 75px;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
}
.header > span {
  color: #749f58;
  font-size: 25px;
  font-weight: bold;
  padding-left: 20px;
}
.header div {
  font-size: 23px;
  font-weight: bold;
  /* margin-right: 20px; */
}
.iconify {
  padding: 7px;
  border-radius: 15px;
}
.iconify:hover {
  background-color: #e7f7dd;
  cursor: pointer;
}

/* 채팅방 검색 */
.chat-list-search {
  text-align: center;
  border-radius: 20px;
  height: 35px;
  background: #d8eec0;
  align-items: center;
  justify-content: center;
  margin: 10px 10px;
  margin-bottom: 10px;
}
.chat-list-search > input {
  border: none;
  border-radius: 20px;
  padding: 0 8%;
  width: 90%;
  background: #d8eec0;
  font-size: 20px;
}
.chat-list-search > input::placeholder {
  font-size: 17px;
  color: #749f58;
}
.chat-list-search > input:focus {
  outline: none;
}

/* 채팅방 목록 */
.chat-room-list-container {
  padding: 20px 0;
  text-align: left;
  display: block;
  height: 82vh;
  overflow: auto;
}
.chat-room-list-container::-webkit-scrollbar {
  background-color: #ffffff;
  width: 18px;
}
.chat-room-list-container::-webkit-scrollbar-track {
  background-color: #ffffff;
  width: 10px;
}
.chat-room-list-container::-webkit-scrollbar-thumb {
  background-color: #b8c8ae;
  border-radius: 10px;
  width: 10px;
  background-clip: padding-box;
  border: 5px solid transparent;
}
.chat-room-list-container > span {
  margin-bottom: 100px;
}

/* 채팅방 요소 */
.chat-room-item-container {
  padding: 10px 0;
  align-items: center;
  padding-left: 20px;
  cursor: pointer;
}
.chat-room-item-container img {
  width: 50px;
  height: 50px;
}
.chat-room-item-container:hover {
  background-color: #e7f7dd;
}
.chat-info-container {
  justify-content: space-between;
  width: 80%;
}
.received-time {
  color: #90949b;
  font-size: 11px;
  padding-top: 1px;
}
.message-cnt {
  background-color: #e80c4e;
  color: #ffffff;
  text-align: right;
  padding: 3px 7px;
  font-weight: bold;
  border-radius: 20px;
  margin-top: 5px;
  font-size: 12px;
}
.chat-detail-info {
  text-align: right;
}
@media (max-width: 1600px) {
  .chat-info-container {
    justify-content: space-between;
    width: 75%;
  }
}

/* 다중 프로필 */
.two-friends-first-img {
  position: relative;
  top: -12px;
  left: -30px;
}
.two-friends-second-img {
  position: relative;
  top: 4px;
  left: -14px;
}
.three-friends-first-img {
  position: relative;
  top: 2px;
  left: -2px;
  z-index: 10;
}
.three-friends-second-img {
  position: relative;
  top: -10px;
  left: -42px;
}
.three-friends-third-img {
  position: relative;
  top: -10px;
  left: -23px;
}
.four-friends-first-img {
  position: relative;
  top: 4px;
  left: -14px;
  z-index: 3;
}
.four-friends-second-img {
  position: relative;
  top: -21px;
  left: -17px;
  z-index: 3;
}
.four-friends-third-img {
  position: relative;
  top: 1px;
  left: -40px;
}
.four-friends-forth-img {
  position: relative;
  top: 1px;
  left: -18px;
}

/* 트랜지션 그룹 모션 적용 */
.v-enter-active,
.v-leave-active,
.v-move {
  transition: opacity 0.5s, transform 0.5s;
}
.v-leave-active {
  position: absolute;
}
.v-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
