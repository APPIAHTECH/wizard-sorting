<!--
The component for a single message in the chat.
 -->

<template>
  <div :class="['chat-container', isUser ? 'user' : 'bot']">
    <!-- Render the AI assistant label when the bot is speaking -->
    <div v-if="!isUser" class="bot-label">Hat assistant</div>
    <div :class="['chat-message', isUser ? 'user' : 'bot']">
      <p>{{ message }}</p>
    </div>
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
.chat-container {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
}

.chat-container.user {
  align-items: flex-end;
}

.chat-container.bot {
  align-items: flex-start;
}

.chat-message {
  padding: 20px 24px;
  margin: 0 0px 24px;
  border-radius: 10px;
  word-wrap: break-word;
  box-sizing: border-box;
  background-color: #f1f3f5;
  border-color: #f1f3f5;
  max-width: 75%;
}

.chat-message.user {
  background-color: rgb(48, 77, 219);
  border-bottom-right-radius: 4px;
  color: white;
}

.bot-label {
  color: rgb(126, 142, 158);
  font-size: 11px;
  font-weight: 400;
  line-height: 19px;
  box-sizing: border-box;
  margin-bottom: 4px;
}
</style>
