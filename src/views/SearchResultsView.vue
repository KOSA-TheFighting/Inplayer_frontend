<script setup>
import { useStreamStore } from '@/stores/stream'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const streamStore = useStreamStore()
const route = useRoute()

onMounted(async () => {
  await streamStore.performSearch(route.query.search)
})
</script>

<template>
  <div class="content-wrapper">
    <section class="channel-section"></section>

    <section class="live-section"></section>
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
