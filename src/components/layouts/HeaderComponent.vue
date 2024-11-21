<!-- HeaderComponent.vue -->
<template>
  <header class="main-header">
    <button class="logo" @click="goToHomePage">
      <img src="@/assets/Inplayer1.png" alt="Logo" />
    </button>

    <!-- 검색창 -->
    <div class="search-bar">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        v-model="searchQuery"
        @keyup.enter="performSearch"
      />
      <button @click="performSearch">검색</button>
    </div>

    <nav>
      <button v-if="memberStore.isLoggedIn" @click="myChannel">MY 채널</button>
      <!-- 내 채널 버튼 추가, 로그인 상태에서만 표시 -->
      <button v-if="!memberStore.isLoggedIn" @click="login">로그인</button>
      <button v-if="memberStore.isLoggedIn" @click="logout">로그아웃</button>
      <button @click="startBroadcast">방송하기</button>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router/index.js'
import { useMemberStore } from '@/stores/member'

const memberStore = useMemberStore()
const searchQuery = ref('')

const login = () => {
  router.push({ name: 'login' })
}

const logout = () => {
  memberStore.logout()
}

const startBroadcast = () => {
  if (!memberStore.isLoggedIn) {
    alert('로그인이 필요한 서비스 입니다.')
    return
  }
  router.push({ name: 'broadcast', params: { stream_id: 0 } })
}

const myChannel = () => {
  router.push({ name: 'mychannel', params: '' }) // 내 채널 페이지로 이동
}

const goToHomePage = () => {
  router.push({ name: 'home' })
}

const performSearch = () => {
  if (searchQuery.value?.trim()) {
    router.push({
      name: 'searchResults',
      query: { search: searchQuery.value.trim() },
    })
  } else {
    alert('검색어를 입력해주세요')
  }
}
</script>

<style scoped>
.main-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #2d2d2d;
}

.main-header .logo img {
  width: auto;
  height: auto;
  cursor: pointer;
}

.search-bar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  border-radius: 4px;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #569bfc;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.main-header nav button {
  margin-left: 10px;
  padding: 10px 16px;
  background-color: #eba50d;
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
