<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 스트리머 채널로 이동하는 함수
const goToStreamerChannel = member_id => {
  router.push({ name: 'mychannel', params: { member_id } })
}

// 스트리머 방송으로 이동하는 함수
const goToBroadcast = stream_id => {
  router.push({ name: 'broadcast', params: { stream_id } })
}

const props = defineProps({
  streamList: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="video-list">
    <div
      v-for="channel in streamList"
      :key="channel.stream_id"
      class="channel-card"
    >
      <img :src="channel.thumbnail" alt="Channel thumbnail" />
      <h4 @click="goToBroadcast(channel.stream_id)">
        {{ channel.stream_title }}
      </h4>
      <h3 @click="goToStreamerChannel(channel.member_id)">
        {{ channel.member_nickname }}
      </h3>
      <span>{{ channel.stream_realtime_viewer_count }} 명</span>
      <p>{{ channel.streamtag_name }}</p>
    </div>
  </div>
</template>

<style scoped>
.video-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.channel-card {
  background-color: #444;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  aspect-ratio: 16 / 9;
}

.channel-card img {
  width: 100%;
  height: auto;
}

.channel-card h4 {
  font-size: 18px;
  margin: 10px 0;
  color: #f0a500;
  cursor: pointer;
}

.channel-card h3 {
  font-size: 16px;
  margin: 10px 0;
  cursor: pointer;
}

.channel-card p {
  display: inline-block; /* 태그처럼 보이도록 인라인 블록 설정 */
  background-color: #f0a500; /* 태그의 배경색 */
  color: #fff; /* 텍스트 색상 */
  padding: 4px 8px; /* 안쪽 여백으로 크기 조정 */
  font-size: 15px; /* 텍스트 크기 */
  border-radius: 4px; /* 둥근 모서리로 태그 스타일 */
  margin: 5px 2px; /* 각 태그 사이의 여백 */
  font-weight: bold; /* 강조된 텍스트 */
}
.channel-card span {
  color: #bbb;
}
</style>
