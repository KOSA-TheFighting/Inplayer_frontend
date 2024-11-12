<script setup>
import { ref, onMounted } from 'vue';

const categories = ref([]);

const loadCategories = () => {
  // 더미 데이터로 카테고리 정보를 정의합니다.
  categories.value = [
    { id: 2000, name: 'TALK', viewers: '1.2만명', liveCount: 163, thumbnail: new URL('@/assets/talk.png', import.meta.url).href},
    { id: 2001, name: 'STUDY', viewers: '1.1만명', liveCount: 77, thumbnail: new URL('@/assets/study.png', import.meta.url).href},
    { id: 2002, name: 'MUSIC', viewers: '1.3만명', liveCount: 23, thumbnail: new URL('@/assets/music.png', import.meta.url).href},
    { id: 2003, name: 'ART', viewers: '1.6만명', liveCount: 54, thumbnail: new URL('@/assets/art.png', import.meta.url).href},
    { id: 2004, name: 'GAME', viewers: '1.2만명', liveCount: 84, thumbnail: new URL('@/assets/game.png', import.meta.url).href},
    { id: 2005, name: 'ETC', viewers: '1.8만명', liveCount: 21, thumbnail: new URL('@/assets/etc.png', import.meta.url).href},
    // 필요한 만큼 카테고리 추가 가능
  ];
};

onMounted(() => {
  loadCategories();
});
</script>

<template>
  <section class="category-page">
    <h2 class="category-title">카테고리</h2>

    <div class="category-grid">
      <div v-for="category in categories" :key="category.id" class="category-card">
        <img :src="category.thumbnail" alt="Category Thumbnail" class="category-thumbnail" />
        <div class="category-info">
          <h3 class="category-name">{{ category.name }}</h3>
          <p class="category-viewers">{{ category.viewers }}</p>
          <p class="category-live-count">라이브 {{ category.liveCount }}개</p>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped>
.category-page {
  color: #fff;
}

.category-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.category-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.category-card {
  width: 200px;
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  padding: 10px;
}

.category-thumbnail {
  width: 100%;
  border-radius: 10px;
  height: 150px;
  object-fit: cover;
}

.category-info {
  margin-top: 10px;
}

.category-name {
  font-size: 18px;
  color: #f0a500;
}

.category-viewers,
.category-live-count {
  font-size: 14px;
  color: #bbb;
}
</style>
