<script setup>
import { useStreamStore } from '@/stores/stream'
import { watch, ref, onMounted, computed } from 'vue'

import talkImg from '@/assets/talk.png'
import studyImg from '@/assets/study.png'
import musicImg from '@/assets/music.png'
import artImg from '@/assets/art.png'
import gameImg from '@/assets/game.png'
import etcImg from '@/assets/etc.png'
import { useRoute, useRouter } from 'vue-router'

const streamStore = useStreamStore()
const router = useRouter()
const route = useRoute()

const defaultCategories = [
  { id: '2000', name: 'talk', thumbnail: talkImg },
  { id: '2001', name: 'study', thumbnail: studyImg },
  { id: '2002', name: 'music', thumbnail: musicImg },
  { id: '2003', name: 'art', thumbnail: artImg },
  { id: '2004', name: 'game', thumbnail: gameImg },
  { id: '2005', name: 'etc', thumbnail: etcImg },
]

const filteredStreams = ref([])
const selectedCategory = ref(null)

const categories = computed(() => {
  const groupedStreams = streamStore.allStreams.reduce((acc, stream) => {
    const category = stream.streamtag_name
    if (!acc[category]) {
      acc[category] = {
        id: stream.streamtag_num,
        name: category,
        viewers: 0,
        liveCount: 0,
      }
    }
    acc[category].viewers += stream.stream_realtime_viewer_count
    acc[category].liveCount++
    return acc
  }, {})

  return defaultCategories.map(category => ({
    ...category,
    viewers: groupedStreams[category.name]?.viewers || 0,
    liveCount: groupedStreams[category.name]?.liveCount || 0,
  }))
})

// 카테고리별 방송 목록을 필터링하고 라우터로 이동
const getStreamListByCategory = streamtag_name => {
  selectedCategory.value = streamtag_name
  filteredStreams.value = streamStore.allStreams.filter(
    stream => stream.streamtag_name === streamtag_name,
  )
  router.push('/category/' + streamtag_name)
}

watch(
  () => route.params.name,
  async () => {
    await streamStore.fetchAllChannels()
    getStreamListByCategory(route.params.name)
  },
  { immediate: true }, // 컴포넌트 마운트 시 즉시 실행
)

onMounted(async () => {
  if (streamStore.allStreams.length === 0) {
    await streamStore.fetchAllChannels()
  }
})
</script>

<template>
  <section class="category-page">
    <h2 class="category-title">카테고리</h2>

    <div class="category-grid">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="getStreamListByCategory(category.name)"
        :class="[
          'category-card',
          { active: selectedCategory === category.name },
        ]"
      >
        <img
          :src="category.thumbnail"
          :alt="`${category.name} Thumbnail`"
          class="category-thumbnail"
        />
        <div class="category-info">
          <h3 class="category-name">{{ category.name }}</h3>
          <p class="category-viewers">{{ category.viewers }}명</p>
          <p class="category-live-count">라이브 {{ category.liveCount }}개</p>
        </div>
      </button>
    </div>

    <div v-if="filteredStreams.length > 0">
      <h2 class="live-title">
        Live 방송 <span class="selectedCategory">#{{ selectedCategory }}</span>
      </h2>
      <router-view :streamList="filteredStreams" />
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
  gap: 20px;
}

.category-card {
  width: 200px;
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  padding: 10px;
  cursor: pointer;
}

.category-card:hover {
  border: 2px solid #fff;
}

.category-card.active {
  border: 2px solid #f0a500;
  transform: scale(1.05);
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

.selectedCategory {
  color: #f0a500;
  font-size: 120%;
}
</style>
