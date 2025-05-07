<script setup>
  import { RouterView } from 'vue-router'
  import AppHeader from './components/AppHeader.vue';
  import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <AppHeader/>
  <div class="content">
    <RouterView/>
  </div>
  <AppFooter/>
</template>

<style scoped>

</style>