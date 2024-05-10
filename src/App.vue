<template>
  <div class="app">
    <header class="app__header">
      <img
        class="app__logo"
        src="/eurovision_song_contest_logo.webp?url"
        alt="Eurovision Song Contest"
      />
      <span class="app__header-title">Final 2024</span>
      <span class="app__header-subtitle">Your private ranking</span>
    </header>
    <RouterView />
    <footer class="app__footer">
      <span>Made with 🍺 by <a href="https://mihau.co/" target="_blank">mihau.co</a></span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style lang="scss">
.app {
  max-width: 430px;
  margin: 0 auto;
  overflow: hidden;
  padding-bottom: 30px;

  &__header {
    padding: 15px 15px 15px;
  }

  &__header-title,
  &__header-subtitle {
    display: block;
    font-weight: 600;
    text-align: center;
    letter-spacing: 2px;
    padding-left: 2px;
    text-transform: uppercase;
  }

  &__header-title {
    font-size: 14px;
    margin-top: 10px;
  }

  &__header-subtitle {
    font-size: 12px;
  }

  &__logo {
    display: block;
    width: auto;
    height: 70px;
    margin: 0 auto;
  }

  &__footer {
    background: linear-gradient(to right, #373b44, #4286f4);
    padding: 5px 15px;
    color: #fff;
    font-size: 12px;
    box-shadow: 0 0 10px 0 #000;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    max-width: 430px;
    z-index: 100;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    a,
    a:visited,
    a:hover {
      color: #fff;
    }
  }
}
</style>
