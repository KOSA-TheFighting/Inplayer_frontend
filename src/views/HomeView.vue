<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const recommendedChannels = ref([]);

const loadRecommendedChannels = () => {
  // 더미 데이터 생성
  recommendedChannels.value = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Recommended Channel ${i + 1}`,
    viewers: Math.floor(Math.random() * 1000) + 1,
    thumbnail: 'https://via.placeholder.com/150', // 샘플 썸네일 이미지
    description: 'This is a dummy description for recommended channels.',
  }));
};

// 페이지 이동 함수
const goToAllChannelsPage = () => {
  router.push({ name: 'list' }); // 'ListView'는 라우터에 설정된 이름
};

// 컴포넌트가 로드될 때 데이터를 불러옴
onMounted(() => {
  loadRecommendedChannels();
});
</script>

<template>

    <div class="main-container">

      <main class="content">

        <!-- 우측 하단에 배치할 버튼 -->
        <button class="go-to-all-channels" @click="goToAllChannelsPage">전체방송목록으로 이동</button>

        <!-- 메인 방송 화면 세션 -->
        <section class="main-broadcast">
          <h3>방송 제목</h3>
          <div class="main-broadcast-video">
            <!-- 1:3 비율로 나눈 두 개의 화면 -->
            <div class="video-large">
              <img src="https://via.placeholder.com/300x200" alt="Sub Broadcast" />

            </div>
            <div class="video-small">
              <img src="https://via.placeholder.com/100x200" alt="Main Broadcast" />
            </div>
          </div>
        </section>

        <section class="recommended-channels">
          <h2>추천 방송 목록</h2>
          <div class="video-list">
            <div v-for="channel in recommendedChannels" :key="channel.id" class="channel-card">
              <img :src="channel.thumbnail" alt="Channel thumbnail" />
              <h3>{{ channel.name }}</h3>
              <span>{{ channel.viewers }} viewers</span>
              <p>{{ channel.description }}</p>
            </div>
          </div>
        </section>
      </main>
    </div>

</template>

<style scoped>

/* 우측 하단 버튼 스타일 */
.go-to-all-channels {
  position: relative;
  top: 50px;
  left: 1000px;
  padding:10px 10px;
  background-color: #f0a500;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
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
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #2d2d2d;
  overflow: hidden
}

/* 메인 방송 화면 스타일 */
.main-broadcast {
  background-color: #333;
  padding: 5px 20px;
  border-radius: 10px;
  text-align: right;
  flex-direction: column;

}

.main-broadcast-video {
  width: 100%;
  height: auto;
  flex-direction: row;
  border-radius: 8px;
  gap: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;

}

.video-large {
  flex: 3;
  padding: 5px;
}
.video-small {
  flex: 1;
  padding: 5px;
}

.main-broadcast img {
  width: 100%;
  height: 300px;
  flex-direction: row;
}


.main-broadcast h3 {
  font-size: 50px;
  color: #f0a500;
  margin-bottom: 5px;
  text-align: left;
}

.main-broadcast span {
  color: #bbb;
  font-size: 20px;
  margin-bottom: 20px;
}

.video-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.channel-card {
  width: 200px;
  margin: 10px;
  background-color: #444;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
}

.channel-card img {
  width: 100%;
  height: auto;
}

.channel-card h3 {
  font-size: 16px;
  margin: 10px 0;
  color: #f0a500;
}

.channel-card p, .channel-card span {
  color: #bbb;
}
</style>
