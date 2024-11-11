<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const replayVideos = ref([]);

const loadReplayVideos = () => {
  // 더미 데이터 생성
  replayVideos.value = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Replay Video ${i + 1}`,
    thumbnail: 'https://via.placeholder.com/150', // 샘플 썸네일 이미지
  }));
};

const goToAllChannelsPage = () => {
  router.push({ name: 'list' });
};

onMounted(() => {
  loadReplayVideos();
});
</script>

<template>

  <div class="main-container">

    <main class="content">

      <!-- 우측 하단에 배치할 버튼 -->
      <h1>MY 채널</h1>
      <button class="go-to-all-channels" @click="goToAllChannelsPage">전체방송목록으로 이동</button>

      <!-- 두 개의 주요 세션 -->
      <section class="user-info-display">
        <h2>개인 정보</h2>
        <h3>사용자 이름 : USERNAME</h3>
        <div class="profile">
          <h4>프로필 사진</h4>
          <img src="https://via.placeholder.com/150" alt="User Profile Picture" class="profile-picture" />
          <br><br>
          <span>팔로워 수 : 명</span>
        </div>
        <!-- 첫 방송일 정보 추가 -->
        <div class="broadcast-info">
          <h4>첫 방송일</h4>
          <span>2023-01-01</span> <!-- 첫 방송일 정보 -->
        </div>
      </section>

      <section class="replay-videos">
        <h1>영상 다시보기 목록</h1>
        <div class="video-list">
          <div v-for="video in replayVideos" :key="video.id" class="video-card">
            <img :src="video.thumbnail" alt="Video thumbnail" />
            <h2>{{ video.name }}</h2>
          </div>
        </div>
      </section>

    </main>

  </div>

</template>

<style scoped>

.go-to-all-channels {
  position: relative; /* 절대 위치로 버튼 배치 */
  bottom: 20px; /* 화면 하단 20px */
  left: 1020px; /* 화면 우측 20px */
  width: 170px;
  padding: 12px 0px;
  background: linear-gradient(135deg, #f0a500, #ff6600); /* 그라디언트 배경 */
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px; /* 글자 크기 조정 */
  border-radius: 8px; /* 둥근 모서리 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  transition: all 0.3s ease; /* 애니메이션 효과 */
}

/* 호버 시 효과 */
.go-to-all-channels:hover {
  background: linear-gradient(135deg, #84d61f, #008cf0); /* 호버 시 색상 변화 */
  transform: scale(1.05); /* 크기 확대 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* 그림자 강도 증가 */
}

/* 클릭 시 효과 */
.go-to-all-channels:active {
  transform: scale(0.98); /* 클릭 시 살짝 눌리는 효과 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 클릭 시 그림자 효과 변경 */
}

/* 포커스 시 효과 */
.go-to-all-channels:focus {
  outline: none; /* 기본 포커스 아웃라인 제거 */
  box-shadow: 0 0 8px rgba(255, 165, 0, 0.7); /* 포커스 시 밝은 색으로 아웃라인 추가 */
}

.main-container {
  display: flex;
  flex: 1;
  justify-content: center; /* 내용 중앙 정렬 */
}

.content h1{
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 40px;
  padding: 20px;
  color: #ffffff;
  background-color: #2d2d2d;
  gap: 30px; /* 세션 간 간격 */
}

.user-info-display .broadcast-info {
  margin-top: 20px;
}

.user-info-display .broadcast-info h4 {
  font-weight: bold;
  margin-bottom: 5px;
}

.user-info-display .broadcast-info span {
  color: #ffffff;
}

.user-info-display,
.replay-videos {
  background-color: #444;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.user-info-display h1,
.replay-videos h1 {
  color: #ffffff;
  text-align: left;
  margin-bottom: 10px;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.profile h4 {
  color: #fff;
}

.replay-videos h1 {
  font-size: 22px;
}

.video-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.video-card {
  background-color: #333;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  width: 180px;
}

.video-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.video-card h2 {
  color: #ffffff;
  font-size: 16px;
  margin-top: 10px;
}

</style>
