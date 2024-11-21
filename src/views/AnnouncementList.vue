<template>
  <div class="announcement-page">
    <div class="announcement-header">
      <h1>공지사항</h1>

      </div>
    <div class="announcement-content">
      <ul class="announcement-list">
        <li v-for="(announcement, index) in announcements" :key="index">
          <h3>
            <router-link :to="{ name: 'announcementdetail', params: { id: index + 1 } }">
              {{ announcement.title }}
            </router-link>
          </h3>
          <p>{{ announcement.content }}</p>
          <span class="date">{{ announcement.date }}</span>
        </li>
      </ul>
    </div>
    <!-- 오른쪽 콘텐츠 영역 추가 -->
    <div class="sidebar">
           <button class="create-btn" @click="createAnnouncement">공지사항 작성</button>
      <h2>자주하는 질문</h2>
      <ul>
        <li>실시간 방송을 시작하려면 어떻게 해야 하나요?</li>
        <li>방송 중에 화면을 전환하려면 어떻게 하나요?</li>
        <li>실시간 방송을 모바일로 시청할 수 있나요?</li>
        <li>방송 중에 시청자와 채팅을 할 수 있나요?</li>
        <li>방송 중에 다른 사람과 공동 방송을 할 수 있나요?</li>
        <li>방송 품질을 조정할 수 있나요?</li>
        <li>방송 중에 끊김이 발생하면 어떻게 해야 하나요?</li>
        <li>방송이 끝난 후에는 어떻게 아카이브를 확인하나요?</li>
        <li>실시간 방송에 대한 알림을 받을 수 있나요?</li>
        <li>방송 중에 음악을 사용할 수 있나요?</li>

      </ul>
    </div>
  </div>
</template>

<script setup>
const announcements = [
  {
    title: '서비스 약관 변경 안내',
    content: '2024년 12월 1일부터 서비스 약관이 다음과 같이 변경됩니다. ...',
    date: '2024-11-20',
  },
  {
    title: '시스템 점검 안내',
    content: '2024년 11월 25일 오전 2시부터 4시까지 시스템 점검이 진행됩니다. ...',
    date: '2024-11-18',
  },
  {
    title: '새로운 기능 업데이트',
    content: '회원들이 요청한 새로운 방송 도구가 추가되었습니다. ...',
    date: '2024-11-15',
  },
  {
    title: '블랙 프라이데이 할인 이벤트',
    content: '2024년 11월 24일부터 11월 30일까지 특별 할인 이벤트가 진행됩니다. ...',
    date: '2024-11-19',
  },
  {
    title: '이용자 보안 강화 정책',
    content: '2024년 12월부터 2단계 인증이 의무화됩니다. ...',
    date: '2024-11-12',
  },
  {
    title: '새로운 방송 기능 테스트 안내',
    content: '2024년 11월 22일부터 방송 도구에 대한 테스트가 진행됩니다. ...',
    date: '2024-11-09',
  },
  {
    title: '이용자 피드백 설문 조사',
    content: '2024년 12월까지 진행되는 이용자 피드백 설문에 참여해 주세요. ...',
    date: '2024-11-05',
  },

];

// Placeholder function for "createAnnouncement" button click
function createAnnouncement() {
  console.log("공지사항 작성 버튼 클릭");
}
</script>

<style scoped>
/* 전체 페이지 스크롤 통합 */
.announcement-page {
  display: flex;
  flex-direction: row; /* 가로 레이아웃으로 변경 */
  height: 100vh;
  overflow-y: auto; /* 페이지 전체 스크롤 활성화 */
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}
/* 상단 공지사항 제목 */
.announcement-header {
  width: 100%;
  background-color: #2d2d2d;
  padding: 20px 0;
  text-align: left;
  margin-bottom: 20px; /* 제목과 콘텐츠 사이 간격 */
}

.announcement-header h1 {
  font-size: 40px;
  color: #fffcfc;
  margin: 0;
}

/* 왼쪽 공지사항 내용 */
.announcement-content {
  flex: 3; /* 왼쪽 콘텐츠 영역 */
  padding: 20px;
  color: #ffffff;
  background-color: #2d2d2d;
}

/* 오른쪽 사이드바 */
.sidebar {
  flex: 1; /* 오른쪽 콘텐츠 영역 */
  padding: 20px;
  background-color: #363535;
  color: #ffffff;
  box-shadow: -4px 0 6px rgba(0, 0, 0, 0.1);
  margin-right: 300px;
}

.sidebar h2 {
  font-size: 24px;
  color: #f0a500;
  margin-bottom: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar ul li {
  font-size: 18px;
  color: #ddd;
  margin-bottom: 12px;
}
.announcement-list {
  margin-left: 20px;
}

/* 공지사항 제목 */
.announcement-list h3 {
  font-size: 20px;
  color: #ffd55a;
}

.announcement-list p {
  margin: 10px 0;
  color: #ddd;
}

.announcement-list .date {
  font-size: 12px;
  color: #aaa;
  text-align: right;
}

.announcement-list h3 a {
  color: #ffd55a;
  text-decoration: none;
  cursor: pointer;
}

.announcement-list h3 a:hover {
  text-decoration: underline;
}

/* 공지사항 작성 버튼 스타일 */
.create-btn {
  background-color: #f0a500;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: auto; /* 우측 정렬 */
}

.create-btn:hover {
  background-color: #d48700;
}
</style>
