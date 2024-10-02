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

  <RouterView />
</template>