<!-- SidebarComponent.vue -->
<template>
  <aside class="sidebar">
    <button @click="goToAllChannelsPage">전체 방송 목록</button>
    <button @click="goToCategory">카테고리</button>
    <button @click="goToFollowing">팔로잉</button>
    <!-- 추천 스트리머 목록 -->
    <div v-if="recommendedStreamers.length" class="streamers-list">
      <h3>추천 스트리머</h3>
      <ul>
        <li v-for="streamer in recommendedStreamers" :key="streamer.id">
          <img :src="streamer.thumbnail" alt="Streamer Thumbnail" />
          <span>{{ streamer.name }} - {{ streamer.viewers }} viewers</span>
        </li>
      </ul>
    </div>
    <button @click="goToNotices">공지사항 게시판</button>

  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const recommendedStreamers = ref([]);

const goToAllChannelsPage = () => {
  router.push({ name: 'list' }); // 'ListView'는 라우터에 설정된 이름
};

const goToCategory = () => {
  console.log('Navigate to Category');
};

const goToFollowing = () => {
  console.log('Navigate to Following');
};

// 초기화 시 추천 스트리머 데이터 로드
recommendedStreamers.value = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `Streamer ${i + 1}`,
  viewers: Math.floor(Math.random() * 1000) + 1,
  thumbnail: 'https://via.placeholder.com/50',
}));


const goToNotices = () => {
  console.log('Navigate to Notices');
};
</script>

<style scoped>
.sidebar {
  background-color: #1f1f1f; /* 좀 더 짙은 배경 색상 */
  padding: 20px;
  width: 220px; /* 약간 더 넓게 조정 */
  flex-shrink: 0;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.4); /* 사이드바 그림자 */
  border-right: 1px solid #333; /* 경계선 추가 */
}

.sidebar button {
  width: 100%;
  padding: 12px 16px; /* 약간 더 여유로운 패딩 */
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background-color: #8388bd; /* 어두운 배경으로 변경 */
  border: 1px solid #444; /* 경계선 추가 */
  border-radius: 4px; /* 둥근 모서리 */
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease; /* 부드러운 전환 효과 */
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3); /* 버튼에 그림자 추가 */
}

/* 버튼 호버 효과 */
.sidebar button:hover {
  background-color: #3a3a3a; /* 배경색이 조금 밝아짐 */
  color: #ffd55a; /* 텍스트 색상 강조 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  transform: translateY(-2px); /* 약간 위로 올라가는 효과 */
}

/* 버튼 클릭 효과 */
.sidebar button:active {
  background-color: #2d2d2d; /* 클릭 시 약간 어두운 색 */
  color: #ffcc4d; /* 텍스트 색상 조정 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(1px); /* 살짝 눌리는 효과 */
}

/* 추천 스트리머 목록 스타일 */
.streamers-list {
  margin-top: 20px;
  padding-left: 10px;
}

.streamers-list h3 {
  color: #f0a500;
  margin-bottom: 10px;
}

.streamers-list ul {
  list-style-type: none;
  padding: 0;
}

.streamers-list li {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  color: #bbb;
}

.streamers-list img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
