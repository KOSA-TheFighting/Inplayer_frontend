<!-- HeaderComponent.vue -->
<template>
  <header class="main-header">
    <button class="logo" @click="goToHomePage">
      <img src="@/assets/Inplayer.png" alt="Logo" />
    </button>

    <!-- 검색창 -->
    <div class="search-bar">
      <input type="text" placeholder="검색어를 입력하세요" v-model="searchQuery" @keyup.enter="performSearch" />
      <button @click="performSearch">검색</button>
    </div>

    <nav>
      <button v-if="isLoggedIn" @click="myChannel">MY 채널</button> <!-- 내 채널 버튼 추가, 로그인 상태에서만 표시 -->
      <button @click="login">로그인</button>
      <button @click="startBroadcast">방송하기</button>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router/index.js'

const searchQuery = ref('');
const isLoggedIn = ref(false); // 로그인 상태를 나타내는 변수

const login = () => {
  // 로그인 상태를 업데이트
  isLoggedIn.value = true;
  router.push({ name: 'home' });// LoginView 페이지 제작 후 경로 변경해야됌.
};

const startBroadcast = () => {
  router.push({ name: 'broadcast' });
};

const myChannel = () => {
  router.push({ name: 'mychannel' }); // 내 채널 페이지로 이동
};

const goToHomePage = () => {
  router.push({ name: 'home' });
};

const performSearch = () => {
  if (searchQuery.value) {
    router.push({ name: 'searchResults', query: { q: searchQuery.value } });
  }
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

.main-header .logo img {
  width: auto;  /* 원하는 너비로 조정 */
  height: auto;  /* 비율에 맞게 높이를 자동으로 설정 */

}


.search-bar {
  flex: 1;
  display: flex;
  justify-content: center;
}

.search-bar input {
  width: 400px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
}

.search-bar button {
  padding: 8px 12px;
  background-color: #008cf0;
  color: #fff;
  border: none;
  cursor: pointer;
}

.main-header nav button {
  margin-left: 10px;
  padding: 10px 16px;
  background-color: #76cf22;
  color: #ffffff;
  border: none;
  border-radius: 6px; /* 둥근 모서리 추가 */
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s ease; /* 부드러운 트랜지션 효과 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 버튼에 그림자 추가 */
}

/* 호버 효과 */
.main-header nav button:hover {
  background-color: #e13865;
  color: #ffffff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px); /* 버튼이 살짝 떠오르는 효과 */
}

/* 클릭 효과 */
.main-header nav button:active {
  background-color: #00b08c;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(1px); /* 버튼이 눌리는 효과 */
}
</style>
