<!--
This component will render the chat conversation (messages from both the user and the bot).
It also ensures smooth scrolling as new messages are added.
 -->

<script setup>
import ChatBox from './ChatBox.vue';
import InputBar from './InputBar.vue';
import QuestionCard from './QuestionCard.vue';
</script>

<template>
  <transition name="slide-up">
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
          <p>{{ title }}</p>
        </div>

        <button @click="toggleChat" class="btn-end">End</button>
      </div>

      <ChatBox :messages="messages" ref="chatBox"/>

      <QuestionCard v-if="currentQuestion" :question="currentQuestion" @answer-selected="handleAnswerSelected"/>

      <InputBar v-if="!currentQuestion" @message-sent="handleUserMessage"/>
    </div>
  </transition>
</template>

<script>

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      messages: [
        {text: 'Welcome to the Sorting Hat Test!', isUser: false},
        {text: 'What is your name?', isUser: false},
      ],
      askingName: true,
      currentQuestion: null, // Tracks the current question to display
      title: "Sorting hat",
      questions: [],
      loading: true,
      scores: {g: 0, r: 0, h: 0, s: 0},
      houseDescriptions: {
        g: "Gryffindor — bravery, helping others and chivalry",
        r: "Ravenclaw — intelligence, knowledge, planning ahead and wit",
        h: "Hufflepuff — hard work, patience, loyalty and fair play",
        s: "Slytherin — ambition, cunningness, heritage and resourcefulness",
      },
      randomResponses: [
        "Interesting choice!",
        "That's a unique perspective!",
        "Fascinating decision!",
        "I see what you did there!",
        "That's quite intriguing!",
        "Very interesting!",
        "That's a bold choice!",
        "You've made an interesting selection!",
        "I like your reasoning behind that!",
        "What a thoughtful choice!",
      ],
    };
  },
  mounted() {
    this.fetchQuestions()
  },
  methods: {
    toggleChat() {
      this.$emit('toggle-chat');
    },
    handleUserMessage(message) {
      if (this.askingName) {
        this.messages.push({text: message, isUser: true});

        setTimeout(() => {
          this.messages.push({text: `Nice to meet you, ${message}! Let’s begin the test...`, isUser: false});
          this.askingName = false;
          this.scrollToBottom();
          this.showNextQuestion();
        }, 1000);
      }
    },
    handleAnswerSelected(answer) {

      // Randomly select a response
      const randomIndex = Math.floor(Math.random() * this.randomResponses.length);
      const randomResponse = this.randomResponses[randomIndex];

      // Handle the selected answer and continue the chat flow
      this.messages.push({
        text: `You selected: ${answer.title}`,
        isUser: true,
      });

      // Update scores based on selected answer
      this.scores.g += answer.scores.g || 0;
      this.scores.r += answer.scores.r || 0;
      this.scores.h += answer.scores.h || 0;
      this.scores.s += answer.scores.s || 0;

      setTimeout(() => {
        this.messages.push({
          text: randomResponse,
          isUser: false,
        });

        // Show the next question or end the quiz
        this.showNextQuestion();
      }, 1000);
    },

    showNextQuestion() {
      // If there are questions left, show the next one
      if (this.questions.length > 0) {
        this.currentQuestion = this.questions.shift();
      } else {
        this.currentQuestion = null;
        this.displayResults();
      }
    },

    displayResults() {
      // Determine which house has the highest score
      const houseScores = Object.entries(this.scores);
      const highestHouse = houseScores.reduce((max, house) => (house[1] > max[1] ? house : max), [null, 0]);

      // Get the description for the house
      const houseDescription = this.houseDescriptions[highestHouse[0]] || "No house selected.";

      this.messages.push({
        text: `That concludes the Sorting Hat Test! You belong to: ${houseDescription}`,
        isUser: false
      });
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const chatBox = this.$refs.chatBox;
        chatBox.scrollTop = chatBox.scrollHeight;
      });
    },
    async fetchQuestions() {
      try {
        const response = await fetch('/src/assets/questions.json');
        const data = await response.json();
        this.questions = data;
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
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
