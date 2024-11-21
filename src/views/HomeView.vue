<script setup>
import { onMounted } from 'vue'
import AllStreamListButton from '@/components/common/AllStreamListButton.vue'
import StreamList from '@/components/stream/StreamList.vue'
import { useStreamStore } from '@/stores/stream'
//import { useRouter } from 'vue-router'

//const router = useRouter()
const streamStore = useStreamStore()

onMounted(async () => {
  await streamStore.fetchRecommendChannels({
    //page: 1,
    size: 12,
    sortBy: 'recommendation',
  })
})
</script>

<template>
  <div class="main-container">
    <main class="content">
      <!-- 전체 방송 목록 이동 버튼 -->
      <AllStreamListButton />
      <!-- 메인 방송 화면 세션 -->
      <section class="main-broadcast">
        <h3>방송 제목</h3>
        <div class="main-broadcast-video">
          <!-- 1:3 비율로 나눈 두 개의 화면 -->
          <div class="video-large">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Sub Broadcast"
            />
          </div>
          <div class="video-small">
            <img
              src="https://via.placeholder.com/100x200"
              alt="Main Broadcast"
            />
          </div>
        </div>
      </section>

      <section class="recommended-channels">
        <h2>추천 방송 목록</h2>
        <StreamList :stream-list="streamStore.recommendStreams" />
      </section>
    </main>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #2d2d2d;
  overflow: hidden;
}

/* 메인 방송 화면 스타일 */
.main-broadcast {
  background-color: #212121;
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
</style>
