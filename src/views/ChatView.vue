<template>
  <div>
    <!-- Chat Components -->
    <ChatButton @toggle-chat="toggleChat" :isOpen="isChatOpen"/>
    <transition name="fade">
      <ChatWindow v-if="isChatOpen" @toggle-chat="toggleChat" :isOpen="isChatOpen"/>
    </transition>
  </div>
</template>

<script setup>
import ChatButton from '../components/chats/ChatButton.vue'
import ChatWindow from '../components/chats/ChatWindow.vue'
import {ref} from 'vue'

const isChatOpen = ref(false)
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
}
</script>
