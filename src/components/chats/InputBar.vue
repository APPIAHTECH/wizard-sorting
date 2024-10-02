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
}

/* Gradient border on focus */
.input-bar-focused {
  border-image: linear-gradient(90deg, #ff7e5f, #feb47b, #86a8e7, #91eae4) 1;
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
</style>
