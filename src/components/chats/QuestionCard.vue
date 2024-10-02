<!--
 This component will be used to display each question along with its multiple-choice answers.
 It emits an event when the user selects an answer.
 -->
<template>
  <div class="question-card">
    <h2 class="question-title">{{ question.title }}</h2>
    <div class="answers">
      <button
          v-for="(answer, index) in question.answers"
          :key="index"
          @click="selectAnswer(answer)"
          class="answer-button"
      >
        {{ answer.title }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionCard",
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  methods: {
    selectAnswer(answer) {
      this.$emit("answer-selected", answer);
    },
  },
};
</script>

<style scoped>
.question-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  max-width: 100%;
  height: 100%;
  overflow: auto;
}

.question-title {
  font-size: 1.25rem;
  margin-bottom: 15px;
  line-height: 1.5;
  word-wrap: break-word;
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
}

.answer-button {
  padding: 15px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: left;
  font-size: 1rem;
  line-height: 1.5;
  word-wrap: break-word;
}

.answer-button:hover {
  background-color: #e0e0e0;
}

.answer-button:focus {
  outline: none;
  background-color: #d0d0d0;
}
</style>
