<!-- SidebarComponent.vue -->
<template>
  <aside class="sidebar">
    <button @click="goToAllChannels">전체 방송 목록</button>
    <button @click="goToCategory">카테고리</button>
    <button @click="goToFollowing">팔로잉</button>
    <button @click="goToRecommendedStreamers">추천 스트리머 목록</button>
    <button @click="goToNotices">공지사항 게시판</button>
  </aside>
</template>

<script setup>
const goToAllChannels = () => {
  console.log('Navigate to All Channels');
};

const goToCategory = () => {
  console.log('Navigate to Category');
};

const goToFollowing = () => {
  console.log('Navigate to Following');
};

const goToRecommendedStreamers = () => {
  console.log('Navigate to Recommended Streamers');
};

const goToNotices = () => {
  console.log('Navigate to Notices');
};
</script>

<style scoped>
.sidebar {
  background-color: #2d2d2d;
  padding: 20px;
  width: 200px;
  flex-shrink: 0;
}

.sidebar button {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  color: #f0a500;
  background-color: #444;
  border: none;
  text-align: left;
  cursor: pointer;
}
</style>
