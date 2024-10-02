<script setup>
import ChatButton from '../components/chats/ChatButton.vue'
import ChatWindow from '../components/chats/ChatWindow.vue'
import { ref } from 'vue'

const isChatOpen = ref(false)
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
}
</script>

<template>
  <div>
    <!-- Chat Components -->
    <ChatButton @toggle-chat="toggleChat" :isOpen="isChatOpen" />
    <ChatWindow v-if="isChatOpen" @toggle-chat="toggleChat" :isOpen="isChatOpen" />
  </div>
</template>