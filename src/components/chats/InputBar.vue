<!--
This component captures the user input and emits it to the parent.
 -->

<template>
  <div class="input-bar">
    <input
        type="text"
        v-model="userInput"
        @keyup.enter="sendMessage"
        placeholder="Type a message..."
    />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInput: '',
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
  background-color: #f9f9f9;
  border-top: 1px solid #ccc;
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
