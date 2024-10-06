<!--
 This component will be used to display each question along with its multiple-choice answers.
 It emits an event when the user selects an answer.
 -->

<template>
  <div class="question-card" ref="questionCard">
    <div class="progress-container">
      <div class="progress-bar">
        <div
            class="progress-fill"
            :style="{ width: progressBarWidth }"
        ></div>
      </div>
      <p class="progress-text">
        {{ progressText }}
      </p>
    </div>
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
import {computed} from 'vue';
import {useStore} from 'vuex';

export default {
  name: "QuestionCard",
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const totalQuestions = computed(() => store.getters.getTotalQuestions);
    const currentIndex = computed(() => store.state.currentQuestionIndex); // Ensure this exists in your state

    const progressBarWidth = computed(() => {
      return `${((currentIndex.value) / totalQuestions.value) * 100}%`;
    });

    const remainingQuestions = computed(() => {
      return store.getters.getRemainingQuestions
    });

    // New computed property for the progress text
    const progressText = computed(() => {
      if (remainingQuestions.value === 0) {
        return "Last question";
      }
      return `${remainingQuestions.value} of ${totalQuestions.value} Questions left`;
    });

    return {
      totalQuestions,
      currentIndex,
      progressBarWidth,
      remainingQuestions,
      progressText
    };
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
  padding: 20px;
  max-width: 100%;
  height: 850px;
  overflow: auto;
}

.progress-bar {
  background-color: #f1f1f1;
  border-radius: 14px;
  height: 5px;
}

.progress-fill {
  background-color: rgb(48, 77, 219);
  height: 100%;
  border-radius: 10px;
  transition: width 0.3s ease;
}

.progress-text {
  text-align: right;
  margin-top: 5px;
  font-size: 0.9rem; /* Adjust size as necessary */
  color: #333; /* Change color if needed */
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

.question-label {
  color: rgb(126, 142, 158);
  font-size: 11px;
  font-weight: 400;
  line-height: 19px;
  box-sizing: border-box;
  margin-bottom: 4px;
}

.progress-text {
  color: rgb(126, 142, 158);
  font-size: 11px;
  font-weight: 400;
  line-height: 19px;
  margin-bottom: 4px;
}

/* Media Queries for Responsive Design */
@media (max-width: 1024px) {
  .question-card {
    height: 700px;
    padding: 15px;
  }

  .question-title {
    font-size: 1.1rem;
  }

  .answer-button {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .question-card {
    height: 600px;
  }

  .question-title {
    font-size: 1rem;
  }

  .answer-button {
    font-size: 0.85rem;
    padding: 12px;
  }

  .progress-text {
    font-size: 0.8rem;
  }
}

@media (max-width: 640px) {
  .question-card {
    height: 550px;
    margin: 10px 0;
    padding: 10px;
  }

  .question-title {
    font-size: 0.95rem;
  }

  .answer-button {
    font-size: 0.8rem;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .question-card {
    height: 480px;
  }

  .question-title {
    font-size: 0.85rem;
  }

  .answer-button {
    font-size: 0.75rem;
    padding: 8px;
  }
}
</style>
