<script setup>
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { useStreamStore } from '@/stores/stream'
import { onMounted } from 'vue'
import StreamList from '@/components/stream/StreamList.vue'

const streamStore = useStreamStore()

const loadChannels = async $state => {
  await streamStore.fetchChannels($state)
}

const sortByRecommendation = async () => {
  await streamStore.changeSortOption('recommendation')
}

const sortByNewest = async () => {
  await streamStore.changeSortOption('newest')
}

onMounted(async () => {
  await streamStore.fetchChannels({ currentPage: 1 }) // 초기 페이지 로드
})
</script>

<template>
  <section class="all-channels">
    <div class="sort-buttons">
      <button
        :class="{ active: streamStore.sortBy === 'recommendation' }"
        @click="sortByRecommendation"
      >
        인기순
      </button>
      <button
        :class="{ active: streamStore.sortBy === 'newest' }"
        @click="sortByNewest"
      >
        최신순
      </button>
    </div>

    <h2>전체 방송 목록</h2>
    <StreamList :stream-list="streamStore.streams" />

    <InfiniteLoading @infinite="loadChannels" />
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
  background-color: #e13865;
}

.sort-buttons button.active {
  background-color: #62b961;
  font-weight: bold;
  border: 2px solid #fcfcfc;
  border-radius: 5px;
}
</style>
