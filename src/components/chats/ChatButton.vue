<!--
This component will render the chat conversation (messages from both the user and the bot).
It also ensures smooth scrolling as new messages are added.
 -->
<template>
  <div class="chat-button" @click="toggleChat">
    <img src="@/assets/chat-icon.svg" alt="Chat Icon" />
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleChat() {
      this.$emit('toggle-chat');
    },
  },
};
</script>

<style scoped>
.chat-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #007aff;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.chat-button img {
  width: 32px;
  height: 32px;
}

.chat-button:hover {
  transform: scale(1.05);
}
</style>
