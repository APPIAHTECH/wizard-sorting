<!--
This component captures the user input and emits it to the parent.
 -->

<template>
  <div :class="['input-bar', { 'input-bar-focused': isFocused }]">
    <input
        class="input-bar-input"
        type="text"
        v-model="userInput"
        @keyup.enter="sendMessage"
        @focus="isFocused = true"
        @blur="isFocused = false"
        placeholder="Type a message here..."
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInput: '',
      isFocused: false, // Track whether the input is focused
    };
  },
  methods: {
    sendMessage() {
      if (this.userInput.trim()) {
        this.$emit('message-sent', this.userInput);
        this.userInput = '';
      }
    },
  },
};
</script>

<style scoped>
.input-bar {
  display: flex;
  padding: 10px;
  border-top: 2px solid #F1F3F5;
  transition: border .3s ease, box-shadow .3s ease;
}

/* Gradient border on focus */
.input-bar-focused {
  border-image: linear-gradient(90deg, #ff7e5f, #feb47b, #86a8e7, #91eae4) 1;
  box-shadow: 0 0 10px rgba(255, 126, 95, 0.5);
}

.input-bar-input:focus {
  outline: none;
}

.input-bar-input {
  margin: 0 0 0 20px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 17px;
  top: 1px;
  border: none;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Media Queries for Responsive Design */
@media (max-width: 768px) {
  .input-bar {
    padding: 8px;
  }

  .input-bar-input {
    font-size: 13px;
  }

  button {
    padding: 8px 16px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .input-bar {
    padding: 6px;
  }

  .input-bar-input {
    font-size: 12px;
  }

  button {
    padding: 6px 12px;
    font-size: 12px;
  }
}
</style>
