<!--
This component will render the chat conversation (messages from both the user and the bot).
It also ensures smooth scrolling as new messages are added.
 -->

<template>
  <div v-if="isOpen" class="chat-window">
    <div class="chat-header">
      <div class="chat-header-logo-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"
             style="transform: scale(1.2);">
          <path
              d="M13.982 8.277a.323.323 0 0 0 .185.057.324.324 0 0 0 .304-.208l.519-1.35a.21.21 0 0 1 .12-.12l1.348-.518a.323.323 0 0 0 .15-.488.332.332 0 0 0-.158-.123l-1.341-.516a.209.209 0 0 1-.12-.12l-.518-1.348a.325.325 0 0 0-.608 0l-.52 1.349a.21.21 0 0 1-.119.12l-1.349.518a.325.325 0 0 0 0 .608l1.35.52a.21.21 0 0 1 .12.119l.518 1.349a.323.323 0 0 0 .12.151Zm-5.184 7.444a.648.648 0 0 0 .369.113.648.648 0 0 0 .608-.417l1.038-2.698a.418.418 0 0 1 .24-.24l2.697-1.037a.646.646 0 0 0 .3-.976.664.664 0 0 0-.317-.245l-2.681-1.032a.418.418 0 0 1-.24-.24L9.775 6.252a.651.651 0 0 0-1.216 0L7.521 8.95a.418.418 0 0 1-.24.24l-2.697 1.037a.651.651 0 0 0 0 1.215l2.699 1.038a.42.42 0 0 1 .239.24l1.037 2.697c.047.123.13.23.239.304Z"
              fill="url(#gradient_123)"></path>
          <defs>
            <linearGradient id="gradient_123" x1="7.4391" y1="9.07539" x2="20.684" y2="11.1606"
                            gradientUnits="userSpaceOnUse">
              <stop stop-color="#4853E6"></stop>
              <stop offset="0.598958" stop-color="#B870F1"></stop>
            </linearGradient>
          </defs>
        </svg>
        <p>{{ store.getters.getChatWindowTitle }}</p>
      </div>

      <button @click="toggleChat" class="btn-end">End</button>
    </div>

    <ChatBox :messages="messages" ref="chatBox"/>

    <QuestionCard v-if="currentQuestion" :question="currentQuestion" @answer-selected="handleAnswerSelected"/>

    <InputBar v-if="!currentQuestion" @message-sent="handleUserMessage"/>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useStore} from 'vuex';
import ChatBox from './ChatBox.vue';
import InputBar from './InputBar.vue';
import QuestionCard from './QuestionCard.vue';

const store = useStore();

const messages = computed(() => store.state.messages);
const askingName = computed(() => store.state.askingName);
const currentQuestion = computed(() => store.state.currentQuestion);
const scores = computed(() => store.state.scores);
const questions = computed(() => store.state.questions);
const loading = computed(() => store.state.loading);


const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const toggleChat = () => {
  store.commit('RESET_CHAT');
};

const handleUserMessage = (message) => {
  if (askingName.value) {
    store.commit('ADD_MESSAGE', {text: message, isUser: true});

    setTimeout(() => {
      store.commit('ADD_MESSAGE', {text: `Nice to meet you, ${message}! Let’s begin the test...`, isUser: false});
      store.commit('SET_ASKING_NAME', false);
      showNextQuestion();
    }, 1000);
  } else {
    // Game concluded no more questions to ask then
    store.commit('ADD_MESSAGE', {text: message, isUser: true});
    store.commit('ADD_MESSAGE', {
      text: "Please click the END button on the top right corner to reset and play again...",
      isUser: false
    });
  }
};

const handleAnswerSelected = (answer) => {
  const randomIndex = Math.floor(Math.random() * store.getters.getRandomResponses.length);
  const randomResponse = store.getters.getRandomResponses[randomIndex];

  store.commit('ADD_MESSAGE', {text: `You selected: ${answer.title}`, isUser: true});

  store.commit('UPDATE_SCORES', answer.scores);

  setTimeout(() => {
    store.commit('ADD_MESSAGE', {text: randomResponse, isUser: false});
    showNextQuestion();
  }, 1000);
};

const showNextQuestion = () => {
  if (questions.value.length > 0) {
    store.commit('SET_CURRENT_QUESTION', questions.value.shift());
    store.commit('INCREASE_QUESTION_INDEX');
  } else {
    store.commit('SET_CURRENT_QUESTION', null);
    displayResults();
  }
};

const displayResults = () => {
  const houseScores = Object.entries(scores.value);
  const highestHouse = houseScores.reduce((max, house) => (house[1] > max[1] ? house : max), [null, 0]);
  const houseDescription = store.state.houseDescriptions[highestHouse[0]] || "No house selected.";

  store.commit('ADD_MESSAGE', {
    text: `That concludes the Sorting Hat Test! You belong to: ${houseDescription}`,
    isUser: false
  });
};

// Fetch questions on mount
store.dispatch('fetchQuestions');
</script>

<style scoped>

.chat-header-logo-container {
  display: flex;
  flex-flow: row nowrap;
}

.btn-end {
  background-color: rgb(49, 67, 81);
  color: white;
  margin-left: auto;
  border-radius: 100px;
  border: 1px solid rgb(49, 67, 81);
  transition: 200ms;
  min-width: 56px;
  max-width: 150px;
  height: 28px;
  cursor: pointer;
}

.btn-end:hover {
  background-color: rgb(49, 67, 81);
  color: white;
}

.chat-window {
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 375px;
  height: 85vh;
  border: 1px solid transparent;
  box-shadow: rgba(194, 133, 255, 0.2) 0px 0px 0px 2px;
  border-radius: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  color: black;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 2px solid #F1F3F5;
  transition: 300ms;
  background-color: white;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter, .slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
