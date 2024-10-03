<script setup>
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125"/>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/chat">Chat</RouterLink> <!-- Added link to Chat -->
      </nav>
    </div>
  </header>

  <RouterView/>
</template>

<style>
body, p, h1,h2,h3,h4,h5,h6 {
  font-family: 'Roboto', "Lato", sans-serif;
  font-weight: 100;
  font-style: normal;
}
p {
  font-weight: 400;
}
h1,h2,h3,h4,h5,h6{
  font-weight: 700;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px); /* Start from below */
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(-10px); /* Move up a little */
}

.fade-enter-active {
  animation: bounce 0.3s forwards ease-in-out;
}

@keyframes bounce {
  0% {
    transform: translateY(20px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

html {
  scroll-behavior: smooth;
}

</style>/