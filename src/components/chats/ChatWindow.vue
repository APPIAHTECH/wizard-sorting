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
        <h3>{{ title }}</h3>
        <button
            @click="toggleChat">X
        </button>
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
      title: "Wizard Sorting Hat test",
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
.chat-window {
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 350px;
  height: 500px;
  background-color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #007aff;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter, .slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
