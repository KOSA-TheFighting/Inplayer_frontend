<script setup>
import FollowButton from '@/components/common/FollowButton.vue'
import StartStreamButton from '@/components/common/StartStreamButton.vue'
import StreamInfoInputForm from '@/components/stream/StreamInfoInputForm.vue'
import router from '@/router/index.js'
import { useStreamStore } from '@/stores/stream'
import { useRoute } from 'vue-router'

const route = useRoute()
const streamStore = useStreamStore()
const stream_id = route.params.stream_id

const goToNotices = () => {
  router.push({ name: 'announcementlist' })
}

const handleStartStream = async () => {
  if (streamStore.currentStream?.stream_title) {
    try {
      await streamStore.startStream()
      alert('방송을 시작합니다.')

      router.replace({
        name: 'broadcast',
        params: { stream_id: streamStore.currentStream.stream_id },
      })
    } catch (error) {
      console.error('방송 시작 실패:', error)
    }
  } else {
    alert('방송 정보를 업데이트 해주세요.')
  }
}

//beforeRouteUpdate 훅을 사용하면 경로가 변경되었을 때도 기존 컴포넌트의 상태를 유지
</script>

<template>
  <div class="container">
    <!-- Main Broadcast Section -->
    <main class="broadcast">
      <div class="broadcast-video">
        <img src="@/assets/방송준비중.png" alt="Main Broadcast" />
      </div>
    </main>

    <!-- Chat Section -->
    <section class="chat">
      <h2>채팅창</h2>
      <div class="chat-messages">
        <!-- 채팅 메시지 영역 (예시) -->
        <div class="message">채팅메시지123</div>
      </div>
      <div class="chat-input">
        <input type="text" placeholder="채팅 입력창" />
        <button>입력</button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-info">
        <span>스트리머 이름</span> / <span>방송 정보</span> /
        <span>방송 시간</span> / <span>시청자 수</span>
      </div>
      <template v-if="stream_id === '0'">
        <StartStreamButton @click="handleStartStream" />
      </template>
      <template v-else>
        <FollowButton />
      </template>
      <button class="notice-button" @click="goToNotices">공지사항</button>
    </footer>

    <StreamInfoInputForm v-if="stream_id === '0'" />
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  display: grid;
  grid-template-areas:
    'broadcast chat'
    'footer footer';
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 100px;
  gap: 10px;
  background-color: #2d2d2d;
  font-family: Arial, sans-serif;
}

/* Main Broadcast Section */
.broadcast {
  grid-area: broadcast;
  background-color: #2d2d2d;
  color: #2d2d2d;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.broadcast-video {
  width: 100%;
  height: 100%;
}

.broadcast-video img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Chat Section */
.chat {
  grid-area: chat;
  background-color: #272626;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chat h2 {
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 10px;
  text-align: center;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message {
  padding: 8px;
  background-color: #272626;
  color: #ffffff;
  margin-bottom: auto;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.chat-input {
  display: flex;
  gap: 10px;
}

.chat-input input {
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #5c5757;
  border-radius: 5px;
  background-color: #5c5757;
  color: #ffffff;
}

.chat-input input::placeholder {
  color: rgb(255, 255, 255);
}

.chat-input input:focus::placeholder {
  color: transparent;
}

.chat-input button {
  padding: 10px 20px;
  background-color: #5c5757;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #574d4d;
}

/* Footer */
.footer {
  grid-area: footer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #272626;
  border-top: 1px solid #ddd;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.footer-info {
  font-size: 16px;
  color: #ffffff;
}

.notice-button {
  padding: 10px 15px;
  background-color: #4caf50; /* 초록색 배경 */
  color: #fff; /* 흰색 텍스트 */
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease; /* 부드러운 색상 전환 효과 */
}

.notice-button:hover {
  background-color: #388e3c; /* 더 진한 초록색으로 변경 */
}
</style>
