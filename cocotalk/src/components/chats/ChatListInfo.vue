<template>
  <div class="box">
    <div class="chat-list-roomname row">
      <div v-if="chatInfo.room.type == 0">{{ privateRoomname }}</div>
      <div v-else>{{ chatInfo.room.roomname }}</div>
      <div class="member-cnt">{{ chatInfo.room.members.length }}</div>
    </div>
    <!-- 채팅방 최근 메시지 -->
    <div v-if="chatInfo.recentChatMessage.type < 4" class="chat-list-info-message">{{ chatInfo.recentChatMessage.content }}</div>
    <div v-else-if="chatInfo.recentChatMessage.type == 4" class="chat - list - info - message">사진을 보냈습니다.</div>
    <div v-else-if="chatInfo.recentChatMessage.type == 5" class="chat - list - info - message">동영상을 보냈습니다.</div>
    <div v-else-if="chatInfo.recentChatMessage.type == 6" class="chat - list - info - message">파일을 보냈습니다.</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ChatListInfo",
  props: {
    chatInfo: Object,
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    privateRoomname() {
      let roomname;
      this.chatInfo.room.members.forEach((e) => {
        if (e.userId != this.userInfo.id) {
          roomname = e.username;
        }
      });
      return roomname;
    },
  },
};
</script>

<style scoped>
.box > div {
  padding-left: 10px;
  font-size: 14px;
  text-align: left;
}
.chat-list-roomname {
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 140px;
  height: 22px;
}
.chat-list-rommname > div {
  width: 140px;
}
.chat-list-info-message {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 140px;
  height: 20px;
  padding-top: 0px;
}
.member-cnt {
  color: #a2b1ab;
  padding-left: 5px;
  line-height: 20px;
}
</style>
