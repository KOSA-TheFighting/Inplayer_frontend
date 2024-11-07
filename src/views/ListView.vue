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
</script>

<template>
  <section class="all-channels">
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
