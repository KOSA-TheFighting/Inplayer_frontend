<script setup>
import { ref } from 'vue';
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';

// Import the components
import HeaderComponent from '../components/layouts/HeaderComponent.vue';
import SidebarComponent from '../components/layouts/SidebarComponent.vue';
import FooterComponent from '../components/layouts/FooterComponent.vue';

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
  <div class="main-page">
    <!-- Header -->
    <HeaderComponent />

    <!-- Main Container -->
    <div class="main-container">
      <!-- Sidebar -->
      <SidebarComponent />

      <!-- Main Content -->
      <main class="content">
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
      </main>
    </div>

    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;
  color: #fff;
  background-color: #1c1c1c;
  overflow-y: auto;
}

.main-container {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #2d2d2d;
  overflow-y: auto;
}

.all-channels {
  margin-top: 20px;
}

.video-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.channel-card {
  display: inline-block;
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

.channel-card p,
.channel-card span {
  color: #bbb;
}
</style>
