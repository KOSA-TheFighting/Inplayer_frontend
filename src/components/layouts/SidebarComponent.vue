<!-- SidebarComponent.vue -->
<template>
  <aside class="sidebar">
    <button @click="goToAllChannelsPage">전체 방송 목록</button>
    <button @click="goToCategory">카테고리</button>
    <button @click="goToFollowing">팔로잉</button>
    <!-- 추천 스트리머 목록 -->
    <div class="streamers-list">
      <div class="streamer-header">
        <h3>추천 스트리머</h3>
        <RefreshButton />
      </div>
      <ul>
        <li
          v-for="streamer in streamStore.recommendStreamers"
          :key="streamer.stream_id"
          @mouseenter="hoveredStreamer = streamer"
          @mouseleave="hoveredStreamer = null"
          @click="goToBroadcast(streamer.stream_id)"
          class="streamer-item"
        >
          <div class="streamer-content">
            <img :src="streamer.thumbnail" alt="Streamer Thumbnail" />
            <span class="streamer-info">
              <div class="name-tag-wrapper">
                <span class="streamer-name">{{
                  streamer.member_nickname
                }}</span>
                <span class="streamer-tag">{{ streamer.streamtag_name }}</span>
              </div>
              <span class="streamer-viewers">
                <span class="red-dot"></span>
                {{ streamer.stream_realtime_viewer_count }}
              </span>
            </span>
          </div>
          <!-- 호버 시 나타나는 설명 -->
          <div v-if="hoveredStreamer === streamer" class="hover-description">
            {{ streamer.stream_title }}
          </div>
        </li>
      </ul>
    </div>

    <button @click="goToNotices">공지사항 게시판</button>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useStreamStore } from '@/stores/stream'
import { onMounted } from 'vue'
import RefreshButton from '../common/RefreshButton.vue'

const router = useRouter()
const hoveredStreamer = ref(null)
const streamStore = useStreamStore()

onMounted(async () => {
  await streamStore.fetchRecommendStreamers()
})

const goToAllChannelsPage = () => {
  router.push({ name: 'list' }) // 'ListView'는 라우터에 설정된 이름
}

const goToCategory = () => {
  router.push({ name: 'category' })
}

const goToFollowing = () => {
  console.log('Navigate to Following')
}

const goToNotices = () => {
  router.push({ name: 'announcementlist' })
}

const goToBroadcast = stream_id => {
  router.push({ name: 'broadcast', params: { stream_id } })
}
</script>

<style scoped>
.sidebar {
  background-color: #1f1f1f; /* 좀 더 짙은 배경 색상 */
  padding: 20px;
  width: 220px; /* 약간 더 넓게 조정 */
  flex-shrink: 0;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.4); /* 사이드바 그림자 */
  border-right: 1px solid #333; /* 경계선 추가 */
}

.sidebar button {
  width: 100%;
  padding: 12px 16px; /* 약간 더 여유로운 패딩 */
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background-color: #8388bd; /* 어두운 배경으로 변경 */
  border: 1px solid #444; /* 경계선 추가 */
  border-radius: 4px; /* 둥근 모서리 */
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease; /* 부드러운 전환 효과 */
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3); /* 버튼에 그림자 추가 */
}

/* 버튼 호버 효과 */
.sidebar button:hover {
  background-color: #3a3a3a; /* 배경색이 조금 밝아짐 */
  color: #ffd55a; /* 텍스트 색상 강조 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  transform: translateY(-2px); /* 약간 위로 올라가는 효과 */
}

/* 버튼 클릭 효과 */
.sidebar button:active {
  background-color: #363535; /* 클릭 시 약간 어두운 색 */
  color: #ffcc4d; /* 텍스트 색상 조정 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(1px); /* 살짝 눌리는 효과 */
}

/* 추천 스트리머 목록 스타일 */
.streamers-list {
  margin-top: 20px;
  padding-left: 10px;
}

.streamers-list h3 {
  color: #f0a500;
  margin-bottom: 10px;
}

.streamers-list ul {
  list-style-type: none;
  padding: 0;
}

.streamer-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px;
  color: #bbb;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.streamer-item:hover {
  background-color: #363535;
}

/* .streamers-list li {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  color: #bbb;
} */

.streamer-content {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.streamers-list img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
}

.streamer-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.name-tag-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.streamer-name {
  color: #ffffff;
  font-size: 17px;
  line-height: 1.2;
}

.streamer-tag {
  color: #9ca0c5; /* 태그 색상 설정 */
  font-size: 15px;
  line-height: 1;
  opacity: 0.8;
}

.streamer-viewers {
  display: flex;
  align-items: center;
  color: red;
  font-size: 14px;
}

.red-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: red;
  border-radius: 50%;
  margin-left: 4px;
  margin-right: 4px;
}

.hover-description {
  position: absolute;
  left: calc(100% + 20px);
  top: 0;
  transform: none;
  background-color: #363535;
  padding: 8px 12px;
  border-radius: 4px;
  white-space: normal;
  width: 220px;
  min-height: 40px;
  font-size: 16px;
  color: #ffffff;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  opacity: 1;
  pointer-events: none;
}

.hover-description::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 15px;
  transform: translateY(-50%);
  border-style: solid;
  border-width: 6px 6px 6px 0;
  border-color: transparent #363535 transparent transparent;
}

.streamer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
</style>
