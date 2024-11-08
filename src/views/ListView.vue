<script setup>
import { ref } from 'vue';
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';

const allChannels = ref([]);
const page = ref(1);

const loadAllChannels = async ($state) => {
  const dummyData = Array.from({ length: 10 }, (_, i) => ({
    id: page.value * 10 + i,
    name: `Channel ${page.value * 10 + i}`,
    viewers: Math.floor(Math.random() * 1000) + 1,
    thumbnail: 'https://via.placeholder.com/150',
    description: 'This is a dummy description for testing infinite scroll.',
  }));

  if (page.value > 20) {
    $state.complete();
  } else {
    allChannels.value.push(...dummyData);
    $state.loaded();
    page.value++;
  }
};

// 정렬 함수들
const sortByRecommendation = () => {
  allChannels.value.sort((a, b) => b.viewers - a.viewers); // 추천순: 시청자 수 기준으로 내림차순 정렬
};

const sortByNewest = () => {
  allChannels.value.sort((a, b) => b.id - a.id); // 최신순: ID 기준으로 내림차순 정렬
};

</script>

<template>
  <section class="all-channels">
    <!-- 정렬 버튼들 -->
    <div class="sort-buttons">
      <button @click="sortByRecommendation">추천순</button>
      <button @click="sortByNewest">최신순</button>
    </div>

    <h2>전체 방송 목록</h2>
    <div class="video-list">
      <div v-for="channel in allChannels" :key="channel.id" class="channel-card">
        <img :src="channel.thumbnail" alt="Channel thumbnail" />
        <h3>{{ channel.name }}</h3>
        <span>{{ channel.viewers }} viewers</span>
        <p>{{ channel.description }}</p>
      </div>
    </div>
    <InfiniteLoading @infinite="loadAllChannels" />
  </section>
</template>

<style scoped>
.all-channels {
  margin-top: 20px;
}

/* 정렬 버튼 스타일 */
.sort-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  right: 100px;
  margin-bottom: 20px;
}

.sort-buttons button {
  padding: 8px 16px;
  background-color: #f0a500;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.sort-buttons button:hover {
  background-color: #d18e00;
}

.video-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.channel-card {
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

.channel-card p,
.channel-card span {
  color: #bbb;
}
</style>
