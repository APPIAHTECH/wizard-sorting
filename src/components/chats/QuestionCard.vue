<!--
 This component will be used to display each question along with its multiple-choice answers.
 It emits an event when the user selects an answer.
 -->
<template>
  <div class="question-card" ref="questionCard">
    <p class="question-label">Please choose one option:</p>
    <h2 class="question-title">{{ question.title }}</h2>
    <div class="answers" ref="answersContainer">
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
      this.scrollToTop();
    },
    scrollToTop() {
      const card = this.$refs.questionCard;
      const answers = this.$refs.answersContainer;

      card.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      answers.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style scoped>
.question-card {
  background-color: #fff;
  padding: 20px;
  margin: 20px 0;
  max-width: 100%;
  height: 850px;
  overflow: auto;
  border-top: 2px solid #F1F3F5;
}

.question-title {
  font-size: 1.25rem;
  margin-bottom: 15px;
  line-height: 1.5;
  word-wrap: break-word;
  font-weight: 400;
  box-sizing: border-box;
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
}

.answer-button {
  padding: 15px;
  background-color: #121212;
  color: white;
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
  background-color: rgb(48, 77, 219);
}

.question-label{
  color: rgb(126, 142, 158);
  font-size: 11px;
  font-weight: 400;
  line-height: 19px;
  box-sizing: border-box;
  margin-bottom: 4px;
}
</style>
