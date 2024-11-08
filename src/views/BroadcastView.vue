<script setup>

import router from '@/router/index.js'

const goToNotices = () => {
  router.push({ name: 'notices' });
};


</script>

<template>
  <div class="container">

    <!-- Main Broadcast Section -->
    <main class="broadcast">
      <h2>개인 방송 화면</h2>
      <div class="broadcast-video">
        <img src="@/assets/son.png" alt="Main Broadcast" />
      </div>
    </main>

    <!-- Chat Section -->
    <section class="chat">
      <h2>채팅창</h2>
      <div class="chat-messages">
        <!-- 채팅 메시지 영역 (예시) -->
        <div class="message">손흥민 1호 골!</div>
        <div class="message">손흥민 2호 골!</div>
        <div class="message">손흥민 3호 골!</div>
        <div class="message">손흥민 4호 골!</div>
        <div class="message">손흥민 5호 골!</div>
        <div class="message">손흥민 6호 골!</div>
        <div class="message">손흥민 7호 골!</div>
        <div class="message">손흥민 8호 골!</div>
        <div class="message">손흥민 9호 골!</div>
        <div class="message">손흥민 10호 골!</div>
        <div class="message">손흥민 11호 골!</div>
        <div class="message">손흥민 12호 골!</div>
        <div class="message">손흥민 13호 골!</div>
        <div class="message">손흥민 14호 골!</div>
        <div class="message">손흥민 15호 골!</div>
        <div class="message">손흥민 16호 골!</div>



      </div>
      <div class="chat-input">
        <input type="text" placeholder="채팅 입력창" />
        <button>전송</button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-info">
        <span>스트리머 이름</span> / <span>방송 정보</span> / <span>방송 시간</span> / <span>시청자 수</span>
      </div>
      <button class="follow-button">팔로우</button>
      <button class="notice-button" @click="goToNotices">공지사항</button>
    </footer>
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
    "broadcast chat"
    "footer footer";
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 100px;
  height: 100vh;
  gap: 10px;
  background-color: #f7f7f7;
  font-family: Arial, sans-serif;
}

/* Main Broadcast Section */
.broadcast {
  grid-area: broadcast;
  background-color: #2b2b2b;
  color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 3px solid #dff140; /* 테두리 추가 */
}

.broadcast h2 {
  font-size: 24px;
  margin-bottom: 15px;
}

.broadcast-video img {
  width: auto;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Chat Section */
.chat {
  grid-area: chat;
  background-color: #e5e5e5;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chat h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message {
  padding: 8px;
  background-color: #fff;
  color: #000;
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
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.chat-input button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #0056b3;
}

/* Footer */
.footer {
  grid-area: footer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f0f0f0;
  border-top: 1px solid #ddd;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.footer-info {
  font-size: 14px;
  color: #666;
}

.follow-button {
  padding: 10px 20px;
  background-color: #ff9f00;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

.follow-button:hover {
  background-color: #ff7f00;
}

.notice-button {
  padding: 10px 20px;
  background-color: #4caf50; /* 초록색 배경 */
  color: #fff; /* 흰색 텍스트 */
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease; /* 부드러운 색상 전환 효과 */
}

.notice-button:hover {
  background-color: #388e3c; /* 더 진한 초록색으로 변경 */
}
</style>
