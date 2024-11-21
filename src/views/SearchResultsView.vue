<script setup>
import { useStreamStore } from '@/stores/stream'
import StreamList from '@/components/stream/StreamList.vue'
// import { onMounted } from 'vue'
// import { useRoute } from 'vue-router'

const streamStore = useStreamStore()
// const route = useRoute()

// onMounted(async () => {
//   await streamStore.performSearch(route.query.search)
// })
</script>

<template>
  <div class="content-wrapper">
    <section class="channel-section">
      <h2>채널</h2>
    </section>

    <section class="live-section">
      <h2>라이브</h2>
      <StreamList :stream-list="streamStore.searchResults" />
    </section>
  </div>
</template>

<style scoped>
.content-wrapper {
  width: 100%;
  min-height: 100vh;
}

.channel-section,
.live-section,
.video-section {
  margin-bottom: 2rem;
}
</style>
