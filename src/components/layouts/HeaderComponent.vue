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
import { ref, watch } from 'vue'
import router from '@/router/index.js'
import { useMemberStore } from '@/stores/member'
import { useStreamStore } from '@/stores/stream'
import { useRoute } from 'vue-router'

const memberStore = useMemberStore()
const streamStore = useStreamStore()
const searchQuery = ref('')
const route = useRoute()

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
    streamStore.performSearch(searchQuery.value)
  } else {
    alert('검색어를 입력해주세요')
  }
}

watch(
  () => route.query.search,
  newSearch => {
    if (newSearch) {
      searchQuery.value = newSearch
    } else {
      searchQuery.value = '' // 검색어 없으면 input 초기화
    }
  },
)
</script>

<style scoped>
.main-header {
  display: flex;
  justify-content: space-between; /* 로고, 검색창, 네비게이션 간격 배분 */
  align-items: center;
  padding: 20px 40px;
  background-color: #2d2d2d;
}

button.logo {
  background-color: #2d2d2d;
  border: none;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0px;
}

.logo img {
  width: 140px !important;
  height: auto;
  border: none;
  background-color: #2d2d2d;
  cursor: pointer;
  display: block;
}

.search-bar {
  display: flex;
  align-items: center; /* 검색창과 버튼 수직 정렬 */
  flex: 1; /* 중앙 정렬을 위해 검색창이 넓이를 차지 */
  justify-content: center; /* 검색창을 수평 중앙에 위치 */
}

.search-bar input {
  width: 450px;
  height: 30px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px; /* 왼쪽 모서리 둥글게 */
}

.search-bar button {
  padding: 8px 16px;
  background-color: #008cf0;
  color: #fff;
  border: none;
  border-radius: 0 4px 4px 0; /* 오른쪽 모서리 둥글게 */
  cursor: pointer;
  height: 40px;
}

.search-bar button:hover {
  background-color: #569bfc;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.main-header nav {
  display: flex;
  align-items: center;
  gap: 10px; /* 버튼 간격 추가 */
}

.main-header nav button {
  padding: 10px 16px;
  background-color: #eba50d;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.main-header nav button:hover {
  background-color: #e13865;
  color: #ffffff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.main-header nav button:active {
  background-color: #00b08c;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(1px);
}
</style>
