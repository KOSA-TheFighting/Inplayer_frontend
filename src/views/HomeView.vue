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
          <h2>메인 방송 화면</h2>
          <h3>방송 제목</h3>
          <div class="main-broadcast-video">
            <img src="https://via.placeholder.com/800x450" alt="Main Broadcast" />
            <span>시청자 수</span>
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
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: right;
}

.main-broadcast-video img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 30px;
}
.main-broadcast h2 {
  text-align: left;
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
