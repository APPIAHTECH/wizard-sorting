<template>
  <transition name="fade-in-slide-up">
    <div v-if="showIntro" class="introduction-modal">
      <div class="introduction-content">
        <h2>Welcome to Facing the Sorting Hat!</h2>
        <p>In this project, you’ll take on the challenge of sorting students into their rightful wizarding houses based on their personalities. Let’s walk you through how it works:</p>
        <ul>
          <li><strong>Main Objective:</strong> Help students discover their houses by answering a series of questions. Each answer will earn points for a specific house.</li>
          <li><strong>How to Play:</strong>
            You’ll be asked multiple-choice questions. Choose answers that best describe the student's preferences or personality, and the sorting hat will calculate which house they belong to.
            Click the "Chat" button to start the Game!
          </li>
          <li><strong>Rules:</strong> Take your time with each question. Once an answer is selected, it’s final. Complete all the questions to reveal the student's house.</li>
        </ul>
        <button @click="closeIntro" class="close-btn"> Let’s Start Sorting!</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Introduction',
  data() {
    return {
      showIntro: true, // Initially show the introduction modal
    };
  },
  methods: {
    closeIntro() {
      this.showIntro = false; // Hide the modal when the user clicks the button
    },
  },
};
</script>

<style scoped>
.introduction-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.introduction-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: fadeIn 0.5s ease;
}

.introduction-content h2 {
  margin-bottom: 15px;
  color: #304dcb; /* Main title color */
}

.introduction-content p,
.introduction-content ul {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
}

.introduction-content ul {
  list-style-type: disc;
  padding-left: 20px;
}

.introduction-content li {
  margin-bottom: 10px;
}

.close-btn {
  background-color: #304dcb;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.close-btn:hover {
  background-color: #263b98;
}

/* Animation for modal fade-in and slide up */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transition for smooth appearance and exit */
.fade-in-slide-up-enter-active,
.fade-in-slide-up-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-in-slide-up-enter,
.fade-in-slide-up-leave-to /* .leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(20px);
}
</style>
