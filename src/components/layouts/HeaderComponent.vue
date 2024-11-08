<!-- HeaderComponent.vue -->
<template>
  <header class="main-header">
    <button class="logo" @click="goToHomePage">
      <img src="@/assets/Inplayer.png" alt="Logo" />
    </button>
    <nav>
      <button @click="login">로그인</button>
      <button @click="startBroadcast">방송하기</button>
    </nav>
  </header>
</template>

<script setup>

import router from '@/router/index.js'

const login = () => {
  router.push({ name: 'login' });
};

const startBroadcast = () => {
  router.push({ name: 'broadcast' });
};

const goToHomePage = () => {
  router.push({ name: 'home' });
};


</script>

<style scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #2d2d2d;
}

.main-header .logo {
  font-size: 24px;
  color: #f0a500;
  cursor: pointer;
}

.main-header nav button {
  margin-left: 10px;
  padding: 8px 12px;
  background-color: #f0a500;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
