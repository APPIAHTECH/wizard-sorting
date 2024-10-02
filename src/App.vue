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
</style>/