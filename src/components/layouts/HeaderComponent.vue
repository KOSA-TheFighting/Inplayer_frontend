<!-- HeaderComponent.vue -->
<template>
  <header class="main-header">
    <div class="logo">
      <img src="@/assets/Inplayer.png" alt="Logo" />
    </div>
    <nav>
      <button @click="login">로그인</button>
      <button @click="startBroadcast">방송하기</button>
    </nav>
  </header>
</template>

<script setup>
const login = () => {
  console.log('Login clicked');
};

const startBroadcast = () => {
  console.log('Start Broadcast clicked');
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
