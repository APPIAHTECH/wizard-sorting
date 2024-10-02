<!--
The component for a single message in the chat.
 -->

<template>
  <div :class="['chat-message', isUser ? 'user' : 'bot']">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    isUser: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.chat-message {
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  max-width: 75%;
  word-wrap: break-word;
}

.chat-message.user {
  background-color: #daf8cb;
  align-self: flex-end;
}

.chat-message.bot {
  background-color: #f1f0f0;
  align-self: flex-start;
}
</style>
