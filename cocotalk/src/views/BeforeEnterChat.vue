<template>
  <div class="chat-default-container row">
    <img src="../images/chat_default_mococo.png" alt="" />
    <div class="break"></div>
    <span style="">채팅을 시작해보세요.</span>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      now: this.$route.params.roomId,
    };
  },
  created() {
    this.$store.dispatch("chat/deleteRoomId", { mainPage: this.roomStatus.mainPage, roomId: "" }, { root: true });
  },
  computed: {
    ...mapState("chat", ["roomStatus"]),
    ...mapState("chat", ["friends"]),
  },
};
</script>

<style scoped>
.chat-default-container {
  background-color: #e6eede;
  height: 100vh;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  border-right: 2px solid #9eac95;
  position: relative;
}
.chat-default-container > img {
  padding-right: 50px;
}
.chat-default-container > span {
  padding-bottom: 150px;
  font-size: 25px;
  font-weight: bold;
  color: #90949b;
}
</style>
