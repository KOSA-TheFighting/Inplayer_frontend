<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/layouts/HeaderComponent.vue';
import SidebarComponent from './components/layouts/SidebarComponent.vue';
import FooterComponent from './components/layouts/FooterComponent.vue';
</script>

<template>
  <div class="main-page">
    <HeaderComponent/>

    <div class="main-container">
      <SidebarComponent/>

      <main class="content">
        <RouterView />
      </main>
    </div>

    <FooterComponent/>
  </div>
</template>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;
  color: #fff;
  background-color: #1c1c1c;
}

.main-container {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
  background-color: #2d2d2d;
  padding: 20px;
  overflow-y: auto;
}
</style>
