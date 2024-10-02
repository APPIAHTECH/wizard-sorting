<!--
This chat button component will render the chat conversation (messages from both the user and the bot).
It also ensures smooth scrolling as new messages are added.
 -->
<template>
  <div class="chat-button" @click="toggleChat">
    <!-- Conditional rendering based on isChatOpen -->
    <svg
        v-if="!isChatOpen"
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 60 60"
    >
      <path
          d="M41.216 29.026c0 3.576-.895 5.847-2.647 7.268l-.066.052c-.213.173-.448.362-.6.559a1.958 1.958 0 0 0-.311.562c-.086.233-.117.494-.144.719l-.008.062-.303 2.48c-.063.516-.102.834-.151 1.06a1.595 1.595 0 0 1-.04.151.091.091 0 0 1-.015.006 1.42 1.42 0 0 1-.137-.076 14.087 14.087 0 0 1-.868-.626l-2.98-2.244-.041-.03a3.046 3.046 0 0 0-.53-.343 2.061 2.061 0 0 0-.554-.17 3.13 3.13 0 0 0-.648-.016l-.054.002c-.496.023-1.014.034-1.553.034-4.41 0-7.28-.758-9.048-2.22-1.721-1.421-2.602-3.683-2.602-7.23 0-3.546.88-5.808 2.602-7.23 1.769-1.46 4.639-2.22 9.048-2.22 4.41 0 7.28.76 9.048 2.22 1.721 1.422 2.602 3.684 2.602 7.23Z"
          stroke="#fff"
          stroke-width="2"
          class="line-path"
      ></path>
    </svg>

    <svg
        v-else
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="61"
        viewBox="0 0 60 61"
        fill="none"
    >
      <path
          d="M38.125 27.625 30 35.375l-8.125-7.75"
          stroke="#fff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
      ></path>
    </svg>
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
  data() {
    return {
      isChatOpen: false, // State to track whether chat is open or not
    };
  },
  methods: {
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
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
  background-color: rgb(48, 77, 219);
  border-radius: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 100ms linear;
  color: white;
}

.chat-button:hover {
  transform: scale(1.15);
}
</style>
