<!--
This component renders the conversation and handles automatic scrolling.
 -->
<template>
  <div class="chat-box" ref="chatBox">
    <ChatMessage
        v-for="(msg, index) in messages"
        :key="index"
        :message="msg.text"
        :isUser="msg.isUser"
    />
  </div>
</template>

<script>
import ChatMessage from './ChatMessage.vue';

export default {
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
  components: {
    ChatMessage,
  },
  updated() {
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  },
  methods: {
    scrollToBottom() {
      const chatBox = this.$refs.chatBox;
      chatBox.scrollTop = chatBox.scrollHeight;
    },
  },
};
</script>

<style scoped>
.chat-box {
  display: flex;
  flex-direction: column;
  padding: 14px 18px 0px;
  height: 100%;
  overflow-y: auto;
  background-color: white;
}
</style>
