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
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #2d2d2d;

}

.logo button {
  background-color: #2d2d2d;
  border: none;
  width: 100%; /* 버튼의 너비 설정 */
  height: 80%; /* 버튼의 높이 설정 */
  display: flex;
  justify-content: center; /* 버튼 내부 내용(로고)을 수평 가운데 정렬 */
  align-items: center; /* 버튼 내부 내용(로고)을 수직 가운데 정렬 */
}

.logo img {
  width: 140px !important; /* 로고 이미지의 너비 설정 */
  height: auto; /* 이미지의 높이는 자동으로 비율에 맞게 조정 */
  border: none;
  background-color: #2d2d2d;
  cursor: pointer;
  display: block; /* 필요 시 블록 요소로 설정하여 정렬 문제 해결 */
}

.search-bar {
  position: relative;

  top: 20%;
  left: 20%;
  transform: translate(-50%, -50%);
  margin-right: 12px;
}

.search-bar input {
  width: 600px;
  height: 30px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 12px;
}

.search-bar button {
  padding: 8px 12px;
  background-color: #008cf0;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  height: 40px;
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
